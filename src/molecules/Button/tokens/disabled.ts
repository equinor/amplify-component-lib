import { colors } from 'src/atoms';

export const DISABLED_TOKENS = {
  filled: {
    backgroundColor: colors.interactive.disabled__fill.rgba,
    color: colors.interactive.disabled__text.rgba,
  },
  outlined: {
    backgroundColor: colors.ui.background__default.rgba,
    color: colors.interactive.disabled__text.rgba,
    borderColor: colors.interactive.disabled__text.rgba,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.interactive.disabled__text.rgba,
  },
} as const;
