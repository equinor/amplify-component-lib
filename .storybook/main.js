const config = {
  stories: ['../src/intro.stories.mdx', '../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    'storybook-addon-data-theme-switcher',
  ],
  build: {
    sourcemap: false,
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true,
  },
  staticDirs: ['../static'],
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
};

export default config;
