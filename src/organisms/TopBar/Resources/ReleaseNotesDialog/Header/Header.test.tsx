import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/Header/Header';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { renderWithRouter, screen } from 'src/tests/browsertest-utils';

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should have a link button', () => {
  await renderWithRouter(
    <Header />,
    {
      initialEntries: ['/'],
      routes: ['/'],
    },
    {
      wrapper: Wrappers,
    }
  );

  const actual = screen.getByRole('link');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
});
