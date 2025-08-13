import { FC, ReactNode, useEffect, useState } from 'react';

import { SAM_QUERIES } from '@equinor/subsurface-app-management';
import { useIsFetching } from '@tanstack/react-query';

import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

interface LoadingProviderProps {
  customQueryKeys?: string[];
  children: ReactNode;
}

/**
 *
 * @description Combines loading of tutorials/feature toggles + auth into one.
 * Expects AuthProvider to be wrapped around it with 'withoutLoader'-prop set to true
 * @param customQueryKeys - Custom query keys the loading provider should listen for
 * @param children - ReactNode, typically the rest of your app
 */
export const LoadingProvider: FC<LoadingProviderProps> = ({
  customQueryKeys = [],
  children,
}) => {
  const { authState } = useAuth();
  const isFetchingFeatureToggleOrTutorial =
    useIsFetching({
      predicate: (query) => {
        return (
          SAM_QUERIES.some((queryKey) => query.queryKey.includes(queryKey)) ||
          customQueryKeys.some((queryKey) => query.queryKey.includes(queryKey))
        );
      },
    }) > 0;
  const [isLoading, setIsLoading] = useState(true);

  // This ensures that the initial loading of the app will only happen once
  useEffect(() => {
    if (
      authState === 'authorized' &&
      !isFetchingFeatureToggleOrTutorial &&
      isLoading
    ) {
      setIsLoading(false);
    }
  }, [authState, isFetchingFeatureToggleOrTutorial, isLoading]);

  /*
   * If the user isn't authorized, we can't show children
   * because all the requests would cause infinite rerenders
   * */
  if (authState !== 'authorized') {
    return <FullPageSpinner variant="application" fixedPosition />;
  }

  if (isLoading) {
    return (
      <FullPageSpinner variant="application" fixedPosition>
        {children}
      </FullPageSpinner>
    );
  }

  return children;
};
