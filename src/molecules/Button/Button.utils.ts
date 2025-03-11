import { ButtonProps } from 'src/molecules/Button/Button';

export function variantAndColorToProgressColor({
  variant,
  color,
  disabled,
}: {
  variant: ButtonProps['variant'] | undefined;
  color: ButtonProps['color'] | undefined;
  disabled: boolean;
}) {
  if (
    disabled ||
    variant === undefined ||
    variant === 'contained' ||
    (color === 'danger' && variant.includes('icon'))
  ) {
    return 'neutral';
  }

  if (color === 'danger' && !variant.includes('icon')) {
    return 'tertiary';
  }

  return 'primary';
}
