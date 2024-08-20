import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './AuthProvider/AuthProvider';
import { LoadingProvider } from './LoadingProvider';
import { render, screen } from 'src/tests/test-utils';

function Wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider withoutLoader>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}

test('LoadingProvider works as expected', async () => {
  const fakeText = faker.airline.airport().name;

  render(
    <LoadingProvider>
      <p>{fakeText}</p>
    </LoadingProvider>,
    { wrapper: Wrapper }
  );

  expect(screen.getByTestId('app-icon-svg')).toBeInTheDocument();

  expect(
    await screen.findByText(fakeText, undefined, { timeout: 4000 })
  ).toBeInTheDocument();
});
