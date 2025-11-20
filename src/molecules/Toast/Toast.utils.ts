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
    icon: string;
    close: string;
    actionHover: string;
    duration: string;
  }
> = {
  neutral: {
    background: colors.ui.background__light.rgba,
    icon: colors.text.static_icons__default.rgba,
    close: colors.interactive.secondary__resting.rgba,
    actionHover: colors.interactive.secondary__resting.rgba,
    duration: colors.interactive.secondary__resting.rgba,
  },
  info: {
    background: colors.ui.background__info.rgba,
    icon: colors.text.static_icons__default.rgba,
    close: colors.interactive.secondary__resting.rgba,
    actionHover: colors.interactive.secondary__resting.rgba,
    duration: colors.interactive.secondary__resting.rgba,
  },
  warning: {
    background: colors.ui.background__warning.rgba,
    icon: colors.interactive.warning__text.rgba,
    close: colors.interactive.warning__text.rgba,
    actionHover: colors.interactive.warning__hover.rgba,
    duration: colors.interactive.warning__resting.rgba,
  },
  error: {
    background: colors.ui.background__danger.rgba,
    icon: colors.interactive.danger__text.rgba,
    close: colors.interactive.danger__text.rgba,
    actionHover: colors.interactive.danger__hover.rgba,
    duration: colors.interactive.danger__resting.rgba,
  },
  success: {
    background: colors.interactive.success__highlight.rgba,
    icon: colors.interactive.success__text.rgba,
    close: colors.interactive.success__text.rgba,
    actionHover: colors.interactive.success__hover.rgba,
    duration: colors.interactive.success__resting.rgba,
  },
} as const;
