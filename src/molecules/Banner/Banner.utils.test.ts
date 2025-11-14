import {
  error_outlined,
  IconData,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';

import { BannerProps } from './Banner';
import { getVariantIcon } from './Banner.utils';

const variants: Array<BannerProps['variant']> = ['info', 'warning', 'danger'];

const variantReturns: Record<BannerProps['variant'], IconData> = {
  info: info_circle,
  warning: warning_outlined,
  danger: error_outlined,
};

test.each(variants)('Expected banner icon for %s variant', (variant) => {
  const returnValue = getVariantIcon(variant);

  expect(returnValue).toBe(variantReturns[variant]);
});
