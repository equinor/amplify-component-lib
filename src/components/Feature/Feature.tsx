import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

import { useFeatureToggling } from 'src/hooks';

interface FeatureProps {
  featureKey: string;
  children: ReactNode;
  fallback?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Feature: FC<FeatureProps> = ({ featureKey, children, fallback }) => {
  const { showContent } = useFeatureToggling(featureKey);

  if (showContent) {
    return <>{children}</>;
  }

  return <>{fallback ?? null}</>;
};

export default Feature;
