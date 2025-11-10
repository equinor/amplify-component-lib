import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Resources } from 'src/organisms/TopBar/Resources/Resources';
import { TopBar } from 'src/organisms/TopBar/TopBar';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';
import {
  renderWithRouter,
  screen,
  test,
  userEvent,
} from 'src/tests/browsertest-utils';

import { beforeEach } from 'vitest';

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReleaseNotesProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

describe('Suggest a feature', () => {
  beforeEach(async () => {
    window.localStorage.clear();

    await renderWithRouter(
      <TopBar applicationIcon="test" applicationName="test">
        <Resources />
      </TopBar>,

      { initialEntries: ['/'], routes: ['/'] },
      { wrapper: Wrappers }
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Suggest idea'));
  });

  test('Suggest a feature works as expected', async () => {
    const user = userEvent.setup();
    const title = faker.animal.dog();
    const description = faker.lorem.sentence();
    await user.type(screen.getByLabelText(/title/i), title);
    await user.type(screen.getByLabelText(/description/i), description);

    await user.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText(/success/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Thank you/i, undefined, { timeout: 5000 })
    ).toBeInTheDocument();
  });
});
