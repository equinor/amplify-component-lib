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
    containerBackground: string;
    controlForeground: string;
    controlForegroundHover: string;
    controlHoverBackground: string;
    progressFill: string;
  }
> = {
  neutral: {
    containerBackground: colors.ui.background__light.rgba,
    controlForeground: colors.interactive.secondary__resting.rgba,
    controlForegroundHover: colors.text.static_icons__default.rgba,
    controlHoverBackground: colors.ui.background__light_medium.rgba,
    progressFill: colors.text.static_icons__secondary.rgba,
  },
  info: {
    containerBackground: colors.ui.background__info.rgba,
    controlForeground: colors.interactive.info__text.rgba,
    controlForegroundHover: colors.interactive.info__text_hover.rgba,
    controlHoverBackground: colors.interactive.info__nested_hover.rgba,
    progressFill: colors.interactive.info__text.rgba,
  },
  warning: {
    containerBackground: colors.ui.background__warning.rgba,
    controlForeground: colors.interactive.warning__text.rgba,
    controlForegroundHover: colors.interactive.warning__text_hover.rgba,
    controlHoverBackground: colors.interactive.warning__nested_hover.rgba,
    progressFill: colors.interactive.warning__resting.rgba,
  },
  error: {
    containerBackground: colors.ui.background__danger.rgba,
    controlForeground: colors.interactive.danger__text.rgba,
    controlForegroundHover: colors.interactive.danger__text_hover.rgba,
    controlHoverBackground: colors.interactive.danger__nested_hover.rgba,
    progressFill: colors.interactive.danger__resting.rgba,
  },
  success: {
    containerBackground: colors.ui.background__success.rgba,
    controlForeground: colors.interactive.success__text.rgba,
    controlForegroundHover: colors.interactive.success__text_hover.rgba,
    controlHoverBackground: colors.interactive.success__nested_hover.rgba,
    progressFill: colors.interactive.success__resting.rgba,
  },
} as const;
