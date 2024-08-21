const config = {
  stories: ['../src/intro.mdx', '../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-designs',
    '@storybook/addon-docs',
    'storybook-addon-data-theme-switcher',
    './addons/GitHubSearchAddon/manager.js',
    '@storybook/addon-mdx-gfm'
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
    VITE_NAME: 'orca',
    VITE_CLIENT_ID: 'fake-id',
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;
