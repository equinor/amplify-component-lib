import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import {
  CancelablePromise,
  ReleaseNote,
  ReleaseNotesProvider,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleasePosts } from './ReleasePosts';
import { AuthProvider } from 'src/providers';
import { render, screen, waitFor, within } from 'src/tests/test-utils';

const releaseNotes = [
  {
    releaseId: '231d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Yet other August',
    body: faker.lorem.paragraphs(1),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-08-15T10:05:01.6920+00:00',
  },
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
    releaseId: '271d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Other August',
    body: faker.lorem.paragraphs(1),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-08-29T10:05:01.6920+00:00',
  },
  {
    releaseId: '281d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Post from January',
    body: faker.lorem.paragraphs(1),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-01-10T22:31:15.1927+00:00',
  },
  {
    releaseId: '211d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Old August',
    body: faker.lorem.paragraphs(1),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-08-01T10:05:01.6920+00:00',
  },
  {
    releaseId: '251d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Latest August',
    body: faker.lorem.paragraphs(1),
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-08-31T21:05:01.6920+00:00',
  },
] as ReleaseNote[];

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

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
    public static getReleasenoteList(): CancelablePromise<unknown> {
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

test('show release note', async () => {
  render(<ReleasePosts posts={releaseNotes} />, {
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

test('sort release notes descending', async () => {
  render(<ReleasePosts posts={releaseNotes} />, {
    wrapper: Wrappers,
  });
  await waitFor(
    () => {
      const posts = screen.getAllByTestId('release-post');

      const date0 = within(posts[0]).getByText(/31\. august 2023/i);
      const date1 = within(posts[1]).getByText(/29\. august 2023/i);
      const date2 = within(posts[2]).getByText(/15\. august 2023/i);
      const date3 = within(posts[3]).getByText(/1\. august 2023/i);
      const date4 = within(posts[4]).getByText(/29\. june 2023/i);
      const date5 = within(posts[5]).getByText(/10\. january 2023/i);

      expect(date0).toBeInTheDocument();
      expect(date1).toBeInTheDocument();
      expect(date2).toBeInTheDocument();
      expect(date3).toBeInTheDocument();
      expect(date4).toBeInTheDocument();
      expect(date5).toBeInTheDocument();
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
    render(<ReleasePosts posts={releaseNotes} />, {
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
    render(<ReleasePosts posts={[]} />, {
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
