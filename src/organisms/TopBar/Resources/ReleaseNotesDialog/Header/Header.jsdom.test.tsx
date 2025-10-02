import { ReactNode } from 'react';

import { EnvironmentType } from '@equinor/subsurface-app-management';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/Header/Header';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { renderWithRouter, screen } from 'src/tests/jsdomtest-utils';

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

test('should link to production environment using the external dns, jsembark.equinor.com as a fallback when no environment is set', async () => {
  vi.stubEnv('VITE_ENVIRONMENT_NAME', undefined);
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
  expect(actual.getAttribute('href')).toContain(
    'subsurfappmanagement.equinor.com'
  );
});

test('links to dev if in localhost', async () => {
  vi.stubEnv('VITE_ENVIRONMENT_NAME', EnvironmentType.LOCALHOST);
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
  expect(actual.getAttribute('href')).toContain(EnvironmentType.DEVELOP);
});
