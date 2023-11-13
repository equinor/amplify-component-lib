import { FC } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '../tests/test-utils';
import ReleaseNotesProvider, { useReleaseNotes } from './ReleaseNotesProvider';
import { CancelablePromise } from 'src/api';

const releaseNotes = [
  {
    releaseId: '123456-1233',
    applicationName: 'ASDF',
    version: null,
    title: 'Lorem ipsum',
    body: '<h1>Release notes body text</h1>',
    tags: ['Feature', 'Improvement', 'Bug fix'],
    createdDate: '2023-05-31T22:00:00.000Z',
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
    public static getReleasenoteList(): CancelablePromise<any> {
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

const Wrappers: FC<{ children: any }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
    </QueryClientProvider>
  );
};

describe('Release notes provider', () => {
  test('open = false works as expected', () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    expect(result.current.open).toBe(false);
  });

  test('toggle changes open state from false to true to false on consecutive calls', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    expect(result.current.open).toBe(false);
    await waitFor(
      () => {
        result.current.toggle();
      },
      { timeout: 100 }
    );
    expect(result.current.open).toBe(true);
    await waitFor(
      () => {
        result.current.toggle();
      },
      { timeout: 100 }
    );
    expect(result.current.open).toBe(false);
  });

  test('setOpen changes open state to the inputted value', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    expect(result.current.open).toBe(false);
    await waitFor(
      () => {
        result.current.setOpen(true);
      },
      { timeout: 100 }
    );
    expect(result.current.open).toBe(true);
    await waitFor(
      () => {
        result.current.setOpen(false);
      },
      { timeout: 100 }
    );
    expect(result.current.open).toBe(false);
  });
  test('should correctly return filtered data', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    // TODO: improve on this hack; To use expect as a way to ensure that data is populated so that we can check more specifically what we expect
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(1);
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
        return expect(result.current.filteredData.length).toBe(1);
      },
      { timeout: 550 }
    );
    expect(result.current.search.filterValues).toBe(undefined);
    expect(result.current.search.searchValue).toBe(undefined);
    expect(result.current.search.sortValue).toBe(undefined);

    result.current.setSearch({
      filterValues: {},
      searchValue: '',
      sortValue: { label: '', value: '' },
    });
    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(1);
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
        return expect(result.current.filteredData.length).toBe(1);
      },
      { timeout: 550 }
    );
    expect(result.current.releaseNotesYears).toStrictEqual(monthAndYears);
  });

  test('should return an empty list when searchValue has a term which does not match anything in release notes', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    result.current.setSearch({
      filterValues: undefined,
      searchValue: 'qwerty',
      sortValue: undefined,
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

  test('should return an empty list when filterValues does not match anything in release notes', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    result.current.setSearch({
      filterValues: { Type: [{ label: 'qwert', value: 'qwert' }] },
      searchValue: undefined,
      sortValue: undefined,
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
