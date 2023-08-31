import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import { CancelablePromise, ServiceNowIncidentRequestDto } from 'src/api';
import { FullPageSpinner, Unauthorized } from 'src/components/index';
import {
  FeedbackContentType,
  SeverityOption,
} from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import { render, screen, userEvent } from 'src/tests/test-utils';
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

function fakeInputs(): FeedbackContentType {
  return {
    title: faker.animal.crocodilia(),
    description: faker.lorem.sentence(),
    consent: faker.datatype.boolean(),
    url: 'www.amplify.equinor.com',
  };
}

vi.mock('src/api/services/PortalService', () => {
  class PortalService {
    public static createIncident(
      requestBody?: ServiceNowIncidentRequestDto
    ): CancelablePromise<any> {
      return new CancelablePromise((res) =>
        setTimeout(() => res(requestBody), 1000)
      );
    }

    public static fileUpload(formData?: FormData): CancelablePromise<any> {
      return new CancelablePromise((res) =>
        setTimeout(() => res(formData), 1000)
      );
    }

    public static postmessage(formData?: FormData): CancelablePromise<any> {
      return new CancelablePromise((res) =>
        setTimeout(() => res(formData), 1000)
      );
    }

    public static getFeatureToggleFromApplicationName(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      applicationName: string
    ): CancelablePromise<boolean> {
      return new CancelablePromise((res) => setTimeout(() => res(true), 1000));
    }
  }
  return { PortalService };
});
const severityOptions = [
  SeverityOption.IMPEDES,
  SeverityOption.UNABLE,
  SeverityOption.NO_IMPACT,
];
const getSeverityOption = () => {
  const index = faker.number.int({ min: 0, max: 2 });
  return severityOptions[index];
};

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

test(`can select and submit all severities`, async () => {
  const { title, description } = fakeInputs();
  const { rerender } = render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  for (const option of severityOptions) {
    await rerender(<Help applicationName={applicationName} />);
    await user.click(button);
    screen.logTestingPlaygroundURL();
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
  }
}, 15000); // Setting timeout for this test to be 15 seconds

test('suggest a feature dialog submit button enabled at correct time', async () => {
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

// test('report a bug dialog submit button enabled at correct time', async () => {
//   const title = faker.animal.cat();
//   const description = faker.lorem.sentence();
//   render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
//   const user = userEvent.setup();
//
//   const button = screen.getByRole('button');
//   await user.click(button);
//
//   const reportBug = screen.getByText('Report a bug');
//   await user.click(reportBug);
//
//   const titleInput = screen.getByRole('textbox', { name: /title required/i });
//   const descInput = screen.getByRole('textbox', {
//     name: /description required/i,
//   });
//   const checkbox = screen.getByTestId('consent_checkbox');
//   const submitButton = screen.getByRole('button', { name: /send/i });
//
//   expect(submitButton).toBeDisabled();
//   await user.click(checkbox);
//   await user.type(titleInput, title);
//   await user.type(descInput, description);
//   expect(submitButton).not.toBeDisabled();
// }, 15000); // Setting timeout for this test to be 15 seconds

test('Inputing all fields with file works as expected', async () => {
  const { title, description, url } = fakeInputs();
  const blob = new Blob(['test', 'test']);
  const blob2 = new Blob(['tester', 'tester']);
  const imageFileOne = new File([blob2, blob], 'file1.png');
  const imageFileTwo = new File([blob, blob, blob2], 'file2.png');
  const badFile = new File([blob, blob2], 'badFile.pdf');
  const severityOptionChoice = getSeverityOption();

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

  const severityInput: HTMLInputElement = screen.getByRole('combobox', {
    name: /severity optional/i,
  });
  await user.click(severityInput);

  const severityOption = screen.getByText(severityOptionChoice);
  await user.click(severityOption);

  expect(severityInput).toHaveAttribute('value', severityOptionChoice);

  const fileUploadArea = screen.getByTestId('file-upload-area-input');

  await user.upload(fileUploadArea, [imageFileTwo, badFile]);

  // Delete image file
  const file2nameElement = screen.getByText(imageFileTwo.name);

  const deleteUploadedFile2Button =
    file2nameElement.parentElement?.parentElement?.children[2];

  if (deleteUploadedFile2Button) {
    await user.click(deleteUploadedFile2Button);
    expect(file2nameElement).not.toBeInTheDocument();
  }

  // Upload a single image file again
  await user.upload(fileUploadArea, [imageFileOne]);

  const consentCheckbox = screen.getByTestId('consent_checkbox');
  await user.click(consentCheckbox);
  expect(consentCheckbox).toBeChecked();
  screen.logTestingPlaygroundURL();
  const filePrivacyCheckbox = screen.getByTestId('file_privacy_checkbox');
  await user.click(filePrivacyCheckbox);
  expect(filePrivacyCheckbox).toBeChecked();

  const submitButton = screen.getByRole('button', { name: /send/i });
  screen.logTestingPlaygroundURL();
  expect(submitButton).not.toBeDisabled();
  await user.click(submitButton);

  setTimeout(() => {
    const successSnackbar = screen.getByText(
      'Report as been sent successfully'
    );
    expect(successSnackbar).toBeInTheDocument();
  }, 2500);

  setTimeout(() => {
    const dialogHeader = screen.queryByText('Report a bug');
    expect(dialogHeader).not.toBeInTheDocument();
  }, 3000);
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
