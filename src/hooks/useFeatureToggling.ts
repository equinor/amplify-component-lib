import { useMemo } from 'react';

import {
  isUserInActiveUserArray,
  useFeatureToggleContext,
} from '../providers/FeatureToggleProvider';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { environment } from 'src/utils';

const { getEnvironmentName } = environment;

export function useFeatureToggling(featureKey: string) {
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
      } else if (feature.activeEnvironments) {
        return feature.activeEnvironments.includes(environment);
      } else {
        return false;
      }
    } else return !isError;
  }, [environment, feature, isError, username]);

  return { showContent };
}
