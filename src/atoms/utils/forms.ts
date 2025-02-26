import {
  error_outlined,
  IconData,
  thumbs_up,
  warning_outlined,
} from '@equinor/eds-icons';

import { Variants } from '../types/variants';

export const VARIANT_ICONS: Record<Variants, IconData | undefined> = {
  error: error_outlined,
  warning: warning_outlined,
  success: thumbs_up,
  dirty: undefined,
};
