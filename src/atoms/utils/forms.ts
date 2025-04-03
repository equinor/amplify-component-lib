import {
  error_outlined,
  IconData,
  info_circle,
  thumbs_up,
  warning_outlined,
} from '@equinor/eds-icons';

import { Variants } from '../types/variants';

export function getVariantIcon(variant: Variants | undefined): IconData {
  switch (variant) {
    case 'error':
      return error_outlined;
    case 'warning':
      return warning_outlined;
    case 'success':
      return thumbs_up;
    case 'dirty':
    case undefined:
      return info_circle;
  }
}
