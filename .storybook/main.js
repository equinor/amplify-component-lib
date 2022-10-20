module.exports = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/hooks/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/providers/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/utils/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  core: {
    builder: 'webpack5',
  },
};
