import { spacings } from 'src/atoms/style';

export function getSkeletonTop({
  meta,
  label,
}: {
  meta?: unknown;
  label?: unknown;
}) {
  if (meta || label) return '1rem';
  return '0';
}

export function getSkeletonHeight({
  label,
  helperText,
  helperIcon,
}: {
  label?: unknown;
  helperText?: unknown;
  helperIcon?: unknown;
}) {
  return `calc(100% - ${label ? '1rem' : '0px'} - ${helperText || helperIcon ? '1.5rem' : '0px'} - ${spacings.small})`;
}
