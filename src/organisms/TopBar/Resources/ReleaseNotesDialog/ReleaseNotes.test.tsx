import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleaseNotes } from './ReleaseNotes';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import * as useReleaseNotes from 'src/providers/ReleaseNotesProvider';
import { render, within } from 'src/tests/test-utils';

import { beforeAll } from 'vitest';

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReleaseNotesProvider>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

describe('ReleaseNotes', () => {
  beforeAll(() => {
    const useReleaseNotesSpy = vi.spyOn(useReleaseNotes, 'useReleaseNotes');
    useReleaseNotesSpy.mockReturnValue({
      releaseNotesYears: [],
      open: true,
      setOpen: () => null,
      search: {
        searchValue: undefined,
        sortValue: undefined,
        filterValues: undefined,
      },
      setSearch: function (): void {
        throw new Error('Function not implemented.');
      },
      toggle: function (): void {
        throw new Error('Function not implemented.');
      },
      filteredData: [],
    });
  });

  test('should render a loader when waiting for data', () => {
    const { container } = render(<ReleaseNotes />, {
      wrapper: Wrappers,
    });
    const dialog = container.children[0] as HTMLElement;

    const actual = within(dialog).getByRole('progressbar', { hidden: true });
    expect(actual).toBeInTheDocument();
  });
});
