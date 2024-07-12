import { useMemo } from 'react';

import { environment } from 'src/atoms/utils';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import {
  isUserInActiveUserArray,
  useFeatureToggleContext,
} from 'src/providers/FeatureToggleProvider';

const { getEnvironmentName } = environment;

/**
 * @deprecated Being deprecated from amplify-components-library, use the new @equinor/subsurface-app-management package instead
 */
export function useFeatureToggling(
  featureKey: string,
  showIfKeyMissing?: boolean
) {
  const fallback = showIfKeyMissing ?? true;
  const { account } = useAuth();
  const username = `${account?.username}`;

  const environment = getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME);
  const { features, isError } = useFeatureToggleContext();

  const feature = features?.find(
    (feature) => feature.featureKey === featureKey
  );
  const showContent = useMemo(() => {
    if (feature) {
      if (isUserInActiveUserArray(username, feature.activeUsers)) {
        return true;
      }
      return feature.activeEnvironments.includes(environment);
    }
    if (isError) {
      return false;
    }

    return fallback;
  }, [fallback, environment, feature, isError, username]);

  return { showContent };
}
