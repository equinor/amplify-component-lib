import { FC, isValidElement, ReactElement, ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Template } from '@equinor/amplify-component-lib';
import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  page,
  userEvent as vitestBrowserUserEvent,
} from '@vitest/browser/context';

import { App } from '../App';
import { Providers } from '../providers/Providers';

const TestProviders: FC<{
  children: ReactNode;
  initialEntry?: string;
  path?: string;
}> = ({ children, initialEntry, path }) => (
  <MemoryRouter initialEntries={initialEntry ? [initialEntry] : undefined}>
    <Template.GlobalStyles />
    <Providers>
      {path ? (
        <Routes>
          <Route path={path} element={children} />
        </Routes>
      ) : (
        children
      )}
    </Providers>
  </MemoryRouter>
);

const renderAppWithAllPages = async (initialPage?: string) => {
  render(
    <MemoryRouter initialEntries={initialPage ? [initialPage] : undefined}>
      <Providers>
        <App />
      </Providers>
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 5000,
  });
};

interface RenderWithProvidersProps {
  ui: ReactElement;
  options?: Omit<RenderOptions, 'wrapper'>;
  initialEntry?: string;
  path?: string;
}

const renderWithProviders = async (
  props: RenderWithProvidersProps | ReactElement
) => {
  if (isValidElement(props)) {
    render(props, { wrapper: TestProviders });
  } else {
    render(props.ui, {
      wrapper: ({ children }) => (
        <TestProviders initialEntry={props.initialEntry} path={props.path}>
          {children}
        </TestProviders>
      ),
      ...props.options,
    });
  }
  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 5000,
  });
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// re-export everything
export * from '@testing-library/react';

// override render method
export {
  wait,
  renderWithProviders,
  renderAppWithAllPages,
  userEvent,
  vitestBrowserUserEvent,
  page,
};
