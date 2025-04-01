import { Variants } from 'src/atoms/types/variants';
import { getVariantIcon } from 'src/atoms/utils/forms';

test.each(['error', 'warning', 'success', 'dirty', undefined])(
  '%s icon',
  async (variant) => {
    const icon = getVariantIcon(variant as Variants);
    expect(icon).toBeDefined();
  }
);
