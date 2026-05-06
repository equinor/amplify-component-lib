import { colors } from 'src/atoms/style';
import { DISABLED_TOKENS } from 'src/molecules/Button/tokens/disabled';
import type { ButtonTokens } from 'src/molecules/Button/tokens/types';

export const DANGER_TOKENS: ButtonTokens = {
  filled: {
    backgroundColor: colors.interactive.danger__resting.rgba,
    color: colors.text.static_icons__primary_white.rgba,
    outlineColor: colors.interactive.danger__resting.rgba,

    hover: {
      backgroundColor: colors.interactive.danger__hover.rgba,
      color: colors.text.static_icons__primary_white.rgba,
    },
    pressed: {
      backgroundColor: colors.interactive.danger__hover.rgba,
      color: colors.text.static_icons__primary_white.rgba,
    },
    disabled: DISABLED_TOKENS.filled,
  },
  outlined: {
    backgroundColor: colors.ui.background__default.rgba,
    color: colors.interactive.danger__resting.rgba,
    borderColor: colors.interactive.danger__resting.rgba,
    outlineColor: colors.interactive.danger__resting.rgba,

    hover: {
      backgroundColor: colors.interactive.danger__highlight.rgba,
      color: colors.interactive.danger__hover.rgba,
      borderColor: colors.interactive.danger__hover.rgba,
    },
    pressed: {
      backgroundColor: colors.ui.background__default.rgba,
      color: colors.interactive.danger__hover.rgba,
      borderColor: colors.interactive.danger__hover.rgba,
    },
    disabled: DISABLED_TOKENS.outlined,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.interactive.danger__resting.rgba,
    outlineColor: colors.interactive.danger__resting.rgba,

    hover: {
      backgroundColor: colors.interactive.danger__highlight.rgba,
      color: colors.interactive.danger__hover.rgba,
    },
    pressed: {
      backgroundColor: 'transparent',
      color: colors.interactive.danger__hover.rgba,
      borderColor: colors.interactive.danger__hover.rgba,
    },
    disabled: DISABLED_TOKENS.ghost,
  },
} as const;
