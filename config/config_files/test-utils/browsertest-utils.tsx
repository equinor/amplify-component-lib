import { FC, ReactElement, ReactNode } from 'react';

import {
  AuthProvider,
  SnackbarProvider,
  Template,
} from '@equinor/amplify-component-lib';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  page,
  userEvent as vitestBrowserUserEvent,
} from '@vitest/browser/context';

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

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithProviders, userEvent, vitestBrowserUserEvent, page };
