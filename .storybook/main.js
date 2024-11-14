const config = {
  stories: ['../src/intro.mdx', '../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-designs',
    'storybook-addon-data-theme-switcher',
    './addons/GitHubSearchAddon/manager.js',
    './addons/SpacingsAddon/manager.js',
  ],

  build: {
    sourcemap: false,
  },

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
          '@storybook/blocks',
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
