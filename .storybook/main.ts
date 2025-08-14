import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/intro.mdx', '../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-designs',
    '@storybook/addon-docs',
    './addons/GitHubSearchAddon/manager.js',
    './addons/ThemeAddon/manager.js',
    './addons/SpacingsAddon/manager.js',
  ],
  core: {},
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  staticDirs: ['../public'],
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        dedupe: ['styled-components'],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          '@storybook/addon-docs/mdx-react-shim',
          '@storybook/addon-docs/blocks',
        ],
      },
    };
  },

  env: () => ({
    VITE_IS_MOCK: 'true',
    VITE_NAME: 'Orca',
    VITE_CLIENT_ID: 'fake-id',
    VITE_API_CLIENT_ID: 'fake-api-id',
    VITE_ENVIRONMENT_NAME: 'development',
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
