import { useMemo } from 'react';

import {
  isUserInActiveUserArray,
  useFeatureToggleContext,
} from '../providers/FeatureToggleProvider';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { environment } from 'src/utils';

const { getEnvironmentName } = environment;

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
