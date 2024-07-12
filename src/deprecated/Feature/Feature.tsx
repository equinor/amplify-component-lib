import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

import { useFeatureToggling } from 'src/atoms/hooks';

interface FeatureProps {
  featureKey: string;
  children: ReactNode;
  fallback?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  showIfKeyMissing?: boolean;
}

/* c8 ignore start */
/**
 * @deprecated Being deprecated from amplify-component-lib-library, use the new @equinor/subsurface-app-management package instead
 */
const Feature: FC<FeatureProps> = ({
  featureKey,
  children,
  fallback,
  showIfKeyMissing = true,
}) => {
  const { showContent } = useFeatureToggling(featureKey, showIfKeyMissing);

  if (showContent) {
    return <>{children}</>;
  }

  return <>{fallback ?? null}</>;
};

export default Feature;
/* c8 ignore end */
