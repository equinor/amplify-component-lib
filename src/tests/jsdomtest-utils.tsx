import { FC, ReactElement, ReactNode, useRef } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Template } from 'src/organisms/Template/Template';
import { AuthProvider } from 'src/providers/AuthProvider/AuthProvider';
import { SnackbarProvider } from 'src/providers/SnackbarProvider/SnackbarProvider';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useRef(new QueryClient());
  return (
    <>
      <Template.GlobalStyles />
      <QueryClientProvider client={queryClient.current}>
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

export function fakeSelectItems(count = 10) {
  return new Array(count).fill(0).map(() => fakeSelectItem());
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithProviders, userEvent };
