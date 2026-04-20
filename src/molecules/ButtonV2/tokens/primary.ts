import type { ButtonTokens } from './types';
import { colors } from 'src/atoms';
import { DISABLED_TOKENS } from 'src/molecules/ButtonV2/tokens/disabled';

export const PRIMARY_TOKENS: ButtonTokens = {
  filled: {
    backgroundColor: colors.interactive.primary__resting.rgba,
    color: colors.text.static_icons__primary_white.rgba,
    outlineColor: colors.interactive.primary__resting.rgba,

    hover: {
      backgroundColor: colors.interactive.primary__hover.rgba,
      color: colors.text.static_icons__primary_white.rgba,
      borderColor: colors.interactive.primary__hover.rgba,
    },
    pressed: {
      backgroundColor: colors.interactive.primary__pressed.rgba,
      color: colors.text.static_icons__primary_white.rgba,
    },
    disabled: DISABLED_TOKENS.filled,
  },
  outlined: {
    backgroundColor: colors.ui.background__default.rgba,
    color: colors.interactive.primary__resting.rgba,
    borderColor: colors.interactive.primary__resting.rgba,
    outlineColor: colors.interactive.primary__resting.rgba,

    hover: {
      backgroundColor: colors.interactive.primary__hover_alt.rgba,
      color: colors.interactive.primary__hover.rgba,
      borderColor: colors.interactive.primary__hover.rgba,
    },
    pressed: {
      backgroundColor: colors.ui.background__default.rgba,
      color: colors.interactive.primary__pressed.rgba,
      borderColor: colors.interactive.primary__pressed.rgba,
    },
    disabled: DISABLED_TOKENS.outlined,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.interactive.primary__resting.rgba,
    outlineColor: colors.interactive.primary__resting.rgba,

    hover: {
      backgroundColor: colors.interactive.primary__hover_alt.rgba,
      color: colors.interactive.primary__hover.rgba,
      borderColor: colors.interactive.primary__hover_alt.rgba,
    },
    pressed: {
      backgroundColor: 'transparent',
      color: colors.interactive.primary__pressed.rgba,
      borderColor: colors.interactive.primary__pressed.rgba,
    },
    disabled: DISABLED_TOKENS.ghost,
  },
} as const;
