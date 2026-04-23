import { Decorator, Preview } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { withSpacingsMode } from './addons/SpacingsAddon/withSpacingsMode';
import { withTheme } from './addons/ThemeAddon/withTheme';
import { darkTokens } from 'src/atoms/style/darkTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';
import { Template } from 'src/organisms/Template/Template';
import { AuthProvider } from 'src/providers';
import { SnackbarProvider } from 'src/providers/SnackbarProvider/SnackbarProvider';
import { handlers } from 'src/tests/mockHandlers';

import { initialize, mswLoader } from 'msw-storybook-addon';
import { sb } from 'storybook/test';

import './index.css';

// Register mocks
sb.mock(import('../src/providers/AuthProvider/AuthProvider'), {
  spy: true,
});

initialize({
  quiet: true,
  onUnhandledRequest: (req, print) => {
    if (req.url.includes('api') && req.url.includes('https')) print.error();
    return;
  },
});

const globalTypes = {
  spacingsToggle: {
    defaultValue: 'comfortable',
  },
  themeToggle: {
    defaultValue: 'light',
  },
};

const withRouter: Decorator = (StoryFn, context) => {
  if (!context.parameters.router) return <StoryFn />;

  const { routes, initial } = context.parameters.router;

  const rootRoute = createRootRoute();

  const children = routes.map((path: string) =>
    createRoute({
      path,
      getParentRoute: () => rootRoute,
      component: StoryFn,
    })
  );

  rootRoute.addChildren(children);

  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [initial],
      initialIndex: 0,
    }),
    routeTree: rootRoute,
  });

  return <RouterProvider router={router} />;
};

const DARK_TOKENS_STYLE_ID = 'storybook-dark-tokens';
const SPACING_TOKENS_STYLE_ID = 'storybook-spacing-tokens';

const ensureStyleElement = (id: string, cssText: string) => {
  if (typeof document === 'undefined') return;

  let styleElement = document.getElementById(id) as HTMLStyleElement | null;

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = id;
    document.head.appendChild(styleElement);
  }

  if (styleElement.textContent !== cssText) {
    styleElement.textContent = cssText;
  }
};

const withProviders: Decorator = (StoryFn) => {
  const queryClient = new QueryClient();

  ensureStyleElement(
    DARK_TOKENS_STYLE_ID,
    darkTokens as unknown as string
  );
  ensureStyleElement(
    SPACING_TOKENS_STYLE_ID,
    spacingTokens as unknown as string
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Template.GlobalStyles />
        <SnackbarProvider>
          <StoryFn />
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const decorators = [withProviders, withSpacingsMode, withTheme, withRouter];

const parameters = {
  msw: {
    handlers,
  },
  actions: { argTypes: /^on[A-Z].*/ },
  viewMode: 'docs',
  controls: { expanded: true },
  options: {
    storySort: {
      order: [
        'Atoms',
        'Molecules',
        'Organisms',
        'Providers',
        'Other',
        'Deprecated',
      ],
    },
  },
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes,
  decorators,
  parameters,
  loaders: [mswLoader],
};

export default preview;
