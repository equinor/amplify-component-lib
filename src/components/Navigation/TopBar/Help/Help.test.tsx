import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import { FullPageSpinner, Unauthorized } from 'src/components/index';
import { SeverityOption } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackFormInner';
import { AuthProvider } from 'src/providers';
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
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}

const getSeverityOption = () => {
  const severityOptions = [
    SeverityOption.IMPEDES,
    SeverityOption.UNABLE,
    SeverityOption.NO_IMPACT,
  ];
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
    `https://amplify.equinor.com/releasenotes?app=%5B"${applicationName}"%5D`
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

// test('opens report bug dialog as expected', async () => {
//   render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
//   const user = userEvent.setup();
//
//   const button = screen.getByRole('button');
//   await user.click(button);
//
//   const reportBug = screen.getByText('Report a bug');
//   await user.click(reportBug);
//   const titleLabel = screen.queryByText('Title');
//   expect(titleLabel).toBeVisible();
//
//   const cancel = screen.getByRole('button', { name: /Cancel/i });
//   await user.click(cancel);
//
//   expect(titleLabel).not.toBeVisible();
//
//   await user.click(button);
//   const suggestFeature = screen.getByText('Suggest a feature');
//   await user.click(suggestFeature);
//
//   const descLabel = screen.queryByText('Description');
//   expect(descLabel).toBeVisible();
// });

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

test('can interact with text fields in suggest feature dialog', async () => {
  const title = faker.animal.cat();
  const description = faker.lorem.sentence();
  const url = faker.internet.url();
  render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
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
  await user.type(urlInput, url);
  await user.type(titleInput, title);
  await user.type(descInput, description);

  expect(titleInput.value).toEqual(title);
  expect(descInput.value).toEqual(description);
  expect(urlInput.value).toEqual(url);
});

test('can interact with severity select in feedback dialog', async () => {
  render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
  const severityOptionChoice = getSeverityOption();
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const reportBug = screen.getByText('Report a bug');
  await user.click(reportBug);

  const severityInput: HTMLInputElement = screen.getByRole('combobox', {
    name: /severity optional/i,
  });

  await user.click(severityInput);

  const severityOption = screen.getByText(severityOptionChoice);

  expect(severityOption).toBeVisible();

  await user.click(severityOption);

  expect(severityInput.value).toEqual(severityOptionChoice);
});

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
});

test('report a bug dialog submit button enabled at correct time', async () => {
  const title = faker.animal.cat();
  const description = faker.lorem.sentence();
  render(<Help applicationName={applicationName} />, { wrapper: Wrappers });
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const reportBug = screen.getByText('Report a bug');
  await user.click(reportBug);

  const titleInput = screen.getByRole('textbox', { name: /title required/i });
  const descInput = screen.getByRole('textbox', {
    name: /description required/i,
  });
  const checkbox = screen.getByTestId('consent_checkbox');
  const submitButton = screen.getByRole('button', { name: /send/i });

  expect(submitButton).toBeDisabled();
  await user.click(checkbox);
  await user.type(titleInput, title);
  await user.type(descInput, description);
  expect(submitButton).not.toBeDisabled();
});

test('upload file works as expected', async () => {
  const title = faker.animal.cat();
  const description = faker.lorem.sentence();
  const blob = new Blob(['test', 'test']);
  const file = new File([blob, blob], 'file.png');

  render(<Help applicationName={applicationName} />, {
    wrapper: Wrappers,
  });

  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const suggestBug = screen.getByText('Report a bug');
  await user.click(suggestBug);

  const titleInput = screen.getByRole('textbox', { name: /title required/i });
  const descInput = screen.getByRole('textbox', {
    name: /description required/i,
  });
  await user.type(titleInput, title);
  await user.type(descInput, description);

  const fileUploadArea = screen.getByTestId('file-upload-area-input');

  await user.upload(fileUploadArea, file);

  const checkbox = screen.getByTestId('consent_checkbox');
  await user.click(checkbox);

  const submitButton = screen.getByRole('button', { name: /send/i });
  await user.click(submitButton);
});
