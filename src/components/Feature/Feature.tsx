import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { auth, environment } from '../../utils';

const { getAppName, getEnvironmentName, getApiUrl, getPortalProdClientId } =
  environment;
const { GRAPH_REQUESTS_LOGIN, acquireToken } = auth;
import { useMsal } from '@azure/msal-react';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '../../providers/AuthProvider/AuthProvider';

// These three types (FeatureToggleDto, Feature, GraphUser) are from the swagger generated types in the portal API

export type FeatureToggleDto = {
  applicationName?: string | null;
  features?: Array<Feature> | null;
};

export type Feature = {
  uuid?: string | null;
  featureKey?: string | null;
  description?: string | null;
  activeUsers?: Array<GraphUser> | null;
  activeEnvironments?: Array<string> | null;
};

export type GraphUser = {
  id?: string | null;
  displayName?: string | null;
  mail?: string | null;
  userPrincipalName?: string | null;
};

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

interface FeatureProps {
  featureKey: string;
  children: ReactNode;
  fallback?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Feature: FC<FeatureProps> = ({ featureKey, children, fallback }) => {
  const [showContent, setShowContent] = useState<boolean | undefined>(
    undefined
  );
  const [featureToggle, setFeatureToggle] = useState<FeatureToggleDto>();
  const [portalToken, setPortalToken] = useState<string>('');

  const { instance } = useMsal();
  const account = useAuth().account;
  const username = `${account?.username}`;
  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const environment = getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME);
  const apiUrl = getApiUrl(import.meta.env.VITE_API_URL);
  const portalProdClientId = getPortalProdClientId(
    import.meta.env.VITE_PORTAL_PROD_CLIENT_ID
  );

  const runRequests = async () => {
    const token = await acquireToken(instance, GRAPH_REQUESTS_LOGIN);
    getPortalToken(token.accessToken);
  };

  const { mutate: getPortalToken } = useMutation(
    ['getPortalProdToken'],
    async (token: string) =>
      await fetch(`${apiUrl}/api/v1/Token/${portalProdClientId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
        },
      }).then((res) => res.json()),
    {
      onSuccess: (res) => {
        setPortalToken(res);
        getFeatureToggle();
      },
    }
  );

  const { mutate: getFeatureToggle, isLoading } = useMutation<FeatureToggleDto>(
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
      ).then((res) => res.json()),
    {
      onSuccess: (res) => {
        setFeatureToggle(res);
      },
    }
  );

  useEffect(() => {
    runRequests();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const feature = featureToggle?.features?.find(
      (feature) => feature.featureKey === featureKey
    );
    if (feature) {
      if (isUserInActiveUserArray(username, feature.activeUsers)) {
        setShowContent(true);
      } else if (!feature.activeEnvironments?.includes(environment)) {
        setShowContent(false);
      } else {
        setShowContent(true);
      }
    } else {
      setShowContent(true);
    }
  }, [environment, featureKey, featureToggle?.features, username]);

  if (isLoading) return null;

  if (showContent) {
    return <>{children}</>;
  } else {
    return <>{fallback ?? null}</>;
  }
};

export default Feature;
