import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FilterMonths from './FilterMonths';
import { CancelablePromise } from 'src/api';
import { usePageMenu } from 'src/hooks';
import {
  AuthProvider,
  PageMenuProvider,
  ReleaseNotesProvider,
} from 'src/providers';
import {
  render,
  renderHook,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/test-utils';

const items = [
  {
    label: '2023',
    value: '2023',
  },
  {
    label: '2022',
    value: '2022',
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
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: '<h1>Release notes body text</h1>',
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2022-06-29T10:48:49.6883+00:00',
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
        <ReleaseNotesProvider>
          <PageMenuProvider items={items}>{children}</PageMenuProvider>
        </ReleaseNotesProvider>
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
test('should handle click on year', async () => {
  render(<FilterMonths />, {
    wrapper: Wrappers,
  });

  const { result } = renderHook(usePageMenu, { wrapper: Wrappers });

  const user = userEvent.setup();
  expect(result.current.selected).toBe('2023');
  await waitFor(
    async () => {
      const actual = screen.getByRole('button', { name: /2022/i });
      await user.click(actual);

      expect(result.current.selected).toBe('2023');
      expect(actual).toBeInTheDocument();
      expect(actual).toBeVisible();
    },
    { timeout: 500 }
  );
});
test('should handle click on month', async () => {
  render(<FilterMonths />, {
    wrapper: Wrappers,
  });

  const { result } = renderHook(usePageMenu, { wrapper: Wrappers });

  const user = userEvent.setup();
  expect(result.current.selected).toBe('2023');
  await waitFor(
    async () => {
      const monthButton = screen.getByRole('button', {
        name: /june 2023/i,
      });
      expect(monthButton).toBeVisible();
      await user.click(monthButton);
      expect(monthButton).toBeInTheDocument();
    },
    { timeout: 500 }
  );
});
