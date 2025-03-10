import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';

import { Resources } from 'src/organisms/TopBar/Resources/Resources';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from 'src/tests/browsertest-utils';
import { worker } from 'src/tests/setupBrowserTests';

import { http, HttpResponse } from 'msw';

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

  const title = screen.getByText(/what's new/i);

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
  const title = screen.getByText(/what's new/i);
  expect(title).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

  const actualText = await screen.findByText('Release notes body text');
  expect(actualText).toBeInTheDocument();
});

test('No release notes', async () => {
  worker.use(
    http.get('*/api/v1/ReleaseNotes/:applicationName', async () => {
      return HttpResponse.json([]);
    })
  );
  render(<Resources />, { wrapper: Wrappers });
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  const releaseNotesButton = screen.getByRole('menuitem', {
    name: 'Open release notes',
  });

  await user.click(releaseNotesButton);

  const title = screen.getByText(/what's new/i);
  expect(title).toBeInTheDocument();

  await waitFor(
    () => expect(screen.getByText(/no release notes/i)).toBeInTheDocument(),
    { timeout: 5000 }
  );
});
