import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { FeatureToggleDto, GraphUser } from 'src/api';
import { PortalService } from 'src/api/services/PortalService';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { environment } from 'src/utils';

const { getAppName, getEnvironmentName } = environment;

export function useFeatureToggling(featureKey: string) {
  const { account } = useAuth();
  const username = `${account?.username}`;
  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const environment = getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME);

  const isUserInActiveUserArray = (
    username: string,
    activeUsers: GraphUser[] | undefined | null
  ) => {
    if (activeUsers && activeUsers.length > 0) {
      return activeUsers.filter((user) =>
        (user.mail ?? '').toLowerCase().includes(username.toLowerCase())
      );
    }
    return false;
  };

  const {
    data: featureToggle,
    isLoading,
    isError,
  } = useQuery<FeatureToggleDto>(['getFeatureToggleFromAppName'], async () =>
    PortalService.getFeatureToggleFromApplicationName(applicationName)
  );

  const feature = featureToggle?.features?.find(
    (feature) => feature.featureKey === featureKey
  );

  const showContent = useMemo(() => {
    if (feature) {
      if (isUserInActiveUserArray(username, feature.activeUsers)) {
        return true;
      } else return feature.activeEnvironments?.includes(environment);
    } else return !isError;
  }, [environment, feature, isError, username]);

  return { showContent, isLoading };
}
