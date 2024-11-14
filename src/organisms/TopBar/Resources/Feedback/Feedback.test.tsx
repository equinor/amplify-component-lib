import { act, ReactNode } from 'react';

import {
  CancelablePromise,
  ServiceNowIncidentResponse,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Resources } from '../Resources';
import { DEFAULT_REQUEST_ERROR_MESSAGE } from './Feedback.const';
import { FeedbackContentType, UrgencyOption } from './Feedback.types';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

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

vi.mock('@equinor/subsurface-app-management', async () => {
  class ServiceNowService {
    public static createIncident(): CancelablePromise<ServiceNowIncidentResponse> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError && !mockServicePartialError) {
            reject({ message: SERVICE_NOW_ERROR });
          } else {
            resolve({
              sysId: 'kljsdflk-fsd-asdf-fsddf',
            } as ServiceNowIncidentResponse);
          }
        }, 100)
      );
    }
  }
  class SlackService {
    public static fileUpload(formData: FormData): CancelablePromise<FormData> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError && !mockServicePartialError) {
            reject({ message: SLACK_FILE_ERROR });
          } else {
            resolve(formData);
          }
        }, 100)
      );
    }

    public static postmessage(formData?: FormData): Promise<unknown> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError || mockServicePartialError) {
            reject({
              message: defaultError ? undefined : SLACK_POST_ERROR,
            });
          } else {
            resolve(formData);
          }
        }, 100)
      );
    }
  }

  const actual = await vi.importActual('@equinor/subsurface-app-management');
  return { ...actual, ServiceNowService, SlackService };
});

const waitForMS = (timeout: number) => {
  return new Promise((r) => setTimeout(r, timeout));
};

function fakeImageFile(bad = false) {
  const extension = bad ? '.tiff' : '.png';
  return new File([faker.lorem.sentence()], faker.word.noun() + extension);
}

const createRegexToGetAttachment = (fileName: string) => {
  const split = fileName.split('.');
  return new RegExp(
    'uploaded file: ' + split[0].toLowerCase() + '\\.' + split[1],
    'i'
  );
};

function fakeInputs(): FeedbackContentType {
  return {
    title: faker.animal.crocodilia(),
    description: faker.lorem.sentence(),
    url: 'www.jsembark.equinor.com',
  };
}

const SERVICE_NOW_ERROR = 'service now error';
const SLACK_POST_ERROR = 'slack post error';
const SLACK_FILE_ERROR = 'slack file error';

let mockServiceHasError = false;
let mockServicePartialError = false;
let defaultError = false;
const severityOptions = [
  UrgencyOption.IMPEDES,
  UrgencyOption.UNABLE,
  UrgencyOption.NO_IMPACT,
];

beforeEach(async () => {
  render(<Resources />, { wrapper: Wrappers });
  const user = userEvent.setup();

  const resourceMenuButton = screen.getByRole('button');

  await user.click(resourceMenuButton);

  window.localStorage.clear();
});

describe(
  'Click "Report a bug" menu item',
  () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const reportBug = screen.getByText('Report a bug');

      await user.click(reportBug);
    });

    test('can close dialog by clicking cancel', async () => {
      const user = userEvent.setup();

      const titleInput = screen.getByLabelText(/title/i);

      expect(titleInput).toBeInTheDocument();

      const cancelButton = screen.getByText(/cancel/i);

      await user.click(cancelButton);

      expect(titleInput).not.toBeInTheDocument();
    });

    test('Url validation working as expected', async () => {
      mockServiceHasError = false;
      const user = userEvent.setup();

      const wrongUrl = 'www.google.com';
      const rightUrl = 'www.jsembark.equinor.com';

      const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);
      await user.type(urlInput, wrongUrl);

      act(() => {
        urlInput.blur();
      });
      const helperText = await screen.findByText(
        /URL must be from a .equinor/i
      );
      expect(helperText).toBeInTheDocument();
      await user.clear(urlInput);

      expect(helperText).not.toBeInTheDocument();

      await user.type(urlInput, wrongUrl);

      act(() => {
        urlInput.blur();
      });

      const helperTextAgain = await screen.findByText(
        /URL must be from a .equinor/i
      );

      expect(helperTextAgain).toBeInTheDocument();
      await user.type(urlInput, rightUrl);

      expect(helperTextAgain).not.toBeInTheDocument();
    }, 10000); // Setting timeout for this test to be 10 seconds

    describe('Input title, description and url', () => {
      beforeEach(async () => {
        const { title, description, url } = fakeInputs();
        const user = userEvent.setup();

        const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
        const descInput: HTMLInputElement =
          screen.getByLabelText(/description/i);
        const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);

        await user.type(titleInput, title);
        await user.type(descInput, description);
        await user.type(urlInput, url ?? '');
      });

      describe('Severity options', () => {
        for (const option of severityOptions) {
          test(`can select and submit "${option}" severity`, async () => {
            mockServiceHasError = false;
            const user = userEvent.setup();

            const severityInput: HTMLInputElement =
              screen.getByLabelText(/severity/i);

            await user.click(severityInput);

            const severityOption = screen.getByText(option);

            expect(severityOption).toBeInTheDocument();

            await user.click(severityOption);

            expect(screen.getByTestId('combobox-container')).toHaveTextContent(
              option
            );

            const submitButton = screen.getByText(/send/i);

            expect(submitButton).not.toBeDisabled();
            await user.click(submitButton);
          }, 15000); // Setting timeout for this test to be 15 seconds
        }
      });

      test('shows error message when everything fails', async () => {
        mockServiceHasError = true;
        mockServicePartialError = false;

        const imageOne = fakeImageFile();
        const user = userEvent.setup();

        const fileUploadArea = screen.getByTestId('file-upload-area-input');
        await user.upload(fileUploadArea, [imageOne]);

        const submitButton = screen.getByTestId('submit-button');
        await user.click(submitButton);

        expect(
          await screen.findByText(`Posting ${imageOne.name}`)
        ).toBeInTheDocument();

        expect(await screen.findByText(SERVICE_NOW_ERROR)).toBeInTheDocument();
        expect(await screen.findByText(SLACK_POST_ERROR)).toBeInTheDocument();
        expect(await screen.findByText(SLACK_FILE_ERROR)).toBeInTheDocument();
      }, 10000);

      test('shows more details if slack request fails, and can return to form to retry', async () => {
        mockServiceHasError = true;
        mockServicePartialError = true;

        const imageOne = fakeImageFile();

        const user = userEvent.setup();

        const fileUploadArea = screen.getByTestId('file-upload-area-input');

        await user.upload(fileUploadArea, [imageOne]);

        const submitButton = screen.getByTestId('submit-button');
        await user.click(submitButton);

        await act(async () => {
          await waitForMS(2500);
        });

        expect(
          await screen.findByText(`Posting ${imageOne.name}`)
        ).toBeInTheDocument();

        const retryButton = screen.getByText(/retry/i);
        expect(retryButton).not.toBeDisabled();

        await user.click(retryButton);

        const titleInputAgain: HTMLInputElement =
          await screen.findByLabelText(/title/i);
        const currentTitleInputValue = titleInputAgain.value;

        expect(
          screen.getByText(/The report has already been sent to service now/i)
        ).toBeInTheDocument();
        const resetForm = screen.getByTestId('reset-form-button');

        expect(titleInputAgain.value).toBe(currentTitleInputValue);
        await user.click(resetForm);

        await waitFor(() =>
          expect(titleInputAgain.value).not.toBe(currentTitleInputValue)
        );
      }, 10000);

      test('Inputting all fields with file works as expected', async () => {
        mockServiceHasError = false;
        mockServicePartialError = false;
        defaultError = false;
        const imageOne = fakeImageFile();
        const imageTwo = fakeImageFile();

        const user = userEvent.setup();

        const fileUploadArea = screen.getByTestId('file-upload-area-input');

        await user.upload(fileUploadArea, [imageTwo]);

        // Delete image file
        const file2nameElement = screen.getByAltText(
          createRegexToGetAttachment(imageTwo.name)
        );

        expect(file2nameElement).toBeInTheDocument();

        await user.hover(file2nameElement);

        const removeAttachmentButton = screen.getByTestId(
          'attachment-delete-button'
        );

        expect(removeAttachmentButton).toBeInTheDocument();

        if (removeAttachmentButton) {
          await user.click(removeAttachmentButton);
          expect(file2nameElement).not.toBeInTheDocument();
        }

        // Upload three files, two being duplicates, so expect only two files to be shown
        await user.upload(fileUploadArea, [imageOne]);
        await user.upload(fileUploadArea, [imageTwo]);
        await user.upload(fileUploadArea, [imageOne]);

        const allDeleteButtons = screen.getAllByTestId(
          'attachment-delete-button'
        );

        expect(allDeleteButtons.length).toBe(2);

        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).not.toBeDisabled();
        await user.click(submitButton);

        await act(async () => {
          await waitForMS(2500);
        });

        expect((await screen.findAllByText(/success/i)).length).toBe(2);

        expect(await screen.findByText(/Thank you/i)).toBeInTheDocument();

        const closeButton = screen.getByText(/close/i);
        const text = screen.queryByText(/report a bug/i);
        await user.click(closeButton);

        expect(text).not.toBeInTheDocument();
      }, 20000);
    });
  },
  { sequential: true, concurrent: false }
);

describe('Click "Suggest a feature" menu item, and fill info', () => {
  beforeEach(async () => {
    const user = userEvent.setup();

    const { title, description } = fakeInputs();
    const suggestFeature = screen.getByText(/suggest idea/i);
    await user.click(suggestFeature);

    const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
    const descInput: HTMLInputElement = screen.getByLabelText(/description/i);

    await user.type(titleInput, title);
    await user.type(descInput, description);
  });

  test('shows default error message if errorText is undefined', async () => {
    mockServiceHasError = true;
    mockServicePartialError = false;
    defaultError = true;

    const submitButton = screen.getByTestId('submit-button');
    const user = userEvent.setup();
    await user.click(submitButton);

    expect(
      await screen.findByText(DEFAULT_REQUEST_ERROR_MESSAGE)
    ).toBeInTheDocument();
  }, 10000); // Setting timeout for this test to be 10 seconds

  test('suggest a feature dialog submit button enabled at correct time', async () => {
    mockServiceHasError = false;
    mockServicePartialError = false;
    const submitButton = screen.getByTestId('submit-button');
    const user = userEvent.setup();
    await user.click(submitButton);
    expect(await screen.findByText(/success/i)).toBeInTheDocument();

    expect(await screen.findByText(/Thank you/i)).toBeInTheDocument();
  }, 15000);
});
