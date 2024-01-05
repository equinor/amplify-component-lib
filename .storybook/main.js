module.exports = {
  stories: ['../src/intro.stories.mdx', '../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  build: {
    sourcemap: false,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ['../static'],
  viteFinal: async (config) => {
    console.log('config');

    config.resolve.alias['src/api/services/PortalService'] = require.resolve(
      '../__mocks__/src/api/services/PortalService'
    );
    return config;
  },
};
