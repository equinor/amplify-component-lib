import {
  error_outlined,
  IconData,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';

import { ShowSnackbar } from './SnackbarProvider';

export function snackbarIcon(variant: ShowSnackbar['variant']): IconData {
  switch (variant) {
    case 'info':
      return info_circle;
    case 'warning':
      return warning_outlined;
    case 'error':
      return error_outlined;
  }
}
