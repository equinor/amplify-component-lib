import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';

import { Resources } from './Resources';
import { environment } from 'src/atoms/utils/auth_environment';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

import { describe, expect } from 'vitest';

const { PORTAL_URL_WITHOUT_LOCALHOST } = environment;

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

describe('Resources', () => {
  test('Behaves as expected', async () => {
    render(<Resources>Child</Resources>, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const learnMoreButton = screen.getByRole('menuitem', {
      name: /learn more/i,
    });

    await user.click(learnMoreButton);

    const childElement = await screen.findByText('Child');

    expect(childElement).toBeInTheDocument();
  });

  test('Opens and closes as expected', async () => {
    render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await user.click(button);

    await user.click(document.body);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('hide props working as expected', async () => {
    render(<Resources hideFeedback={true} hideReleaseNotes={true} />, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const releaseNotes = screen.queryByText('Release notes');

    expect(releaseNotes).not.toBeInTheDocument();
  });

  test('click on back button ', async () => {
    render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);
    const learnMore = screen.getByText(/learn more/i);
    await user.click(learnMore);

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);
  });

  test(
    'open portal  ',
    async () => {
      window.open = vi.fn();

      render(<Resources />, { wrapper: Wrappers });
      const user = userEvent.setup();

      const button = screen.getByRole('button');

      await user.click(button);

      const learnMore = screen.getByText(/learn more/i);
      await user.click(learnMore);

      const openPortal = screen.getByText(/open application portal/i);
      await user.click(openPortal);

      const openLink = screen.getByText(/open link/i);
      expect(openLink).toBeInTheDocument();

      expect(
        await screen.findByText(/Transferring you to application/i)
      ).toBeInTheDocument();

      await waitFor(
        () =>
          expect(window.open).toHaveBeenCalledWith(
            PORTAL_URL_WITHOUT_LOCALHOST,
            '_self'
          ),
        {
          timeout: 12000,
        }
      );
    },
    { timeout: 20000 }
  );

  test('Close open portal by clicking cancel ', async () => {
    render(<Resources />, { wrapper: Wrappers });

    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const learnMore = screen.getByText(/learn more/i);
    await user.click(learnMore);

    const openPortal = screen.getByText(/open application portal/i);
    await user.click(openPortal);

    const openLink = screen.getByText(/open link/i);
    expect(openLink).toBeInTheDocument();

    const cancelButton = screen.getByTestId('close-transfer-app');

    await user.click(cancelButton);

    expect(openLink).not.toBeInTheDocument();
  });

  test('Render custom button works', () => {
    render(
      <Resources
        customButton={(ref, onToggle) => (
          <button ref={ref} onClick={onToggle}>
            custom
          </button>
        )}
      />,
      { wrapper: Wrappers }
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('custom');
  });
});
