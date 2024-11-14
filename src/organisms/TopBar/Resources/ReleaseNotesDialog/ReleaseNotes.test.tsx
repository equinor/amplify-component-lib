import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { CancelablePromise } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleaseNotes } from './ReleaseNotes';
import { Resources } from 'src/organisms/TopBar/Resources/Resources';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import * as useReleaseNotes from 'src/providers/ReleaseNotesProvider';
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from 'src/tests/browsertest-utils';
import { fakeReleaseNotes } from 'src/tests/mockHandlers';

import { beforeAll, describe, expect } from 'vitest';

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

let mockServiceHasError = false;

vi.mock('@equinor/subsurface-app-management', async () => {
  class ReleaseNotesService {
    public static getReleasenoteList(): CancelablePromise<unknown> {
      return new CancelablePromise((resolve, reject) => {
        setTimeout(() => {
          if (mockServiceHasError) {
            reject('error release notes');
          } else {
            resolve(fakeReleaseNotes);
          }
        }, 100);
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

  const actual = await vi.importActual('@equinor/subsurface-app-management');
  return { ...actual, ReleaseNotesService };
});

describe('Release notes', () => {
  test('should close the dialog by clicking the close button inside', async () => {
    const { container } = render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();
    const toggleHelpButton = screen.getByRole('button');
    await user.click(toggleHelpButton);
    const toggleReleaseNotesButton = screen.getByRole('menuitem', {
      name: /Open release notes/,
    });
    expect(toggleReleaseNotesButton).toBeInTheDocument();
    await user.click(toggleReleaseNotesButton);

    const dialog = within(container.children[1] as HTMLElement);
    const closeButton = dialog.getByRole('button', {
      hidden: true,
      name: 'close modal',
    });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    const title = screen.queryByText('Release Notes');
    expect(title).not.toBeInTheDocument();
  });

  test('can close dialog by clicking outside', async () => {
    render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const releaseNotesButton = screen.getByRole('menuitem', {
      name: 'Open release notes',
    });

    await user.click(releaseNotesButton);

    const title = screen.getByText('Release Notes');

    expect(title).toBeInTheDocument();
    const dialog = screen.getByRole('dialog', { hidden: true });
    await user.click(dialog);
    const titleHeader = screen.queryByText('Release Notes');

    expect(titleHeader).not.toBeInTheDocument();
  });
  test('show a release note', async () => {
    mockServiceHasError = false;
    render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();
    const button = screen.getByRole('button');
    await user.click(button);
    const releaseButton = document.querySelector('#release-notes');
    if (releaseButton) {
      await user.click(releaseButton);
    }
    const releaseNoteText = screen.getByText('Release Notes');
    expect(releaseNoteText).toBeInTheDocument();
    await waitFor(
      () => {
        const actualText = screen.getByText('Release notes body text');
        return expect(actualText).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
  test('should show Nothing matching "SearchTerm" when no matching release notes given only entered a search and no filter', async () => {
    mockServiceHasError = false;
    const { container } = render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();
    const toggleHelpButton = screen.getByRole('button');
    await user.click(toggleHelpButton);
    const toggleReleaseNotesButton = screen.getByRole('menuitem', {
      name: /Open release notes/,
    });
    expect(toggleReleaseNotesButton).toBeInTheDocument();
    await user.click(toggleReleaseNotesButton);
    await waitFor(
      () => {
        const releaseNoteText = screen.getByText('Release notes body text');
        expect(releaseNoteText).toBeInTheDocument();
      },
      { timeout: 600 }
    );

    const dialog = within(container.children[1] as HTMLElement);
    const searchInput = dialog.getByRole('textbox', {
      hidden: true,
    });
    expect(searchInput).toBeInTheDocument();
    const searchTerm = faker.animal.crocodilia();
    await user.type(searchInput, searchTerm);

    const nothingMatchingText = dialog.getByText(
      `Nothing matching "${searchTerm} "`
    );
    expect(nothingMatchingText).toBeInTheDocument();
  });
  test(
    'should show Nothing matching " Feature" when no matching release notes given only selected type',
    async () => {
      mockServiceHasError = false;
      const { container } = render(<Resources />, { wrapper: Wrappers });
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Open release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);
      await waitFor(
        () => {
          const releaseNoteText = screen.getByText('Release notes body text');
          expect(releaseNoteText).toBeInTheDocument();
        },
        { timeout: 600 }
      );

      const dialog = within(container.children[1] as HTMLElement);
      const filterButton = dialog.getByRole('button', {
        hidden: true,
        name: 'Filter by',
      });
      expect(filterButton).toBeInTheDocument();
      await user.click(filterButton);
      const typeButton = dialog.getByRole('menuitem', {
        hidden: true,
        name: 'Type',
      });
      await user.click(typeButton);
      expect(typeButton).toBeInTheDocument();
      const featureButton = dialog.getByRole('menuitem', {
        hidden: true,
        name: 'Bug fix',
      });
      await user.click(featureButton);

      const nothingMatchingText = dialog.getByText(/nothing matching/i);
      expect(nothingMatchingText).toBeInTheDocument();
    },
    { timeout: 8000 }
  );
});

describe('ReleaseNotes dialog', () => {
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
