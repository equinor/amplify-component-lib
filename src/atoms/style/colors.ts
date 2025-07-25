import { tokens } from '@equinor/eds-tokens';

import { Variants } from 'src/atoms/types/variants';

const { colors: eds_colors } = tokens;

export const colors = {
  ...eds_colors,
  ui: {
    ...eds_colors.ui,
    background__light_medium: {
      rgba: 'var(--amplify_ui_background_light_medium, rgba(235, 235, 235, 1))',
    },
    background__heavy: {
      rgba: 'var(--amplify_ui_background_heavy, rgba(189, 189, 189, 1))',
    },
    background__tutorial_card: {
      rgba: 'var(--amplify_ui_background_tutorial_card, rgba(222, 237, 238, 1))',
    },
  },
  interactive: {
    ...eds_colors.interactive,
    primary__pressed: {
      rgba: 'var(--amplify_interactive_primary_pressed, rgba(19, 46, 49, 1))',
    },
    tutorial__active_step: {
      rgba: 'var(--amplify_interactive_tutorial_active_step, rgba(0, 112, 121, 1))',
    },
    tutorial__inactive_step: {
      rgba: 'var(--amplify_interactive_tutorial_inactive_step, rgba(168, 206, 209, 1))',
    },
  },
  dataviz: {
    primary: {
      default: 'var(--amplify_dataviz_primary_default, rgba(0, 107, 229, 1))',
      darker: 'var(--amplify_dataviz_primary_darker, rgba(0, 83, 178, 1))',
      lighter: 'var(--amplify_dataviz_primary_lighter, rgba(206, 229, 255, 1))',
      g10: 'var(--amplify_dataviz_primary_g10, rgba(235, 245, 255, 1))',
      g20: 'var(--amplify_dataviz_primary_g20, rgba(211, 231, 253, 1))',
      g30: 'var(--amplify_dataviz_primary_g30, rgba(167, 206, 251, 1))',
      g40: 'var(--amplify_dataviz_primary_g40, rgba(133, 187, 250, 1))',
      g50: 'var(--amplify_dataviz_primary_g50, rgba(89, 163, 248, 1))',
      g60: 'var(--amplify_dataviz_primary_g60, rgba(40, 136, 246, 1))',
      g70: 'var(--amplify_dataviz_primary_g70, rgba(0, 107, 229, 1))',
      g80: 'var(--amplify_dataviz_primary_g80, rgba(0, 83, 178, 1))',
      g90: 'var(--amplify_dataviz_primary_g90, rgba(5, 60, 122, 1))',
    },
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
    darkgray: {
      default: 'var(--amplify_dataviz_darkgray_default, rgba(122, 122, 122,1))',
      darker: 'var(--amplify-dataviz_darkgray_darker, rgba(86, 86, 86,1))',
      lighter:
        'var(--amplify-dataviz_darkgray_lighter, rgba(173, 173, 173, 1))',
    },
    lightgray: {
      default:
        'var(--amplify_dataviz_lightgray_default, rgba(144, 155, 162, 1))',
      darker: 'var(--amplify_dataviz_lightgray_darker, rgba(91, 102, 108, 1))',
      lighter:
        'var(--amplify_dataviz_lightgray_lighter,  rgba(194, 200, 204, 1))',
    },
  },
} as const;

export const VARIANT_COLORS: Record<Variants, string> = {
  warning: colors.interactive.warning__resting.rgba,
  error: colors.interactive.danger__resting.rgba,
  success: colors.interactive.success__resting.rgba,
  dirty: colors.infographic.substitute__blue_ocean.rgba,
} as const;

export const VARIANT_HELPER_TEXT_COLORS: Record<Variants, string> = {
  warning: colors.interactive.warning__hover.rgba,
  error: colors.interactive.danger__hover.rgba,
  success: colors.interactive.success__hover.rgba,
  dirty: colors.infographic.substitute__blue_ocean.rgba,
} as const;
