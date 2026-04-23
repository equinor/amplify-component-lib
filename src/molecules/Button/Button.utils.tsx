import { ButtonColors, ButtonVariants } from 'src/molecules/Button/types';

export const getLoadingColor = ({
  color,
  variant,
}: {
  color: ButtonColors;
  variant: ButtonVariants;
}) => {
  if (variant === 'filled') return 'neutral';
  return color === 'danger' ? 'tertiary' : 'primary';
};
