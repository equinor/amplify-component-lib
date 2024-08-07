import { tokens } from '@equinor/eds-tokens';

const { colors: eds_colors } = tokens;

export const colors = {
  ...eds_colors,
  dataviz: {
    darkblue: {
      default: 'var(--amplify_dataviz_darkblue_default, rgba(0, 71, 153, 1))',
      darker: 'var(--amplify_dataviz_darkblue_darker, rgba(4, 48, 98, 1))',
      lighter:
        'var(--amplify_dataviz_darkblue_lighter, rgba(191, 220, 252, 1))',
    },
    lightblue: {
      default:
        'var(--amplify_dataviz_lightblue_default, rgba(133, 208, 250, 1))',
      darker: 'var(--amplify_dataviz_lightblue_darker, rgba(35, 170, 246, 1))',
      lighter:
        'var(--amplify_dataviz_lightblue_lighter, rgba(211, 238, 253, 1))',
    },
    lightgreen: {
      default:
        'var(--amplify_dataviz_lightgreen_default, rgba(10, 194, 154, 1))',
      darker: 'var(--amplify_dataviz_lightgreen_darker, rgba(8, 145, 115, 1))',
      lighter:
        'var(--amplify_dataviz_lightgreen_lighter, rgba(220, 241, 236, 1))',
    },
    darkgreen: {
      default: 'var(--amplify_dataviz_darkgreen_default, rgba(0, 102, 76, 1))',
      darker: 'var(--amplify_dataviz_darkgreen_darker, rgba(0, 61, 46, 1))',
      lighter:
        'var(--amplify_dataviz_darkgreen_lighter, rgba(200, 237, 227, 1))',
    },
    darkpink: {
      default: 'var(--amplify_dataviz_darkpink_default, rgba(169, 30, 88, 1))',
      darker: 'var(--amplify_dataviz_darkpink_darker, rgba(135, 18, 67, 1))',
      lighter:
        'var(--amplify_dataviz_darkpink_lighter, rgba(252, 212, 229, 1))',
    },
    lightpink: {
      default:
        'var(--amplify_dataviz_lightpink_default, rgba(255, 128, 138, 1))',
      darker: 'var(--amplify_dataviz_lightpink_darker, rgba(225, 81, 93, 1))',
      lighter:
        'var(--amplify_dataviz_lightpink_lighter, rgba(255, 219, 222, 1))',
    },
    darkyellow: {
      default:
        'var(--amplify_dataviz_darkyellow_default, rgba(160, 112, 28, 1))',
      darker: 'var(--amplify_dataviz_darkyellow_darker, rgba(121, 85, 21, 1))',
      lighter:
        'var(--amplify_dataviz_darkyellow_lighter, rgba(244, 226, 195, 1))',
    },
    lightyellow: {
      default:
        'var(--amplify_dataviz_lightyellow_default, rgba(253, 203, 53, 1))',
      darker: 'var(--amplify_dataviz_lightyellow_darker, rgba(227, 171, 2, 1))',
      lighter:
        'var(--amplify_dataviz_lightyellow_lighter, rgba(255, 240, 194, 1))',
    },
    darkpurple: {
      default:
        'var(--amplify_dataviz_darkpurple_default, rgba(147, 20, 219, 1))',
      darker: 'var(--amplify_dataviz_darkpurple_darker, rgba(97, 1, 152, 1))',
      lighter:
        'var(--amplify_dataviz_darkpurple_lighter, rgba(232, 209, 246, 1))',
    },
    lightpurple: {
      default:
        'var(--amplify_dataviz_lightpurple_default, rgba(186, 153, 255, 1))',
      darker:
        'var(--amplify_dataviz_lightpurple_darker, rgba(155, 89, 242, 1))',
      lighter:
        'var(--amplify_dataviz_lightpurple_lighter, rgba(234, 224, 255, 1))',
    },
    grey: {
      darker: 'var(--amplify_dataviz_grey_darker, rgba(86, 86, 86, 1))',
      lighter: 'var(--amplify_dataviz_grey_lighter,  rgba(194, 200, 204, 1))',
    },
  },
} as const;
