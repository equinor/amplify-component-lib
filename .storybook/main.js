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
};
