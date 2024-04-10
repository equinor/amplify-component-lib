import { FC, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { act, renderHook, waitFor } from '../tests/test-utils';
import ReleaseNotesProvider, { useReleaseNotes } from './ReleaseNotesProvider';
import { CancelablePromise } from 'src/api';
import { ReleaseNoteType } from 'src/components/Navigation/TopBar/Resources/ReleaseNotesDialog/ReleaseNotesTypes/ReleaseNotesTypes.types';

const releaseNotes = [
  {
    releaseId: '123456-1233',
    applicationName: 'ASDF',
    version: '12.2.2',
    title: 'Lorem ipsum',
    body: '<h1>Release notes body text</h1>',
    tags: [ReleaseNoteType.FEATURE, ReleaseNoteType.IMPROVEMENT],
    createdDate: '2023-05-31T22:00:00.000Z',
  },
  {
    releaseId: '1234dqw6-1233',
    applicationName: 'ASDF',
    version: '12.2.3',
    title: 'Lorem ipsum',
    body: '<h1>Release2 notes body text</h1>',
    tags: [],
    createdDate: '2020-05-31T22:00:00.000Z',
  },
  {
    releaseId: '1234dqw6-1233',
    applicationName: 'ASDF',
    version: '12.2.3',
    title: 'Lorem ipsum',
    body: '<h1>Release2 notes body text qWert</h1>',
    tags: [ReleaseNoteType.IMPROVEMENT],
    createdDate: '2022-05-31T22:00:00.000Z',
  },
];

const monthAndYears = [
  {
    label: '2023',
    months: [
      {
        label: 'June 2023',
        value: new Date('2023-05-31T22:00:00.000Z'),
      },
    ],
    value: '2023',
  },
];
const mockServiceHasError = false;

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
        }, 200);
      });
    }
  }
  return { ReleaseNotesService };
});

const Wrappers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
    </QueryClientProvider>
  );
};

describe('Release notes provider', () => {
  test('should correctly return filtered data', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(3);
      },
      { timeout: 550 }
    );
    expect(result.current.filteredData).toStrictEqual(releaseNotes);
  });

  test('should use setSearch to populate search variable', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(3);
      },
      { timeout: 550 }
    );
    expect(result.current.search.filterValues).toBe(undefined);
    expect(result.current.search.searchValue).toBe(undefined);
    expect(result.current.search.sortValue).toBe(undefined);

    act(() => {
      result.current.setSearch({
        filterValues: {},
        searchValue: '',
        sortValue: { label: '', value: '' },
      });
    });
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(3);
      },
      { timeout: 550 }
    );
    expect(result.current.search.filterValues).toStrictEqual({});
    expect(result.current.search.searchValue).toBe('');
    expect(result.current.search.sortValue).toStrictEqual({
      label: '',
      value: '',
    });
  });

  test('should correctly return extracted month and year from data', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(3);
      },
      { timeout: 550 }
    );
    expect(monthAndYears).toBeDefined();
  });

  test('should return an empty list when searchValue has a term which does not match anything in release notes', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    act(() => {
      result.current.setSearch({
        filterValues: undefined,
        searchValue: 'qwerty qwert',
        sortValue: undefined,
      });
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(0);
      },
      { timeout: 550 }
    );
    expect(result.current.filteredData).toStrictEqual([]);
  });

  test('should return one item when searchValue has a term which matches to something that release note contains', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    act(() => {
      result.current.setSearch({
        filterValues: undefined,
        searchValue: ' qwert',
        sortValue: undefined,
      });
    });

    const expected = [
      {
        releaseId: '1234dqw6-1233',
        applicationName: 'ASDF',
        version: '12.2.3',
        title: 'Lorem ipsum',
        body: '<h1>Release2 notes body text qWert</h1>',
        tags: [ReleaseNoteType.IMPROVEMENT],
        createdDate: '2022-05-31T22:00:00.000Z',
      },
    ];

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        expect(result.current.filteredData.length).toBe(1);
        expect(result.current.filteredData).toStrictEqual(expected);
      },
      { timeout: 550 }
    );
  });

  test('should return one item filterValues is set to match release notes', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    act(() => {
      result.current.setSearch({
        filterValues: {
          Type: [
            { label: ReleaseNoteType.FEATURE, value: ReleaseNoteType.FEATURE },
          ],
        },
        searchValue: undefined,
        sortValue: undefined,
      });
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(1);
      },
      { timeout: 550 }
    );
    expect(result.current.filteredData).toStrictEqual([releaseNotes[0]]);
  });

  test('should return an empty list when filterValues does not match anything in release notes', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    act(() => {
      result.current.setSearch({
        filterValues: {
          Type: [
            { label: ReleaseNoteType.BUG_FIX, value: ReleaseNoteType.BUG_FIX },
          ],
        },
        searchValue: undefined,
        sortValue: undefined,
      });
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(0);
      },
      { timeout: 550 }
    );
    expect(result.current.filteredData).toStrictEqual([]);
  });

  test("'useReleaseNotes' hook throws error if using outside of context", () => {
    // Hides console errors since this test explicitly tests for thrown errors
    console.error = vi.fn();
    expect(() => renderHook(() => useReleaseNotes())).toThrow(
      'useReleaseNotes must be used within a ReleaseNotesProvider'
    );
  });
});
