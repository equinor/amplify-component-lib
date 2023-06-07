import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

import { useFeatureToggling } from '../../hooks';

interface FeatureProps {
  featureKey: string;
  children: ReactNode;
  fallback?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Feature: FC<FeatureProps> = ({ featureKey, children, fallback }) => {
  const { showContent, isLoading } = useFeatureToggling({ featureKey });

  if (isLoading) return null;

  if (showContent) {
    return <>{children}</>;
  } else {
    return <>{fallback ?? null}</>;
  }
};

export default Feature;
