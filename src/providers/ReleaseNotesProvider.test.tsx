import { act, FC, ReactNode } from 'react';

import { ReleaseNote } from '@equinor/subsurface-app-management';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleaseNotesProvider, useReleaseNotes } from './ReleaseNotesProvider';
import { ReleaseNoteType } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleaseNotesTypes/ReleaseNotesTypes.types';
import {
  extractDatesFromReleaseNotes,
  monthToString,
  monthValueToString,
  sortReleaseNotesByDate,
  yearValueToString,
} from 'src/providers/ReleaseNotesProvider.utils';
import { renderHook, waitFor } from 'src/tests/browsertest-utils';
import { fakeReleaseNotes } from 'src/tests/mockHandlers';

interface WrapperProp {
  children: ReactNode;
}

const Wrappers: FC<WrapperProp> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
    </QueryClientProvider>
  );
};

describe('Release notes provider', () => {
  test('should not return any data when enabled is set to false', () => {
    const wrapper: FC<WrapperProp> = ({ children }) => {
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

    expect(result.current.filteredData.length).toEqual(0);
    expect(result.current.releaseNotesYears.length).toEqual(0);
  });
  test('should correctly return filtered data', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(
          fakeReleaseNotes.length
        );
      },
      { timeout: 10000 }
    );
    expect(result.current.filteredData).not.toBeNull();
  });

  test('should use setSearch to populate search variable', async () => {
    const { result } = renderHook(() => useReleaseNotes(), {
      wrapper: Wrappers,
    });

    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(
          fakeReleaseNotes.length
        );
      },
      { timeout: 1000 }
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

    expect(result.current.filteredData.length).toBeGreaterThan(0);

    expect(result.current.search.filterValues).toStrictEqual({});
    expect(result.current.search.searchValue).toBe('');
    expect(result.current.search.sortValue).toStrictEqual({
      label: '',
      value: '',
    });
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
      { timeout: 10000 }
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
        searchValue: fakeReleaseNotes[0].title,
        sortValue: undefined,
      });
    });

    await waitFor(
      () => {
        expect(result.current.filteredData.length).toBe(1);
      },
      { timeout: 10000 }
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

    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(1);
      },
      { timeout: 10000 }
    );
    expect(result.current.filteredData).toStrictEqual([fakeReleaseNotes[0]]);
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

const dateObject = new Date('2023-06-29T10:50:22.8210567+00:00');
const dates: ReleaseNote[] = [
  {
    createdDate: '2022-06-29T10:50:22.8210567+00:00',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2022-01-13T10:50:22.8210567+00:00',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2022-07-20T10:50:22.8210567+00:00',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2023-06-29T10:50:22.8210567+00:00',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2022-05-29T10:50:22.8210567+00:00',
    applicationName: '',
    title: '',
    body: '',
  },
];

const notes: ReleaseNote[] = [
  {
    createdDate: '2023-06-29',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2020-06-29',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2022-06-29',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2023-01-17',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2022-08-10',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2021-08-11',
    applicationName: '',
    title: '',
    body: '',
  },
  {
    createdDate: '2020-01-31',
    applicationName: '',
    title: '',
    body: '',
  },
];

describe('release notes utils', () => {
  test('extract years and months from list containing createdDate attribute', () => {
    const expectedYear = '2023';
    const expectedMonth = 'June';
    const actual = extractDatesFromReleaseNotes(dates);
    expect(actual[0].label).toEqual(expectedYear);
    expect((actual[0].children ?? [])[0].label).toEqual(expectedMonth);
  });

  test('should sort years and months in page menu descending', () => {
    const expectedYearOrder = ['2023', '2022'];
    const expectedMonthOrder = ['July', 'June', 'May', 'January'];
    const actual = extractDatesFromReleaseNotes(dates);

    expect(actual[0].label).toEqual(expectedYearOrder[0]);
    expect(actual[1].label).toEqual(expectedYearOrder[1]);
    expect((actual[1].children ?? [])[0].label).toEqual(expectedMonthOrder[0]);
    expect((actual[1].children ?? [])[1].label).toEqual(expectedMonthOrder[1]);
    expect((actual[1].children ?? [])[2].label).toEqual(expectedMonthOrder[2]);
    expect((actual[1].children ?? [])[3].label).toEqual(expectedMonthOrder[3]);
  });

  test('transform date to month string', () => {
    const expectedYear = 'June';
    const actual = monthToString(dateObject);
    expect(actual).toEqual(expectedYear);
  });
  test('transform date to a string in the format of month_year: year2023--June', () => {
    const expectedYear = 'year2023--June';
    const actual = monthValueToString(dateObject);
    expect(actual).toEqual(expectedYear);
  });
  test('transform date to string formatted with a year_ prefix to the year: year2023', () => {
    const expectedYear = 'year2023';
    const actual = yearValueToString(dateObject);
    expect(actual).toEqual(expectedYear);
  });

  test('sort release notes by created date in descending order', () => {
    const sorted = sortReleaseNotesByDate(notes);
    for (let i = 1; i < sorted.length; i++) {
      const date1 = new Date(sorted[i].createdDate);
      const date2 = new Date(sorted[i - 1].createdDate);
      expect(date1 < date2).toBeTruthy();
    }
  });
});
