import { Variants } from 'src/atoms/types/variants';
import { VARIANT_ICONS } from 'src/atoms/utils/forms';

test.each(Object.keys(VARIANT_ICONS))('%s icon', async (variant) => {
  const icon = VARIANT_ICONS[variant as Variants];
  if (variant === 'dirty') {
    expect(icon).toBeUndefined();
  } else {
    expect(icon).toBeDefined();
  }
});
