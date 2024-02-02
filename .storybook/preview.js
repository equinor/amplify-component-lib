import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'Equinor off-white',
        value: colors.ui.background__light.hex,
      },
    ],
  },
};
