import { ReactNode } from 'react';

import { OpenAPI_APP, request } from '@equinor/subsurface-app-management';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { defaultQueryOptions } from './reactquery';
import { render, waitFor } from 'src/tests/jsdomtest-utils';

function wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryOptions,
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function TestComponent({ url }: { url: string }) {
  useQuery({
    queryKey: ['wow'],
    queryFn: () => {
      console.log('RAN REQUEST');
      return request(OpenAPI_APP, {
        method: 'GET',
        url,
        errors: {
          400: `Bad Request`,
          500: `Server Error`,
        },
      });
    },
  });

  return <p>test</p>;
}

test('Doesnt retry 404 error requests', () => {
  const spy = vi.spyOn(console, 'log');
  render(<TestComponent url="/missing-data" />, { wrapper });

  expect(spy).toHaveBeenCalledExactlyOnceWith('RAN REQUEST');
});

test('Retries other failing queries 3 times', async () => {
  const spy = vi.spyOn(console, 'log');
  render(<TestComponent url="/failing-data" />, { wrapper });

  expect(spy).toHaveBeenCalledWith('RAN REQUEST');

  await waitFor(() => expect(spy).toHaveBeenCalledTimes(3), { timeout: 5000 });
});
