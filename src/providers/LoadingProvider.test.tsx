import { ReactNode } from 'react';

import { SAM_QUERIES } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './AuthProvider/AuthProvider';
import { LoadingProvider } from './LoadingProvider';
import { render, screen } from 'src/tests/test-utils';

function Wrapper({
  queryKey,
  children,
}: {
  queryKey?: string;
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  queryClient.fetchQuery({
    queryKey: SAM_QUERIES,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([]), 1000);
      });
    },
  });

  if (queryKey) {
    queryClient.fetchQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve([]), 2000);
        });
      },
    });
  }

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

  expect(await screen.findByText(fakeText)).toBeInTheDocument();
});

test('LoadingProvider works as expected with customQueryKeys', async () => {
  const fakeText = faker.airline.airport().name;

  const fakeQueryKey = faker.airline.airplane().name;

  render(
    <LoadingProvider customQueryKeys={[fakeQueryKey]}>
      <p>{fakeText}</p>
    </LoadingProvider>,
    {
      wrapper: ({ children }) => (
        <Wrapper queryKey={fakeQueryKey}>{children}</Wrapper>
      ),
    }
  );

  expect(screen.getByTestId('app-icon-svg')).toBeInTheDocument();

  expect(
    await screen.findByText(fakeText, undefined, { timeout: 3000 })
  ).toBeInTheDocument();
});
