import { addons } from 'storybook/manager-api';
import amplifyTheme from './amplifyTheme';
import favicon from '../public/favicon-storybook.png';

addons.setConfig({
  theme: amplifyTheme,
  panelPosition: 'right',
  selectedPanel: 'STORYBOOK_ADDON_DESIGNS/panel',
});

// set favicon for storybook
const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);
