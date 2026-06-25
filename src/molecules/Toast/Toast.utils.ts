import {
  check_circle_outlined,
  error_outlined,
  IconData,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';

import { type ToastProps } from './Toast';
import { colors } from 'src/atoms/style';

export function getHeaderIcon({
  icon,
  variant,
}: Pick<ToastProps, 'icon' | 'variant'>): IconData | undefined {
  if (icon) return icon;

  switch (variant) {
    case 'info':
      return info_circle;
    case 'warning':
      return warning_outlined;
    case 'error':
      return error_outlined;
    case 'success':
      return check_circle_outlined;
    default:
      return undefined;
  }
}

export const TOAST_COLORS: Record<
  NonNullable<ToastProps['variant']>,
  {
    background: string;
    actionText: string;
    actionBackground: string;
    actionTextHover: string;
    actionBackgroundHover: string;
    duration: string;
  }
> = {
  neutral: {
    background: colors.ui.background__light.rgba,
    actionText: colors.interactive.secondary__resting.rgba,
    actionBackground: colors.ui.background__light.rgba,
    actionTextHover: colors.text.static_icons__default.rgba,
    actionBackgroundHover: colors.ui.background__light_medium.rgba,
    duration: colors.text.static_icons__secondary.rgba,
  },
  info: {
    background: colors.ui.background__info.rgba,
    actionText: colors.interactive.info__text.rgba,
    actionBackground: colors.ui.background__info.rgba,
    actionTextHover: colors.interactive.info__text_hover.rgba,
    actionBackgroundHover: colors.interactive.info__nested_hover.rgba,
    duration: colors.interactive.info__text.rgba,
  },
  warning: {
    background: colors.ui.background__warning.rgba,
    actionText: colors.interactive.warning__text.rgba,
    actionBackground: colors.ui.background__warning.rgba,
    actionTextHover: colors.interactive.warning__text_hover.rgba,
    actionBackgroundHover: colors.interactive.warning__nested_hover.rgba,
    duration: colors.interactive.warning__resting.rgba,
  },
  error: {
    background: colors.ui.background__danger.rgba,
    actionText: colors.interactive.danger__text.rgba,
    actionBackground: colors.ui.background__danger.rgba,
    actionTextHover: colors.interactive.danger__text_hover.rgba,
    actionBackgroundHover: colors.interactive.danger__nested_hover.rgba,
    duration: colors.interactive.danger__resting.rgba,
  },
  success: {
    background: colors.ui.background__success.rgba,
    actionText: colors.interactive.success__text.rgba,
    actionBackground: colors.ui.background__success.rgba,
    actionTextHover: colors.interactive.success__text_hover.rgba,
    actionBackgroundHover: colors.interactive.success__nested_hover.rgba,
    duration: colors.interactive.success__resting.rgba,
  },
} as const;
