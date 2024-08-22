import { addons } from '@storybook/manager-api';
import amplifyTheme from './amplifyTheme';

addons.setConfig({
  theme: amplifyTheme,
  panelPosition: 'right',
  selectedPanel: 'STORYBOOK_ADDON_DESIGNS/panel',
});
