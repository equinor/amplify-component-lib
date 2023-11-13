import { MemoryRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ReleasePosts from './ReleasePosts';
import { CancelablePromise } from 'src/api';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen } from 'src/tests/test-utils';

const releaseNotes = [
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: '<h1>Release notes body text</h1>',
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-06-29T10:48:49.6883+00:00',
  },
];

const Wrappers = ({ children }: { children: any }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <MemoryRouter>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const mockServiceHasError = false;

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
  }
  return { ReleaseNotesService };
});

test('should render a loader when waiting for data', () => {
  render(<ReleasePosts />, {
    wrapper: Wrappers,
  });
  const actual = screen.getByRole('progressbar');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
});
