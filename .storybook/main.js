module.exports = {
  stories: [
    '../src/intro.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  core: {
    builder: 'webpack5',
  },
};
