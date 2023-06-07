import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

import useFeatureToggling from '../../hooks/useFeatureToggling';

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

export const isUserInActiveUserArray = (
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
  const { showContent, isLoading } = useFeatureToggling({ featureKey });

  if (isLoading) return null;

  if (showContent) {
    return <>{children}</>;
  } else {
    return <>{fallback ?? null}</>;
  }
};

export default Feature;
