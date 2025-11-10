import { ReactNode } from 'react';

import { ServiceNowIncidentResponse } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';

import { DEFAULT_FEEDBACK_LOCAL_STORAGE } from 'src/organisms/TopBar/Resources/Feedback/Feedback.const';
import {
  FeedbackType,
  UrgencyOption,
} from 'src/organisms/TopBar/Resources/Feedback/Feedback.types';
import { Resources } from 'src/organisms/TopBar/Resources/Resources';
import { TopBar } from 'src/organisms/TopBar/TopBar';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';
import {
  renderWithRouter,
  screen,
  test,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

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

describe('Report a bug', () => {
  beforeEach(async () => {
    window.localStorage.clear();

    await renderWithRouter(
      <TopBar
        applicationIcon="test"
        applicationName="test"
        currentField={{
          name: 'field1',
          country: 'NOR',
          uuid: 'uuid-1',
        }}
      >
        <Resources />
      </TopBar>,
      { initialEntries: ['/'], routes: ['/'] },
      { wrapper: Wrappers }
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Report a bug'));
  });

  test('Able to close as expected', async () => {
    const user = userEvent.setup();

    const text = screen.queryByText(/report a bug/i);
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(text).not.toBeInTheDocument();
  });

  test('Able to upload file and then remove it', async () => {
    const image = fakeImageFile();
    const user = userEvent.setup();

    await user.upload(screen.getByTestId('file-upload-area-input'), [
      image,
      image,
    ]);

    const removeButton = screen.getByTestId('attachment-delete-button');
    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);

    expect(removeButton).not.toBeInTheDocument();
  });

  test('Able to fill in form with successful response', async () => {
    const { title, description, url } = fakeInputs();
    const image = fakeImageFile();
    const user = userEvent.setup();

    await user.upload(screen.getByTestId('file-upload-area-input'), [image]);
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

    await waitFor(
      () =>
        expect(
          window.localStorage.getItem(
            `${FeedbackType.BUG}-feedbackContentAndRequestStatus`
          )
        ).toBe(JSON.stringify(DEFAULT_FEEDBACK_LOCAL_STORAGE)),
      { timeout: 3000 }
    );

    const text = screen.queryByText(/report a bug/i);
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(text).not.toBeInTheDocument();
  });

  const MOCK_SERVICE_NOW_ERROR = 'service now error';
  const MOCK_SLACK_POST_ERROR = 'slack post error';
  const MOCK_SLACK_FILE_ERROR = 'slack file error';

  test('Show expected error message when requests fail', async ({ worker }) => {
    worker.use(
      http.get('*/api/v1/ReleaseNotes*', async () => {
        await delay('real');
        return HttpResponse.json([]);
      }),
      http.get('*/api/v1/Token/AmplifyPortal/*', async () => {
        await delay('real');
        return HttpResponse.text(faker.string.nanoid());
      }),
      http.post('*/api/v1/ServiceNow/incident', async () => {
        return HttpResponse.json(
          { message: MOCK_SERVICE_NOW_ERROR },
          { status: 500 }
        );
      }),
      http.post('*/api/v1/Slack/fileUpload', async () => {
        return HttpResponse.json(
          { message: MOCK_SLACK_FILE_ERROR },
          { status: 500 }
        );
      }),
      http.post('*/api/v1/Slack/postmessage', async () => {
        return HttpResponse.json(
          { message: MOCK_SLACK_POST_ERROR },
          { status: 500 }
        );
      })
    );

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

    expect(await screen.findAllByText('Sending...')).toHaveLength(2);

    await waitForElementToBeRemoved(() => screen.getAllByText('Sending...'));

    expect(
      await screen.findAllByText(/internal server error/i, undefined, {
        timeout: 50000,
      })
    ).toHaveLength(3);

    await user.click(screen.getByRole('button', { name: /retry/i }));
  });

  test('Form is partially locked when the service now request succeeds but slack fails', async ({
    worker,
  }) => {
    worker.use(
      http.get('*/api/v1/ReleaseNotes*', async () => {
        await delay('real');
        return HttpResponse.json([]);
      }),
      http.get('*/api/v1/Token/AmplifyPortal/*', async () => {
        await delay('real');
        return HttpResponse.text(faker.string.nanoid());
      }),
      http.post('*/api/v1/ServiceNow/incident', async () => {
        await delay('real');
        return HttpResponse.json({
          sysId: faker.string.uuid(),
        } as ServiceNowIncidentResponse);
      }),
      http.post('*/api/v1/Slack/fileUpload', async () => {
        return HttpResponse.json(
          { message: MOCK_SLACK_FILE_ERROR },
          { status: 500 }
        );
      }),
      http.post('*/api/v1/Slack/postmessage', async () => {
        return HttpResponse.json(
          { message: MOCK_SLACK_POST_ERROR },
          { status: 500 }
        );
      })
    );

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

    expect(await screen.findAllByText('Sending...')).toHaveLength(2);

    await waitForElementToBeRemoved(() => screen.getAllByText('Sending...'), {
      timeout: 2000,
    });

    expect(
      await screen.findAllByText(/internal server error/i, undefined, {
        timeout: 50000,
      })
    ).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: /retry/i }));

    expect(screen.getByText(/the report has already/i)).toBeInTheDocument();
  });
});
