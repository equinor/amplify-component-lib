import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UrgencyOption } from 'src/organisms/TopBar/Resources/Feedback/Feedback.types';
import { Resources } from 'src/organisms/TopBar/Resources/Resources';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';
import { worker } from 'src/tests/setupBrowserTests';

import { delay, http, HttpResponse } from 'msw';
import { beforeEach } from 'vitest';

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReleaseNotesProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function fakeImageFile(bad = false) {
  const extension = bad ? '.tiff' : '.png';
  return new File([faker.lorem.sentence()], faker.word.noun() + extension);
}

function fakeInputs() {
  return {
    title: faker.animal.crocodilia(),
    description: faker.lorem.sentence(),
    url: 'jsembark.equinor.com',
  };
}

const SEVERITY_OPTIONS = [
  UrgencyOption.IMPEDES,
  UrgencyOption.UNABLE,
  UrgencyOption.NO_IMPACT,
] as const;

beforeEach(async () => {
  window.localStorage.clear();

  render(<Resources />, { wrapper: Wrappers });
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));
  await user.click(screen.getByText('Report a bug'));
});

test('Able to fill in form with successful response', async () => {
  const { title, description, url } = fakeInputs();
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/title/i), title);
  await user.type(screen.getByLabelText(/description/i), description);
  await user.type(screen.getByLabelText(/url/i), url);

  await user.click(screen.getByLabelText(/severity/i));
  const option = faker.helpers.arrayElement(SEVERITY_OPTIONS);
  const optionElement = screen.getByText(option);
  await user.click(optionElement);
  expect(screen.getByTestId('combobox-container')).toHaveTextContent(option);

  const sendButton = screen.getByTestId('submit-button');
  expect(sendButton).not.toBeDisabled();

  await user.click(sendButton);

  expect(await screen.findAllByText(/sending/i)).toHaveLength(2);

  expect(
    await screen.findByText(/Thank you/i, undefined, { timeout: 5000 })
  ).toBeInTheDocument();

  const text = screen.queryByText(/report a bug/i);
  await user.click(screen.getByRole('button', { name: /close/i }));

  expect(text).not.toBeInTheDocument();
});

const MOCK_SERVICE_NOW_ERROR = 'service now error';
const MOCK_SLACK_POST_ERROR = 'slack post error';
const MOCK_SLACK_FILE_ERROR = 'slack file error';

describe('Show expected error message when requests fail', () => {
  beforeEach(() => {
    worker.resetHandlers(
      http.get('*/api/v1/Token/AmplifyPortal/*', async () => {
        await delay('real');
        return HttpResponse.text(faker.string.nanoid());
      }),
      http.post('*!/api/v1/ServiceNow/incident', async () => {
        await delay('real');
        return HttpResponse.json(
          { message: MOCK_SERVICE_NOW_ERROR },
          { status: 500 }
        );
      }),
      http.post('*/api/v1/Slack/fileUpload', async () => {
        await delay('real');

        return HttpResponse.json(
          { message: MOCK_SLACK_FILE_ERROR },
          { status: 500 }
        );
      }),
      http.post('*/api/v1/Slack/postmessage', async () => {
        await delay('real');

        return HttpResponse.json(
          { message: MOCK_SLACK_POST_ERROR },
          { status: 500 }
        );
      })
    );
  });

  test('Show expected error message when requests fail', async () => {
    const { title, description, url } = fakeInputs();
    const image = fakeImageFile();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/title/i), title);
    await user.type(screen.getByLabelText(/description/i), description);
    await user.type(screen.getByLabelText(/url/i), url);

    await user.upload(screen.getByTestId('file-upload-area-input'), [image]);

    await user.click(screen.getByLabelText(/severity/i));
    const option = faker.helpers.arrayElement(SEVERITY_OPTIONS);
    const optionElement = screen.getByText(option);
    await user.click(optionElement);
    expect(screen.getByTestId('combobox-container')).toHaveTextContent(option);

    const sendButton = screen.getByTestId('submit-button');
    expect(sendButton).not.toBeDisabled();

    await user.click(sendButton);

    expect(await screen.findAllByText(/sending/i)).toHaveLength(2);

    expect(
      await screen.findByText(`Posting ${image.name}`, undefined, {
        timeout: 5000,
      })
    ).toBeInTheDocument();

    expect(await screen.findAllByText(/not found/i)).toHaveLength(3);
  });
});
