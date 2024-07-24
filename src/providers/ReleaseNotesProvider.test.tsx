import { act, FC, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '../tests/test-utils';
import { ReleaseNotesProvider, useReleaseNotes } from './ReleaseNotesProvider';
import { ReleaseNoteType } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleaseNotesTypes/ReleaseNotesTypes.types';
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
      { timeout: 550 }
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
        searchValue: 'SEARCH',
        sortValue: undefined,
      });
    });

    await waitFor(
      () => {
        expect(result.current.filteredData.length).toBe(1);
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

    await waitFor(
      () => {
        return expect(result.current.filteredData.length).toBe(1);
      },
      { timeout: 550 }
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
