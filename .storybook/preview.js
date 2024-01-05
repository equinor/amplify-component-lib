import { tokens } from '@equinor/eds-tokens';
import { decorator } from '../__mocks__/src/api/services/PortalService';

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

const preview = {
  decorators: [decorator],
};
export default preview;
