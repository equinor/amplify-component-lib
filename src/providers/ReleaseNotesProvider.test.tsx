import { ReactNode } from 'react';

import { ReleaseNote } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleaseNotesProvider, useReleaseNotes } from './ReleaseNotesProvider';
import { sortReleaseNotesByDate } from 'src/providers/ReleaseNotesProvider.utils';
import { renderHook, waitFor } from 'src/tests/browsertest-utils';

describe('Release notes provider', () => {
  test('should not return any data when enabled is set to false', () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <ReleaseNotesProvider enabled={false}>
            {children}
          </ReleaseNotesProvider>
        </QueryClientProvider>
      );
    };
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper,
    });

    expect(result.current.mostRecentReleaseNote).toBeUndefined();
  });

  test("'useReleaseNotes' hook throws error if using outside of context", () => {
    // Hides console errors since this test explicitly tests for thrown errors
    console.error = vi.fn();
    expect(() => renderHook(() => useReleaseNotes())).toThrow(
      'useReleaseNotes must be used within a ReleaseNotesProvider'
    );
  });

  test('Opens is true if it is a new release note and popUpNewReleaseNote is true', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <ReleaseNotesProvider popUpNewReleaseNote>
            {children}
          </ReleaseNotesProvider>
        </QueryClientProvider>
      );
    };

    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.open).toBeTruthy());
  });
});

const notes: ReleaseNote[] = [
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2023-06-29',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2020-06-29',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2022-06-29',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2023-01-17',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2022-08-10',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2021-08-11',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    draft: false,
    releaseId: faker.string.uuid(),
    createdDate: '2020-01-31',
    applicationName: '',
    title: '',
    body: '',
  },
];

describe('release notes utils', () => {
  test('sort release notes by created date in descending order', () => {
    const sorted = notes.toSorted(sortReleaseNotesByDate);
    for (let i = 1; i < sorted.length; i++) {
      const date1 = new Date(sorted[i].createdDate);
      const date2 = new Date(sorted[i - 1].createdDate);
      expect(date1 < date2).toBeTruthy();
    }
  });
});
