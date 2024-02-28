import { ReactElement, ReactNode, SetStateAction } from 'react';
import { MemoryRouter } from 'react-router';

import { AccountInfo } from '@azure/msal-browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ReleaseNotes from './ReleaseNotes';
import { CancelablePromise } from 'src/api';
import { SieveValue } from 'src/components/Inputs/Sieve/Sieve.types';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import * as useReleaseNotes from 'src/providers/ReleaseNotesProvider';
import { render, within } from 'src/tests/test-utils';

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

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <ReleaseNotesProvider>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const mockServiceHasError = false;

describe('ReleaseNotes', () => {
  const openMock = vi.fn();
  const useReleaseNotesSpy = vi.spyOn(useReleaseNotes, 'useReleaseNotes');
  beforeAll(() => {
    vi.mock('@azure/msal-react', () => ({
      MsalProvider: (children: ReactElement) => <div>{children}</div>,
    }));

    vi.mock('@azure/msal-browser', () => {
      return {
        PublicClientApplication: class PublicClientApplication {
          constructor() {
            console.log('created');
          }
        },
        AccountInfo: { username: 'mock' } as AccountInfo,
      };
    });
    vi.mock('src/api/services/ReleaseNotesService', () => {
      class ReleaseNotesService {
        public static getReleasenoteList(): CancelablePromise<unknown> {
          return new CancelablePromise((resolve, reject) => {
            setTimeout(() => {
              if (mockServiceHasError) {
                reject('error release notes');
              } else {
                resolve(releaseNotes);
              }
            }, 3000);
          });
        }
        public static getContainerSasUri(): CancelablePromise<unknown> {
          return new CancelablePromise((resolve) => {
            setTimeout(() => {
              resolve(`PORTALURL?FAKE_TOKEN`);
            }, 100);
          });
        }
      }
      return { ReleaseNotesService };
    });
    useReleaseNotesSpy.mockReturnValue({
      releaseNotesYears: [],
      open: true,
      setOpen: openMock,
      search: {
        searchValue: undefined,
        sortValue: undefined,
        filterValues: undefined,
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setSearch: function (value: SetStateAction<SieveValue>): void {
        throw new Error('Function not implemented.');
      },
      toggle: function (): void {
        throw new Error('Function not implemented.');
      },
      filteredData: [],
    });
  });
  afterAll(() => {
    vi.clearAllMocks();
  });
  test('should render a loader when waiting for data', () => {
    const { container } = render(<ReleaseNotes />, {
      wrapper: Wrappers,
    });
    const dialog = within(container.children[0] as HTMLElement);
    const actual = dialog.getByRole('progressbar', { hidden: true });
    expect(actual).toBeInTheDocument();
  });
});
