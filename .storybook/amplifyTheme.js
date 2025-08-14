import { create } from 'storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Amplify storybook',
  brandUrl: 'https://github.com/equinor/amplify-component-lib',
  brandTarget: '_self',
  brandImage:
    'https://raw.githubusercontent.com/equinor/amplify-component-lib/main/static/amplify.png',

  fontBase: '"Inter", sans-serif',

  colorPrimary: '#007079',
  colorSecondary: '#007079',

  // UI
  appBg: '#E6F4F4',
  appContentBg: '#E6F4F4',
  appPreviewBg: '#ffffff',
  appBorderColor: '#BFE3E3',
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: '#007079',
  barSelectedColor: '#007079',
  barHoverColor: '#007079',
  barBg: '#E6F4F4',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#3D3D3D',
  inputTextColor: '#3D3D3D',
  inputBorderRadius: 0,
});
