import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { EnvironmentType } from '@equinor/subsurface-app-management';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FilterHeader } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/FilterHeader/FilterHeader';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen } from 'src/tests/jsdomtest-utils';

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should link to production environment using the external dns, jsembark.equinor.com as a fallback when no environment is set', () => {
  vi.stubEnv('VITE_ENVIRONMENT_NAME', undefined);
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });
  const actual = screen.getByRole('link');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
  expect(actual.getAttribute('href')).toContain(
    'subsurfappmanagement.equinor.com'
  );
});

test('links to dev if in localhost', () => {
  vi.stubEnv('VITE_ENVIRONMENT_NAME', EnvironmentType.LOCALHOST);
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });
  const actual = screen.getByRole('link');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
  expect(actual.getAttribute('href')).toContain(EnvironmentType.DEVELOP);
});
