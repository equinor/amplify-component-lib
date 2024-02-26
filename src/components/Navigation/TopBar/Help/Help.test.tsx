import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DEFAULT_REQUEST_ERROR_MESSAGE } from './Feedback/Feedback.const';
import { Help } from './Help';
import { CancelablePromise, ServiceNowIncidentResponse } from 'src/api';
import {
  FeedbackContentType,
  UrgencyOption,
} from 'src/components/Navigation/TopBar/Help/Feedback/Feedback.types';
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
  within,
} from 'src/tests/test-utils';

import { expect } from 'vitest';

const releaseNotes = [
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: '<h1>Release notes body text</h1>',
    tags: ['Improvement', 'Bug fix'],
    createdDate: '2023-06-29T10:48:49.6883+00:00',
  },
];

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
        <ReleaseNotesProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const waitForMS = (timeout: number) => {
  return new Promise((r) => setTimeout(r, timeout));
};

async function fakeImageFile(bad = false) {
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
    url: 'www.amplify.equinor.com',
  };
}

const SERVICE_NOW_ERROR = 'service now error';
const SLACK_POST_ERROR = 'slack post error';
const SLACK_FILE_ERROR = 'slack file error';

let mockServiceHasError = false;
let mockServicePartialError = false;
let defaultError = false;

vi.mock('src/api/services/PortalService', () => {
  class PortalService {
    public static createIncident(): CancelablePromise<ServiceNowIncidentResponse> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError && !mockServicePartialError) {
            reject({ message: SERVICE_NOW_ERROR });
          } else {
            resolve({ sysId: 'kljsdflk-fsd-asdf-fsddf' });
          }
        }, 500)
      );
    }

    public static fileUpload(formData?: FormData): CancelablePromise<any> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError && !mockServicePartialError) {
            reject({ message: SLACK_FILE_ERROR });
          } else {
            resolve(formData);
          }
        }, 500)
      );
    }

    public static postmessage(formData?: FormData): Promise<any> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (mockServiceHasError || mockServicePartialError) {
            reject({
              message: defaultError ? undefined : SLACK_POST_ERROR,
            });
          } else {
            resolve(formData);
          }
        }, 500)
      );
    }
  }
  return { PortalService };
});

vi.mock('src/api/services/ReleaseNotesService', () => {
  class ReleaseNotesService {
    public static getReleasenoteList(): CancelablePromise<any> {
      return new CancelablePromise((resolve, reject) => {
        setTimeout(() => {
          if (mockServiceHasError) {
            reject('error release notes');
          } else {
            resolve(releaseNotes);
          }
        }, 300);
      });
    }
    public static getContainerSasUri(): CancelablePromise<any> {
      return new CancelablePromise((resolve) => {
        setTimeout(() => {
          resolve(`PORTALURL?FAKE_TOKEN`);
        }, 100);
      });
    }
  }
  return { ReleaseNotesService };
});

const severityOptions = [
  UrgencyOption.IMPEDES,
  UrgencyOption.UNABLE,
  UrgencyOption.NO_IMPACT,
];

describe('Help', () => {
  test('Behaves as expected', async () => {
    render(<Help>Child</Help>, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const childElement = await screen.findByText('Child');

    expect(childElement).toBeInTheDocument();
  });

  test('Opens and closes as expected', async () => {
    render(<Help />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await user.click(button);
    await user.click(document.body);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('hide props working as expected', async () => {
    render(<Help hideFeedback={true} hideReleaseNotes={true} />, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const releaseNotes = screen.queryByText('Release notes');
    const reportBug = screen.queryByText('Report a bug');
    const suggest = screen.queryByText('Suggest a feature');

    expect(releaseNotes).not.toBeInTheDocument();
    expect(reportBug).not.toBeInTheDocument();
    expect(suggest).not.toBeInTheDocument();
  });

  describe('Release notes', () => {
    test('should close the dialog by clicking the close button inside', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Help />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);

      const dialog = within(container.children[1] as HTMLElement);
      const closeButton = dialog.getByRole('button', {
        hidden: true,
        name: 'close modal',
      });
      expect(closeButton).toBeInTheDocument();
      await user.click(closeButton);
      const title = screen.queryByText('Release Notes');
      expect(title).not.toBeInTheDocument();
    });
    test('can close dialog by clicking outside', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Help />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();

      const button = screen.getByRole('button');

      await user.click(button);

      const releaseNotesButton = screen.getByRole('menuitem', {
        name: 'Release notes',
      });

      await user.click(releaseNotesButton);

      const title = screen.getByText('Release Notes');

      expect(title).toBeInTheDocument();
      const dialog = screen.getByRole('dialog', { hidden: true });
      await user.click(dialog);
      const titleHeader = screen.queryByText('Release Notes');

      expect(titleHeader).not.toBeInTheDocument();
    });
    test('show a release note', async () => {
      mockServiceHasError = false;
      render(
        <MemoryRouter initialEntries={['/']}>
          <Help />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const button = screen.getByRole('button');
      await user.click(button);
      const releaseButton = document.querySelector('#release-notes');
      if (releaseButton) {
        await user.click(releaseButton);
      }
      const releaseNoteText = screen.getByText('Release Notes');
      expect(releaseNoteText).toBeInTheDocument();
      await waitFor(
        () => {
          const actualText = screen.getByText('Release notes body text');
          return expect(actualText).toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });
    test('should show Nothing matching "SearchTerm" when no matching release notes given only entered a search and no filter', async () => {
      mockServiceHasError = false;
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Help />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);
      await waitFor(
        () => {
          const releaseNoteText = screen.getByText('Release notes body text');
          expect(releaseNoteText).toBeInTheDocument();
        },
        { timeout: 600 }
      );

      const dialog = within(container.children[1] as HTMLElement);
      const searchInput = dialog.getByRole('textbox', {
        hidden: true,
      });
      expect(searchInput).toBeInTheDocument();
      const searchTerm = faker.animal.crocodilia();
      await user.type(searchInput, searchTerm);

      const nothingMatchinText = dialog.getByText(
        `Nothing matching "${searchTerm} "`
      );
      expect(nothingMatchinText).toBeInTheDocument();
    });
    test('should show Nothing matching " Feature" when no matching release notes given only selected type', async () => {
      mockServiceHasError = false;
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Help />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);
      await waitFor(
        () => {
          const releaseNoteText = screen.getByText('Release notes body text');
          expect(releaseNoteText).toBeInTheDocument();
        },
        { timeout: 600 }
      );

      const dialog = within(container.children[1] as HTMLElement);
      const filterButton = dialog.getByRole('button', {
        hidden: true,
        name: 'Filter by',
      });
      expect(filterButton).toBeInTheDocument();
      await user.click(filterButton);
      const typeButton = dialog.getByRole('menuitem', {
        hidden: true,
        name: 'Type',
      });
      await user.click(typeButton);
      expect(typeButton).toBeInTheDocument();
      const featureButton = dialog.getByRole('menuitem', {
        hidden: true,
        name: 'Feature',
      });
      await user.click(featureButton);

      const nothingMatchinText = dialog.getByText(
        `Nothing matching " Feature"`
      );
      expect(nothingMatchinText).toBeInTheDocument();
    });
  });

  describe('Report bug and feedback', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });
    test('can close dialog by clicking outside', async () => {
      render(
        <>
          <Help />
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
        const { container } = render(<Help />, {
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
        )!;

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
      mockServicePartialError = false;
      const title = faker.animal.cat();
      const description = faker.lorem.sentence();
      render(<Help />, {
        wrapper: Wrappers,
      });
      const user = userEvent.setup();

      const button = screen.getByRole('button');
      await user.click(button);

      const suggestFeature = screen.getByText('Suggest a feature');
      await user.click(suggestFeature);

      const titleInput = screen.getByLabelText(/title/i);
      const descInput = screen.getByLabelText(/description/i);
      const submitButton = screen.getByTestId('submit-button');

      expect(submitButton).toBeDisabled();
      await user.type(titleInput, title);
      await user.type(descInput, description);
      expect(submitButton).not.toBeDisabled();

      await user.click(submitButton);

      await waitFor(
        () => expect(screen.getByText(/success/i)).toBeInTheDocument(),
        { timeout: 2000 }
      );
      await waitFor(
        () => expect(screen.getByText(/Thank you/i)).toBeInTheDocument(),
        { timeout: 2000 }
      );
    }, 15000); // Setting timeout for this test to be 15 seconds

    test('Inputting all fields with file works as expected', async () => {
      mockServiceHasError = false;
      const { title, description, url } = fakeInputs();
      const imageOne = await fakeImageFile();
      const imageTwo = await fakeImageFile();

      render(<Help />, {
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

      const submitButton = screen.getByTestId('submit-button');

      expect(submitButton).toBeDisabled();

      await user.type(titleInput, title);
      await user.type(descInput, description);
      await user.type(urlInput, url ?? '');

      expect(titleInput.value).toEqual(title);
      expect(descInput.value).toEqual(description);
      expect(urlInput.value).toEqual(url);

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

      expect(submitButton).not.toBeDisabled();
      await user.click(submitButton);

      await waitForMS(3000);
      expect(screen.getAllByText(/success/i).length).toBe(2);

      await waitFor(
        () => expect(screen.getByText(/Thank you/i)).toBeInTheDocument(),
        { timeout: 2000 }
      );

      const closeButton = screen.getByText(/close/i);
      await user.click(closeButton);
      await waitForMS(1000);
      expect(screen.queryByText(/report a bug/i)).not.toBeInTheDocument();
      await waitFor(() => {});
    }, 20000); // Setting timeout for this test to be 20 seconds

    test('Url validation working as expected', async () => {
      mockServiceHasError = false;
      render(<Help />, {
        wrapper: Wrappers,
      });
      const user = userEvent.setup();

      const wrongUrl = 'www.google.com';
      const rightUrl = 'www.amplify.equinor.com';

      const button = screen.getByRole('button');
      await user.click(button);

      const reportBug = screen.getByText('Report a bug');
      await user.click(reportBug);

      const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);
      await user.type(urlInput, wrongUrl);

      urlInput.blur();
      await waitForMS(1000);
      const helperText = screen.queryByText(/URL must be from a .equinor/i);
      expect(helperText!).toBeInTheDocument();

      await user.clear(urlInput);

      expect(helperText).not.toBeInTheDocument();

      await user.type(urlInput, wrongUrl);

      urlInput.blur();
      await waitForMS(1000);
      const helperTextAgain = screen.queryByText(
        /URL must be from a .equinor/i
      );

      expect(helperTextAgain!).toBeInTheDocument();
      await user.type(urlInput, rightUrl);

      expect(helperTextAgain).not.toBeInTheDocument();
    }, 10000); // Setting timeout for this test to be 10 seconds

    test('shows more details if slack request fails, and can return to form to retry', async () => {
      mockServiceHasError = true;
      mockServicePartialError = true;
      const { title, description } = fakeInputs();
      const imageOne = await fakeImageFile();

      render(<Help />, {
        wrapper: Wrappers,
      });

      const user = userEvent.setup();

      const button = screen.getByRole('button');
      await user.click(button);

      const reportBug = screen.getByText(/report a bug/i);
      await user.click(reportBug);

      const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
      const descInput: HTMLInputElement = screen.getByLabelText(/description/i);

      const submitButton = screen.getByTestId('submit-button');

      expect(submitButton).toBeDisabled();

      await user.type(titleInput, title);
      await user.type(descInput, description);

      expect(titleInput.value).toEqual(title);
      expect(descInput.value).toEqual(description);

      const fileUploadArea = screen.getByTestId('file-upload-area-input');

      await user.upload(fileUploadArea, [imageOne]);

      await user.click(submitButton);

      await waitForMS(2500);

      expect(screen.getByText(`Posting ${imageOne.name}`)).toBeInTheDocument();

      const retryButton = screen.getByText(/retry/i);
      expect(retryButton).not.toBeDisabled();

      await user.click(retryButton);

      expect(
        screen.getByText(/The report has already been sent to service now/i)
      ).toBeInTheDocument();
      const resetForm = screen.getByTestId('reset-form-button');

      const titleInputAgain: HTMLInputElement = screen.getByLabelText(/title/i);
      expect(titleInputAgain.value).toBe(title);
      await user.click(resetForm);
      await waitForMS(1000);
      expect(titleInputAgain.value).not.toBe(title);
    }, 10000); // Setting timeout for this test to be 10 seconds

    test('shows error message when everything fails', async () => {
      mockServiceHasError = true;
      mockServicePartialError = false;
      const { title, description } = fakeInputs();
      const imageOne = await fakeImageFile();
      console.error = vi.fn();
      render(<Help />, {
        wrapper: Wrappers,
      });

      const user = userEvent.setup();

      const button = screen.getByRole('button');
      await user.click(button);

      const reportBug = screen.getByText(/report a bug/i);
      await user.click(reportBug);

      const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
      const descInput: HTMLInputElement = screen.getByLabelText(/description/i);

      const submitButton = screen.getByTestId('submit-button');

      expect(submitButton).toBeDisabled();

      await user.type(titleInput, title);
      await user.type(descInput, description);

      expect(titleInput.value).toEqual(title);
      expect(descInput.value).toEqual(description);

      const fileUploadArea = screen.getByTestId('file-upload-area-input');

      await user.upload(fileUploadArea, [imageOne]);

      await user.click(submitButton);

      await waitForMS(2500);

      expect(screen.getByText(`Posting ${imageOne.name}`)).toBeInTheDocument();

      expect(screen.getByText(SERVICE_NOW_ERROR)).toBeInTheDocument();
      expect(screen.getByText(SLACK_POST_ERROR)).toBeInTheDocument();
      expect(screen.getByText(SLACK_FILE_ERROR)).toBeInTheDocument();
    }, 10000); // Setting timeout for this test to be 10 seconds

    test('shows default error message if errorText is undefined', async () => {
      mockServiceHasError = true;
      mockServicePartialError = false;
      defaultError = true;

      const { title, description } = fakeInputs();

      console.error = vi.fn();
      render(<Help />, {
        wrapper: Wrappers,
      });

      const user = userEvent.setup();

      const button = screen.getByRole('button');
      await user.click(button);

      const suggestFeature = screen.getByText(/suggest/i);
      await user.click(suggestFeature);

      const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
      const descInput: HTMLInputElement = screen.getByLabelText(/description/i);

      const submitButton = screen.getByTestId('submit-button');

      expect(submitButton).toBeDisabled();

      await user.type(titleInput, title);
      await user.type(descInput, description);

      expect(titleInput.value).toEqual(title);
      expect(descInput.value).toEqual(description);

      await user.click(submitButton);

      await waitForMS(2500);

      expect(
        screen.getByText(DEFAULT_REQUEST_ERROR_MESSAGE)
      ).toBeInTheDocument();
    }, 10000); // Setting timeout for this test to be 10 seconds
  });
});
