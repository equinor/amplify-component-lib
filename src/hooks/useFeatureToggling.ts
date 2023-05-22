import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';

import { FeatureToggleDto, GraphUser } from '../components/Feature/Feature';
import { useAuth } from '../providers/AuthProvider/AuthProvider';
import { auth, environment } from '../utils';

const {
  getAppName,
  getEnvironmentName,
  getApiUrl,
  getPortalProdClientId,
  getApiScope,
} = environment;
const { GRAPH_REQUESTS_BACKEND, acquireToken } = auth;

interface useFeatureTogglingProps {
  featureKey: string;
}

export const useFeatureToggling = ({ featureKey }: useFeatureTogglingProps) => {
  const { instance } = useMsal();
  const account = useAuth().account;
  const username = `${account?.username}`;
  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const environment = getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME);
  const apiUrl = getApiUrl(import.meta.env.VITE_API_URL);
  const portalProdClientId = getPortalProdClientId(
    import.meta.env.VITE_PORTAL_PROD_CLIENT_ID
  );

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

  const { data: portalToken } = useQuery<string>(
    ['getPortalProdToken'],
    async () => {
      const authResult = await acquireToken(
        instance,
        GRAPH_REQUESTS_BACKEND(getApiScope(import.meta.env.VITE_API_SCOPE))
      );
      return await fetch(`${apiUrl}/api/v1/Token/${portalProdClientId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authResult.accessToken,
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  );

  const { data: featureToggle } = useQuery<FeatureToggleDto>(
    ['getFeatureToggleFromAppName'],
    async () =>
      await fetch(
        `https://api-amplify-portal-production.radix.equinor.com/api/v1/FeatureToggle/${applicationName}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + portalToken,
            'Content-type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error);
        }),
    { enabled: portalToken !== undefined }
  );

  const feature = featureToggle?.features?.find(
    (feature) => feature.featureKey === featureKey
  );

  if (feature) {
    if (isUserInActiveUserArray(username, feature.activeUsers)) {
      return true;
    } else return feature.activeEnvironments?.includes(environment);
  } else {
    return true;
  }
};

export default useFeatureToggling;
