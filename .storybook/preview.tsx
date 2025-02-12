import { tokens } from '@equinor/eds-tokens';
import { Preview, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { withSpacingsMode } from './addons/SpacingsAddon/withSpacingsMode';
import { AuthProvider } from 'src';
import { darkTokens } from 'src/atoms/style/darkTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';
import { Template } from 'src/organisms/Template/Template';
import { SnackbarProvider } from 'src/providers/SnackbarProvider/SnackbarProvider';
import { handlers } from 'src/tests/mockHandlers';

import { initialize, mswLoader } from 'msw-storybook-addon';

import './index.css';

const { colors } = tokens;
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
  dataThemes: {
    defaultValue: {
      list: [
        { name: 'Light', dataTheme: 'light', color: '#FFFFFF' },
        { name: 'Dark', dataTheme: 'dark', color: '#243746' },
      ],
    },
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
];

const parameters = {
  msw: {
    handlers,
  },
  actions: { argTypes: /^on[A-Z].*/ },
  viewMode: 'docs',
  controls: { expanded: true },
  backgrounds: {
    default: 'Equinor UI Light (off-white/off-dark)',
    values: [
      {
        name: 'Equinor UI Light (off-white/off-dark)',
        value: colors.ui.background__light.rgba,
      },
      {
        name: 'Equinor UI Default (white/dark)',
        value: colors.ui.background__default.rgba,
      },
    ],
  },
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
