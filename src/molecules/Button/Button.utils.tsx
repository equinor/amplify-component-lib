export const getLoadingColor = ({
  color,
  variant,
}: {
  color: 'primary' | 'danger';
  variant: 'filled' | 'outlined' | 'ghost';
}) => {
  if (variant === 'filled') return 'neutral';
  return color === 'danger' ? 'tertiary' : 'primary';
};
