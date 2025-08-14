import { ButtonProps } from 'src/molecules/Button/Button';

export function variantAndColorToProgressColor({
  variant,
  color,
}: {
  variant: ButtonProps['variant'] | undefined;
  color: ButtonProps['color'] | undefined;
}) {
  if (
    variant === undefined ||
    variant === 'contained' ||
    variant === 'contained_icon' ||
    (color === 'danger' && variant === 'ghost_icon')
  ) {
    return 'neutral';
  }

  if (color === 'danger' && !variant.includes('icon')) {
    return 'tertiary';
  }

  return 'primary';
}
