import { Preview, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
sb.mock(import('../src/providers/AuthProvider/AuthProvider.tsx'), {
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

const decorators = [
  (Story: StoryFn) => {
    const queryClient = new QueryClient();
    // Apply styles using the darkTokens variable
    const darkStyleElement = document.createElement('style');
    darkStyleElement.innerHTML = darkTokens as unknown as string;
    document.head.appendChild(darkStyleElement);

    const spacingStyleElement = document.createElement('style');
    spacingStyleElement.innerHTML = spacingTokens as unknown as string;
    document.head.appendChild(spacingStyleElement);

    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Template.GlobalStyles />
          <SnackbarProvider>
            <Story />
          </SnackbarProvider>
        </AuthProvider>
      </QueryClientProvider>
    );
  },
  withSpacingsMode,
  withTheme,
];

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
