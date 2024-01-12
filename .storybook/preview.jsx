import { tokens } from '@equinor/eds-tokens';

import {darkTokens} from 'src/style/darkTokens';

const { colors } = tokens;

export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Light", dataTheme: "light", color: "#FFFFFF" },
        { name: "Dark", dataTheme: "dark", color: "#243746" },
      ],
    },
  },
};


export const decorators = [
  (Story) => {
    // Apply styles using the darkTokens variable
    const styleElement = document.createElement('style');
    styleElement.innerHTML = darkTokens;
    document.head.appendChild(styleElement);

    return (<Story />);
  },
]; 


export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Equinor UI Light (off-white/off-dark)',
    values: [
      {
        name: 'Equinor UI Light (off-white/off-dark)',
        value: colors.ui.background__light.rgba,
      },
      {
        name: 'Equinor UI Default (white/dark)',
        value: colors.ui.background__default.rgba,
      },
    ],
  },
};
