import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactNode,
  useState,
} from 'react';

import { useQuery } from '@tanstack/react-query';

import { environment } from '../utils';
import { EnvironmentType } from './Navigation/TopBar/TopBar';

const { getAppName, getEnvironmentName } = environment;

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
  userEmail: string,
  activeUsers: GraphUser[] | undefined | null
) => {
  if (activeUsers && activeUsers.length > 0) {
    return activeUsers.filter(
      (user) =>
        (user.mail ?? '').toLowerCase() === (userEmail ?? '').toLowerCase()
    );
  }
  return false;
};

interface FeatureProps {
  featureKey: string;
  children: ReactNode;
  applicationName?: string;
  environment?: EnvironmentType;
  fallback?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  userEmail: string;
  portalToken: string;
}

const Feature: FC<FeatureProps> = ({
  featureKey,
  children,
  fallback,
  userEmail,
  portalToken,
}) => {
  const [isToggledOff, setIsToggledOff] = useState<boolean | undefined>(
    undefined
  );

  const applicationName = getAppName(undefined);
  console.log('appName: ', applicationName);
  const environment = getEnvironmentName(undefined);
  console.log('environment: ', environment);
  const environmentForApiUrl =
    environment === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environment;

  // const { data: portalToken } = useQuery(['getPortalToken'], () =>
  //   TokenService.getPortalToken()
  // );

  const { data: featureToggle, isLoading } = useQuery(
    ['getFeatureToggleFromAppName'],
    async () =>
      await fetch(
        `https://localhost:5001/api/v1/FeatureToggle/${applicationName}`,
        // `https://api-amplify-portal-${environmentForApiUrl}.radix.equinor.com/api/v1/FeatureToggle/${applicationName}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${portalToken}`,
          },
        }
      ).then((res) => res.json()),
    {
      onSuccess: (data: FeatureToggleDto) => {
        const feature = data.features?.find(
          (feature) => feature.featureKey === featureKey
        );
        if (feature) {
          checkFeature(feature);
        } else {
          setIsToggledOff(false);
        }
      },
    }
  );
  const checkFeature = (feature: Feature) => {
    if (isUserInActiveUserArray(userEmail, feature.activeUsers)) {
      setIsToggledOff(false);
    } else if (!feature.activeEnvironments?.includes(environment)) {
      setIsToggledOff(true);
    } else {
      setIsToggledOff(false);
    }
  };

  if (isLoading) return null;

  if (isToggledOff) {
    return <>{fallback}</>;
  } else {
    return <>{children}</>;
  }
};

export default Feature;
