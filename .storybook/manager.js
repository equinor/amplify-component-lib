import { addons } from '@storybook/addons';
import amplifyTheme from './amplifyTheme';

addons.setConfig({
  theme: amplifyTheme,
  panelPosition: 'right',
  selectedPanel: 'STORYBOOK_ADDON_DESIGNS/panel',
});
