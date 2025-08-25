import { FC, ReactElement, ReactNode } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, RenderOptions } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  page,
  userEvent as vitestBrowserUserEvent,
} from '@vitest/browser/context';

import { Template } from 'src/organisms/Template/Template';
import { AuthProvider } from 'src/providers/AuthProvider/AuthProvider';
import { SnackbarProvider } from 'src/providers/SnackbarProvider/SnackbarProvider';
import { worker } from 'src/tests/setupBrowserTests';

import { SetupWorker } from 'msw/browser';
import { test as testBase } from 'vitest';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Template.GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <AuthProvider>{children}</AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
};

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export function fakeSelectItem() {
  return {
    label: faker.string.uuid(),
    value: faker.string.uuid(),
  };
}

const renderWithRouter = (
  ui: ReactElement,
  routerArgs: {
    initialEntries: string[];
    routes: string[];
    initialIndex?: number;
  },
  options?: RenderOptions
) => {
  const { initialEntries = ['/'], initialIndex, routes = ['/'] } = routerArgs;

  const rootRoute = createRootRoute();

  const children = routes.map((path: string) =>
    createRoute({
      path,
      getParentRoute: () => rootRoute,
      component: () => ui,
    })
  );

  rootRoute.addChildren(children);

  const router = createRouter({
    history: createMemoryHistory({ initialEntries, initialIndex }),
    routeTree: rootRoute,
  });

  return render(<RouterProvider router={router} />, options);
};

export function fakeSelectItems(count = 10) {
  return new Array(count).fill(0).map(() => fakeSelectItem());
}

// re-export everything
export * from '@testing-library/react';

interface CustomFixtures {
  worker: SetupWorker;
}

export const test = testBase.extend<CustomFixtures>({
  worker: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Start the worker before the test.
      await worker.start({
        quiet: true,
        onUnhandledRequest: (req, print) => {
          if (req.url.includes('api') && req.url.includes('https'))
            print.error();
          return;
        },
      });

      // Expose the worker object on the test's context.
      await use(worker);

      // Stop the worker after the test is done.
      worker.stop();
    },
    {
      auto: true,
    },
  ],
});

// override render method
export {
  renderWithProviders,
  renderWithRouter,
  userEvent,
  vitestBrowserUserEvent,
  page,
};
