import { withTheme } from '.storybook/addons/ThemeAddon/withTheme.js';

const preview = {
  decorators: [withTheme],
  globalTypes: {
    themeMode: {
      defaultValue: 'light',
    },
  },
};

export default preview;
