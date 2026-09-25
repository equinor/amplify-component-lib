import { BannerProps } from './Banner';
import { colors } from 'src/atoms/style';
import { DISABLED_TOKENS } from 'src/molecules/Button/tokens/disabled';
import { createButtonTokenVariables } from 'src/molecules/Button/tokens/inherited';

export const BANNER_COLORS = {
  info: {
    background: colors.ui.background__info.rgba,
    text: colors.interactive.info__text.rgba,
    hover: colors.interactive.info__text_hover.rgba,
    nestedHover: colors.interactive.info__nested_hover.rgba,
  },
  warning: {
    background: colors.ui.background__warning.rgba,
    text: colors.interactive.warning__text.rgba,
    hover: colors.interactive.warning__text_hover.rgba,
    nestedHover: colors.interactive.warning__nested_hover.rgba,
  },
  danger: {
    background: colors.ui.background__danger.rgba,
    text: colors.interactive.danger__text.rgba,
    hover: colors.interactive.danger__text_hover.rgba,
    nestedHover: colors.interactive.danger__nested_hover.rgba,
  },
} satisfies Record<
  BannerProps['variant'],
  { background: string; text: string; hover: string; nestedHover: string }
>;

function createBannerButtonVariables(variant: BannerProps['variant']) {
  const { text, hover, nestedHover } = BANNER_COLORS[variant];
  const filledHover = {
    backgroundColor: hover,
    color: colors.text.static_icons__primary_white.rgba,
  };
  const outlinedHover = {
    backgroundColor: nestedHover,
    color: hover,
    borderColor: hover,
  };
  const ghostHover = { backgroundColor: nestedHover, color: hover };

  return createButtonTokenVariables({
    filled: {
      backgroundColor: text,
      color: colors.text.static_icons__primary_white.rgba,
      outlineColor: text,
      hover: filledHover,
      pressed: filledHover,
      disabled: DISABLED_TOKENS.filled,
    },
    outlined: {
      backgroundColor: 'transparent',
      color: text,
      borderColor: text,
      outlineColor: text,
      hover: outlinedHover,
      pressed: outlinedHover,
      disabled: DISABLED_TOKENS.outlined,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: text,
      outlineColor: text,
      hover: ghostHover,
      pressed: ghostHover,
      disabled: DISABLED_TOKENS.ghost,
    },
  });
}

export const BANNER_BUTTON_VARIABLES = {
  info: createBannerButtonVariables('info'),
  warning: createBannerButtonVariables('warning'),
  danger: createBannerButtonVariables('danger'),
};
