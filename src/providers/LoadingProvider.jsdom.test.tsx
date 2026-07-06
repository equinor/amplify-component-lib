import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthState } from './AuthProvider/AuthProvider';
import { LoadingProvider } from './LoadingProvider';
import { render, screen } from 'src/tests/jsdomtest-utils';

const mocks = vi.hoisted(() => ({
  authState: 'loading' as AuthState,
}));

vi.mock('src/providers/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({ authState: mocks.authState }),
  // jsdomtest-utils imports AuthProvider from this module, so we must keep
  // the export available (as a simple pass-through) for the test graph to load.
  AuthProvider: ({ children }: { children: ReactNode }) => children,
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

test('renders children (pass-through) when authState is interactionRequired', () => {
  mocks.authState = 'interactionRequired';

  render(
    <LoadingProvider>
      <p>app content</p>
    </LoadingProvider>,
    { wrapper }
  );

  expect(screen.getByText('app content')).toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders the full-page spinner (not children) when loading', () => {
  mocks.authState = 'loading';

  render(
    <LoadingProvider>
      <p>app content</p>
    </LoadingProvider>,
    { wrapper }
  );

  expect(screen.queryByText('app content')).not.toBeInTheDocument();
  expect(screen.getByTestId('app-icon-svg')).toBeInTheDocument();
});

test('renders the full-page spinner (not children) when unauthorized', () => {
  mocks.authState = 'unauthorized';

  render(
    <LoadingProvider>
      <p>app content</p>
    </LoadingProvider>,
    { wrapper }
  );

  expect(screen.queryByText('app content')).not.toBeInTheDocument();
  expect(screen.getByTestId('app-icon-svg')).toBeInTheDocument();
});
