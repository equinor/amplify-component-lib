import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import {
  CancelablePromise,
  ServiceNowIncidentRequestDto,
} from 'src/api';
import { FullPageSpinner, Unauthorized } from 'src/components/index';
import {
  FeedbackContentType,
  SeverityOption,
} from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import { render, screen, userEvent, waitFor } from 'src/tests/test-utils';
import { environment } from 'src/utils';

const { getClientId, getApiScope } = environment;

function Wrappers({ children }: { children: any }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        loadingComponent={<FullPageSpinner variant="equinor" withoutScrim />}
        unauthorizedComponent={<Unauthorized />}
        environments={{
          apiScope: getApiScope(''),
          clientId: getClientId(''),
        }}
        isMock={true}
      >
        <SnackbarProvider>{children}</SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

async function fakeImageFile(bad: boolean = false) {
  const extension = bad ? '.tiff' : '.png';
  const blob = await fetch(faker.image.url()).then((resp) => resp.blob());
  return new File([blob], faker.animal.cow() + extension);
}

function fakeInputs(): FeedbackContentType {
  return {
    title: faker.animal.crocodilia(),
    description: faker.lorem.sentence(),
    consent: faker.datatype.boolean(),
    url: 'www.amplify.equinor.com',
  };
}

let mockServiceHasError = false;

vi.mock('src/api/services/PortalService', () => {
  class PortalService {
    public static createIncident(
      requestBody?: ServiceNowIncidentRequestDto
    ): CancelablePromise<any> {
      return new CancelablePromise((res, reject) =>
        setTimeout(() => {
          if (mockServiceHasError) {
            return reject('error incident');
          }
          return res(requestBody);
        }, 500)
      );
    }

    public static fileUpload(formData?: FormData): CancelablePromise<any> {
      return new CancelablePromise((res, reject) =>
        setTimeout(() => {
          if (mockServiceHasError) {
            return reject('error fileUpload');
          }
          return res(formData);
        }, 500)
      );
    }

    public static postmessage(formData?: FormData): Promise<any> {
      return new CancelablePromise((res, reject) => {
        if (mockServiceHasError) {
          return reject('error fileUpload');
        }
        return res(formData);
      });
    }
  }
  return { PortalService };
});

const severityOptions = [
  SeverityOption.IMPEDES,
  SeverityOption.UNABLE,
  SeverityOption.NO_IMPACT,
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

  const titleInput = screen.queryByRole('textbox', { name: /title required/i });

  expect(titleInput).toBeInTheDocument();

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  await user.click(cancelButton);

  expect(titleInput).not.toBeInTheDocument();
});

for (const option of severityOptions) {
  test(`can select and submit "${option}" severity`, async () => {
    mockServiceHasError = false;
    const { title, description } = fakeInputs();
    render(<Help applicationName={applicationName} />, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    // await rerender(<Help applicationName={applicationName} />);
    await user.click(button);
    const reportBug = screen.getByText(/report a bug/i);
    await user.click(reportBug);

    const titleInput = screen.getByRole('textbox', {
      name: /title required/i,
    });
    const descInput = screen.getByRole('textbox', {
      name: /description required/i,
    });
    await user.type(titleInput, title);
    await user.type(descInput, description);

    const severityInput: HTMLInputElement = screen.getByRole('combobox', {
      name: /severity optional/i,
    });

    await user.click(severityInput);

    const severityOption = screen.getByText(option);

    expect(severityOption).toBeVisible();

    await user.click(severityOption);

    const submitButton = screen.getByRole('button', { name: /send/i });

    expect(submitButton).toBeDisabled();

    const consentCheckbox = screen.getByTestId('consent_checkbox');
    await user.click(consentCheckbox);
    expect(consentCheckbox).toBeChecked();

    expect(severityInput.value).toEqual(option);

    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton);
  }, 10000); // Setting timeout for this test to be 15 seconds
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

  const titleInput = screen.getByRole('textbox', { name: /title required/i });
  const descInput = screen.getByRole('textbox', {
    name: /description required/i,
  });
  const submitButton = screen.getByRole('button', { name: /send/i });

  expect(submitButton).toBeDisabled();
  await user.type(titleInput, title);
  await user.type(descInput, description);
  expect(submitButton).not.toBeDisabled();
}, 15000); // Setting timeout for this test to be 15 seconds

test('Inputting all fields with file works as expected', async () => {
  mockServiceHasError = false;
  const { title, description, url } = fakeInputs();
  const imageOne = await fakeImageFile();
  const imageTwo = await fakeImageFile();

  render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });

  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const reportBug = screen.getByText('Report a bug');
  await user.click(reportBug);

  const titleInput: HTMLInputElement = screen.getByRole('textbox', {
    name: /title required/i,
  });
  const descInput: HTMLInputElement = screen.getByRole('textbox', {
    name: /description required/i,
  });
  const urlInput: HTMLInputElement = screen.getByRole('textbox', {
    name: /url optional/i,
  });

  await user.type(titleInput, title);
  await user.type(descInput, description);
  await user.type(urlInput, url ?? '');

  expect(titleInput.value).toEqual(title);
  expect(descInput.value).toEqual(description);
  expect(urlInput.value).toEqual(url);

  const fileUploadArea = screen.getByTestId('file-upload-area-input');

  await user.upload(fileUploadArea, [imageTwo]);

  // Delete image file
  const file2nameElement = screen.getByText(imageTwo.name);

  const deleteUploadedFile2Button =
    file2nameElement.parentElement?.parentElement?.children[2];

  if (deleteUploadedFile2Button) {
    await user.click(deleteUploadedFile2Button);
    expect(file2nameElement).not.toBeInTheDocument();
  }

  // Upload a single image file again
  await user.upload(fileUploadArea, [imageOne]);

  const consentCheckbox = screen.getByTestId('consent_checkbox');
  await user.click(consentCheckbox);
  expect(consentCheckbox).toBeChecked();

  const filePrivacyCheckbox = screen.getByTestId('file_privacy_checkbox');
  await user.click(filePrivacyCheckbox);
  expect(filePrivacyCheckbox).toBeChecked();

  const submitButton = screen.getByRole('button', { name: /send/i });

  expect(submitButton).not.toBeDisabled();
  await user.click(submitButton);

  await waitFor(
    () =>
      expect(
        screen.getByText(/report has been sent successfully/i)
      ).toBeInTheDocument(),
    { timeout: 10000 }
  );
}, 15000); // Setting timeout for this test to be 15 seconds

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

  const urlInput: HTMLInputElement = screen.getByRole('textbox', {
    name: /URL optional/i,
  });

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
});

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

  const titleInput = screen.getByRole('textbox', {
    name: /title required/i,
  });
  const descInput = screen.getByRole('textbox', {
    name: /description required/i,
  });
  await user.type(titleInput, title);

  await user.type(descInput, description);

  const submitButton = screen.getByRole('button', { name: /send/i });

  await user.click(submitButton);

  expect(
    screen.getByRole('textbox', {
      name: /title required/i,
    })
  ).toBeInTheDocument();

  await waitFor(
    () =>
      expect(
        screen.getByText(/There was an error sending your report/i)
      ).toBeInTheDocument(),
    { timeout: 5000 }
  );
}, 10000); // Setting timeout for this test to be 10 seconds
