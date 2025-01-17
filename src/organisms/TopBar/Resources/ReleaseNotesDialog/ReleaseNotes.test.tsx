import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';

import { Resources } from 'src/organisms/TopBar/Resources/Resources';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from 'src/tests/browsertest-utils';

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

  await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

  const actualText = await screen.findByText('Release notes body text');
  expect(actualText).toBeInTheDocument();
});
test(
  'should show Nothing matching "SearchTerm" when no matching release notes given only entered a search and no filter',
  async () => {
    render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const toggleHelpButton = screen.getByRole('button');
    await user.click(toggleHelpButton);
    const toggleReleaseNotesButton = screen.getByRole('menuitem', {
      name: /Open release notes/,
    });
    expect(toggleReleaseNotesButton).toBeInTheDocument();
    await user.click(toggleReleaseNotesButton);

    await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

    await waitFor(
      () => {
        const releaseNoteText = screen.getByText('Release notes body text');
        expect(releaseNoteText).toBeInTheDocument();
      },
      { timeout: 600 }
    );

    const searchInput = screen.getAllByRole('textbox')[0];

    const searchTerm = faker.animal.crocodilia();
    await user.type(searchInput, searchTerm);

    const nothingMatchingText = await screen.findByText(/nothing matching/i);
    expect(nothingMatchingText).toBeInTheDocument();
  },
  { timeout: 8000 }
);

test(
  'should show Nothing matching "Feature" when no matching release notes given only selected type',
  async () => {
    const { container } = render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const toggleHelpButton = screen.getByRole('button');
    await user.click(toggleHelpButton);
    const toggleReleaseNotesButton = screen.getByRole('menuitem', {
      name: /Open release notes/,
    });
    expect(toggleReleaseNotesButton).toBeInTheDocument();
    await user.click(toggleReleaseNotesButton);

    await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

    const releaseNoteText = await screen.findByText('Release notes body text');
    expect(releaseNoteText).toBeInTheDocument();

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

    const nothingMatchingText = await screen.findByText(/nothing matching/i);
    expect(nothingMatchingText).toBeInTheDocument();
  },
  { timeout: 8000 }
);

test(
  'should show Nothing matching "searchTerm+Feature" when no matching release notes',
  async () => {
    const { container } = render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const toggleHelpButton = screen.getByRole('button');
    await user.click(toggleHelpButton);
    const toggleReleaseNotesButton = screen.getByRole('menuitem', {
      name: /Open release notes/,
    });
    expect(toggleReleaseNotesButton).toBeInTheDocument();
    await user.click(toggleReleaseNotesButton);

    await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

    const releaseNoteText = await screen.findByText('Release notes body text');
    expect(releaseNoteText).toBeInTheDocument();

    const searchInput = screen.getAllByRole('textbox')[0];

    const searchTerm = faker.animal.crocodilia();
    await user.type(searchInput, searchTerm);

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

    const nothingMatchingText = await screen.findByText(/nothing matching/i);
    expect(nothingMatchingText).toBeInTheDocument();
  },
  { timeout: 8000 }
);

describe('No release notes', () => {});
