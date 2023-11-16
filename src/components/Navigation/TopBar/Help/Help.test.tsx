import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import { CancelablePromise, ServiceNowIncidentResponse } from 'src/api';
import {
  FeedbackContentType,
  UrgencyOption,
} from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import { render, screen, userEvent, waitFor } from 'src/tests/test-utils';

vi.mock('@azure/msal-react', () => ({
  MsalProvider: (children: any) => <div>{children}</div>,
}));

vi.mock('@azure/msal-browser', () => {
  return {
    PublicClientApplication: class PublicClientApplication {
      constructor() {
        console.log('created');
      }
    },
    AccountInfo: { username: 'mock' } as any,
  };
});

function Wrappers({ children }: { children: any }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <SnackbarProvider>{children}</SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// async function fakeImageFile(bad: boolean = false) {
//   const extension = bad ? '.tiff' : '.png';
//   return new File([faker.lorem.sentence()], faker.word.noun() + extension);
// }

// const createRegexToGetAttachment = (fileName: string) => {
//   const split = fileName.split('.');
//   return new RegExp(
//     'uploaded file: ' + split[0].toLowerCase() + '\\.' + split[1],
//     'i'
//   );
// };

function fakeInputs(): FeedbackContentType {
  return {
    title: faker.animal.crocodilia(),
    description: faker.lorem.sentence(),
    url: 'www.amplify.equinor.com',
  };
}

let mockServiceHasError = false;

let createIncidentResponseNumber: string = 'EQ123';

vi.mock('src/api/services/PortalService', () => {
  class PortalService {
    public static createIncident(): CancelablePromise<ServiceNowIncidentResponse> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError) {
            reject('error incident');
          } else {
            resolve({ number: createIncidentResponseNumber });
          }
        }, 500)
      );
    }

    public static fileUpload(formData?: FormData): CancelablePromise<any> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError) {
            reject('error fileUpload');
          } else {
            resolve(formData);
          }
        }, 500)
      );
    }

    public static postmessage(formData?: FormData): Promise<any> {
      return new CancelablePromise((resolve, reject) => {
        setTimeout(() => {
          if (mockServiceHasError) {
            reject('error postMessage');
          } else {
            resolve(formData);
          }
        }, 500);
      });
    }
  }
  return { PortalService };
});

const severityOptions = [
  UrgencyOption.IMPEDES,
  UrgencyOption.UNABLE,
  UrgencyOption.NO_IMPACT,
];

const applicationName = faker.animal.cat();

test('Behaves as expected', async () => {
  const applicationName = faker.animal.cat();
  render(<Help applicationName={applicationName}>Child</Help>);
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const linkElement = screen.getByRole('link', {
    name: /release notes/i,
  });
  const childElement = await screen.findByText('Child');

  expect(linkElement).toHaveAttribute(
    'href',
    `https://amplify.equinor.com/releasenotes?applications=%5B"${applicationName}"%5D`
  );
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(childElement).toBeInTheDocument();
});

test('Opens and closes as expected', async () => {
  render(<Help applicationName={applicationName} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const linkElement = screen.getByRole('link', {
    name: /release notes/i,
  });

  expect(linkElement).toBeInTheDocument();

  await user.click(button);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();

  await user.click(button);
  await user.click(document.body);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('hide props working as expected', async () => {
  render(
    <Help
      applicationName={applicationName}
      hideFeedback={true}
      hideReleaseNotes={true}
    />
  );
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const releaseNotesLink = screen.queryByRole('link', {
    name: /release notes/i,
  });
  const reportBug = screen.queryByText('Report a bug');
  const suggest = screen.queryByText('Suggest a feature');

  expect(releaseNotesLink).not.toBeInTheDocument();
  expect(reportBug).not.toBeInTheDocument();
  expect(suggest).not.toBeInTheDocument();
});

test('can close dialog by clicking outside', async () => {
  render(
    <>
      <Help applicationName={applicationName} />
    </>,
    { wrapper: Wrappers }
  );
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const reportBug = screen.getByText('Report a bug');

  await user.click(reportBug);

  const titleInput = screen.getByLabelText(/title/i);

  expect(titleInput).toBeInTheDocument();

  const cancelButton = screen.getByText(/cancel/i);

  await user.click(cancelButton);

  expect(titleInput).not.toBeInTheDocument();
});

for (const option of severityOptions) {
  test(`can select and submit "${option}" severity`, async () => {
    mockServiceHasError = false;
    const { title, description } = fakeInputs();
    const { container } = render(<Help applicationName={applicationName} />, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);
    const reportBug = screen.getByText(/report a bug/i);
    await user.click(reportBug);
    const titleInput = screen.getByLabelText(/title/i);

    const descInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, title);
    await user.type(descInput, description);

    const severityInput = container.querySelector(
      '#feedback-severity'
    ) as HTMLInputElement;

    await user.click(severityInput);

    const severityOption = screen.getByText(option);

    expect(severityOption).toBeInTheDocument();

    await user.click(severityOption);

    expect(severityInput.value).toEqual(option);

    const submitButton = screen.getByText(/send/i);

    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton);
  }, 15000); // Setting timeout for this test to be 15 seconds
}

test('suggest a feature dialog submit button enabled at correct time', async () => {
  mockServiceHasError = false;
  const title = faker.animal.cat();
  const description = faker.lorem.sentence();
  render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const suggestFeature = screen.getByText('Suggest a feature');
  await user.click(suggestFeature);

  const titleInput = screen.getByLabelText(/title/i);
  const descInput = screen.getByLabelText(/description/i);
  const submitButton = screen.getByText(/send/i).parentElement;

  expect(submitButton).toBeDisabled();
  await user.type(titleInput, title);
  await user.type(descInput, description);
  expect(submitButton).not.toBeDisabled();
}, 15000); // Setting timeout for this test to be 15 seconds

test('Inputting all fields with file works as expected', async () => {
  mockServiceHasError = false;
  const { title, description, url } = fakeInputs();
  // const imageOne = await fakeImageFile();
  // const imageTwo = await fakeImageFile();

  render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });

  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const reportBug = screen.getByText('Report a bug');
  await user.click(reportBug);

  const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
  const descInput: HTMLInputElement = screen.getByLabelText(/description/i);
  const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);
  const submitButton = screen.getByText(/send/i).parentElement as Element;

  expect(submitButton).toBeDisabled();

  await user.type(titleInput, title);
  await user.type(descInput, description);
  await user.type(urlInput, url ?? '');

  expect(titleInput.value).toEqual(title);
  expect(descInput.value).toEqual(description);
  expect(urlInput.value).toEqual(url);

  // Commenting out this because for the time being file upload is
  // not available when reporting a bug
  // const fileUploadArea = screen.getByTestId('file-upload-area-input');
  //
  // await user.upload(fileUploadArea, [imageTwo]);
  //
  // // Delete image file
  // const file2nameElement = screen.getByAltText(
  //   createRegexToGetAttachment(imageTwo.name)
  // );
  //
  // expect(file2nameElement).toBeInTheDocument();
  //
  // await user.hover(file2nameElement);
  //
  // const removeAttachmentButton = screen.getByTestId('attachment-delete-button');
  //
  // expect(removeAttachmentButton).toBeInTheDocument();
  //
  // if (removeAttachmentButton) {
  //   await user.click(removeAttachmentButton);
  //   expect(file2nameElement).not.toBeInTheDocument();
  // }
  //
  // // Upload three files, two being duplicates, so expect only two files to be shown
  // await user.upload(fileUploadArea, [imageOne]);
  // await user.upload(fileUploadArea, [imageTwo]);
  // await user.upload(fileUploadArea, [imageOne]);
  //
  // const allDeleteButtons = screen.getAllByTestId('attachment-delete-button');
  //
  // expect(allDeleteButtons.length).toBe(2);

  expect(submitButton).not.toBeDisabled();
  await user.click(submitButton);

  await waitFor(
    () =>
      expect(
        screen.getByText(createIncidentResponseNumber)
      ).toBeInTheDocument(),
    {
      timeout: 5000,
    }
  );
}, 20000); // Setting timeout for this test to be 20 seconds

test('Url validation working as expected', async () => {
  render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
  const user = userEvent.setup();
  const helperTextString = 'The provided URL must from a equinor.com domain';

  const wrongUrl = 'www.google.com';
  const rightUrl = 'www.amplify.equinor.com';

  const button = screen.getByRole('button');
  await user.click(button);

  const reportBug = screen.getByText('Report a bug');
  await user.click(reportBug);

  const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);

  await user.type(urlInput, wrongUrl);

  await urlInput.blur();

  const helperText = screen.queryByText(helperTextString);

  expect(helperText).toBeInTheDocument();

  await user.clear(urlInput);

  expect(helperText).not.toBeInTheDocument();

  await user.type(urlInput, wrongUrl);

  await urlInput.blur();

  const helperTextAgain = screen.queryByText(helperTextString);

  expect(helperTextAgain).toBeInTheDocument();
  await user.type(urlInput, rightUrl);

  expect(helperTextAgain).not.toBeInTheDocument();
}, 10000); // Setting timeout for this test to be 10 seconds

test('shows error snackbar on request error', async () => {
  mockServiceHasError = true;
  console.error = vi.fn();
  const { title, description } = fakeInputs();

  render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);
  const suggest = screen.getByText(/suggest/i);
  await user.click(suggest);

  const titleInput = screen.getByLabelText(/title/i);
  const descInput = screen.getByLabelText(/description/i);
  await user.type(titleInput, title);

  await user.type(descInput, description);

  const submitButton = screen.getByText(/send/i);

  await user.click(submitButton);

  expect(titleInput).toBeInTheDocument();

  await waitFor(
    () =>
      expect(
        screen.getByText(/There was an error sending your report/i)
      ).toBeInTheDocument(),
    { timeout: 5000 }
  );
}, 10000); // Setting timeout for this test to be 10 seconds

test('opt out of sending email whens suggesting feature', async () => {
  mockServiceHasError = false;
  const { title, description } = fakeInputs();

  render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);
  const suggest = screen.getByText(/suggest/i);
  await user.click(suggest);

  const nameInput: HTMLInputElement = screen.getByLabelText(/email/i);

  const titleInput = screen.getByLabelText(/title/i);

  const descInput = screen.getByLabelText(/description/i);
  const optOutCheckbox = screen.getByTestId('opt_out_checkbox');

  expect(optOutCheckbox).not.toBeChecked();

  await user.click(optOutCheckbox);

  expect(optOutCheckbox).toBeChecked();

  expect(nameInput.value).toBe('Anonymous');

  await user.type(titleInput, title);

  await user.type(descInput, description);

  const submitButton = screen.getByText(/send/i);

  await user.click(submitButton);

  await waitFor(
    () =>
      expect(
        screen.getByText(/Your suggestion has been sent successfully/i)
      ).toBeInTheDocument(),
    { timeout: 5000 }
  );
}, 10000); // Setting timeout for this test to be 10 seconds

test('undefined service now number working', async () => {
  createIncidentResponseNumber = '';
  mockServiceHasError = false;
  const { title, description } = fakeInputs();

  render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const reportBug = screen.getByText('Report a bug');
  await user.click(reportBug);

  const titleInput = screen.getByLabelText(/title/i);
  const descInput = screen.getByLabelText(/description/i);

  await user.type(titleInput, title);
  await user.type(descInput, description);

  const submitButton = screen.getByText(/send/i).parentElement as Element;

  await user.click(submitButton);
  await waitFor(
    () => expect(screen.getByText(/Not found/i)).toBeInTheDocument(),
    { timeout: 18000 }
  );
}, 20000); // Setting timeout for this test to be 15 seconds
