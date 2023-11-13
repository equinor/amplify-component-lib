import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FilterMonths from './FilterMonths';
import { CancelablePromise } from 'src/api';
import {
  AuthProvider,
  PageMenuProvider,
  ReleaseNotesProvider,
} from 'src/providers';
import { render, screen, waitFor } from 'src/tests/test-utils';

const items = [
  {
    label: 'qwert',
    value: 'qwert',
  },
];

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

const Wrappers = ({ children }: { children: any }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <PageMenuProvider items={items}>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </PageMenuProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should render month element given release notes', async () => {
  render(<FilterMonths />, {
    wrapper: Wrappers,
  });

  await waitFor(
    () => {
      const actual = screen.getByText('2023');
      expect(actual).toBeInTheDocument();
      expect(actual).toBeVisible();
    },
    { timeout: 500 }
  );
});
