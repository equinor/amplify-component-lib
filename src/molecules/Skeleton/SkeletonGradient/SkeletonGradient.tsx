import { FC } from 'react';

import { COLORS } from 'src/molecules/Skeleton/Skeleton.styles';

export interface SkeletonGradientProps {
  duration?: string;
}

export const SkeletonGradient: FC<SkeletonGradientProps> = ({
  duration = '1.5s',
}) => {
  return (
    <linearGradient
      id="skeleton-gradient"
      x1="0%"
      x2="100%"
      gradientTransform="translate(-0.1)"
    >
      <stop stopColor={COLORS.START} offset="0%" />
      <stop stopColor={COLORS.END} offset="50%" />
      <stop stopColor={COLORS.START} offset="100%" />
      <animateTransform
        attributeName="gradientTransform"
        type="translate"
        begin="0s"
        dur={duration}
        repeatCount="indefinite"
        values="-1; 1; 1"
      />
    </linearGradient>
  );
};
