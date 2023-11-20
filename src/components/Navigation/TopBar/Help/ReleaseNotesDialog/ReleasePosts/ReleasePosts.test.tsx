import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ReleasePosts from './ReleasePosts';
import { CancelablePromise } from 'src/api';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen, waitFor } from 'src/tests/test-utils';

const releaseNotes = [
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: faker.lorem.paragraphs(10),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-06-29T10:48:49.6883+00:00',
  },
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Iqwee',
    body: faker.lorem.paragraphs(10),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-06-29T10:48:49.6883+00:00',
  },
];

const releaseNotesWithoutDate = [
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: faker.lorem.paragraphs(10),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: undefined,
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

let returnEmptyArray = false;
let returnWithEmptyDate = false;

vi.mock('src/api/services/ReleaseNotesService', () => {
  class ReleaseNotesService {
    public static getReleasenoteList(): CancelablePromise<any> {
      return new CancelablePromise((resolve) => {
        setTimeout(() => {
          if (returnEmptyArray) {
            resolve([]);
          } else if (returnWithEmptyDate) {
            resolve(releaseNotesWithoutDate);
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

test('show release note', async () => {
  render(<ReleasePosts />, {
    wrapper: Wrappers,
  });
  await waitFor(
    () => {
      const actual = screen.getByText(
        'Improved task board and reporting overview June'
      );
      expect(actual).toBeInTheDocument();
      expect(actual).toBeVisible();
    },
    { timeout: 500 }
  );
});
describe('release notes without created date', () => {
  beforeEach(() => {
    returnWithEmptyDate = true;
  });
  afterEach(() => {
    returnWithEmptyDate = false;
  });
  test('show release note without created date', async () => {
    render(<ReleasePosts />, {
      wrapper: Wrappers,
    });
    await waitFor(
      () => {
        const releaseNote =
          document.getElementsByClassName('release-notes').length;
        expect(releaseNote).toBe(0);
      },
      { timeout: 500 }
    );
  });
});

describe('Empty release notes', () => {
  beforeEach(() => {
    returnEmptyArray = true;
  });
  afterEach(() => {
    returnEmptyArray = false;
  });
  test('show "There are no posts at the moment" when no available release notes', async () => {
    render(<ReleasePosts />, {
      wrapper: Wrappers,
    });
    await waitFor(
      () => {
        const actual = screen.getByText('There are no posts at the moment');
        expect(actual).toBeInTheDocument();
        expect(actual).toBeVisible();
      },
      { timeout: 3000 }
    );
    returnEmptyArray = false;
  });
});
