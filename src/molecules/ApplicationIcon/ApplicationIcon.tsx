import { FC } from 'react';

import {
  acquire,
  amplify,
  dasha,
  embark,
  equinor,
  fallback,
  ltg,
  orca,
  premo,
  pwex,
} from './ApplicationIconData/ApplicationIconCollection'; // Adjust imports as per your icons collection
import { AllowedColors } from './ApplicationIcon.utils'; // Adjust the path as per your project structure
import ApplicationIconBase from './ApplicationIconBase'; // Adjust the path as per your project structure

export type ApplicationName =
  | 'amplify'
  | 'embark'
  | 'premo'
  | 'dasha'
  | 'orca'
  | 'acquire'
  | 'pwex'
  | 'ltg'
  | 'equinor';

interface ApplicationIconData {
  appName: string;
  iconSvg: string[];
  rotationVariant: number;
  color: AllowedColors;
}

const apps: ApplicationIconData[] = [
  {
    appName: 'amplify',
    iconSvg: amplify.svgPathData,
    rotationVariant: 1,
    color: 'blue',
  },
  {
    appName: 'embark',
    iconSvg: embark.svgPathData,
    rotationVariant: 2,
    color: 'green',
  },
  {
    appName: 'premo',
    iconSvg: premo.svgPathData,
    rotationVariant: 3,
    color: 'purple',
  },
  {
    appName: 'dasha',
    iconSvg: dasha.svgPathData,
    rotationVariant: 0,
    color: 'red',
  },
  {
    appName: 'acquire',
    iconSvg: acquire.svgPathData,
    rotationVariant: 1,
    color: 'yellow',
  },
  {
    appName: 'orca',
    iconSvg: orca.svgPathData,
    rotationVariant: 2,
    color: 'magenta',
  },
  {
    appName: 'pwex',
    iconSvg: pwex.svgPathData,
    rotationVariant: 3,
    color: 'blue',
  },
  {
    appName: 'ltg',
    iconSvg: ltg.svgPathData,
    rotationVariant: 0,
    color: 'green',
  },
  {
    appName: 'equinor',
    iconSvg: equinor.svgPathData,
    rotationVariant: 1,
    color: 'purple',
  },
  {
    appName: 'fallback',
    iconSvg: fallback.svgPathData,
    rotationVariant: 2,
    color: 'blue',
  },
];

export interface ApplicationIconProps {
  name: ApplicationName | string;
  size?: number;
  animationState?: 'none' | 'hoverable' | 'animated' | 'loading';
}

export const ApplicationIcon: FC<ApplicationIconProps> = ({
  name = 'amplify',
  size = 64,
  animationState = 'none',
}) => {
  let appData = apps.find((app) => app.appName.includes(name.toLowerCase()));

  if (!appData) {
    // Set appData to the fallback icon data
    appData = {
      appName: 'fallback',
      iconSvg: fallback.svgPathData,
      rotationVariant: 1,
      color: 'blue',
    };
  }

  const { iconSvg } = appData;
  return (
    <ApplicationIconBase
      size={size}
      color={appData.color}
      rotationVariant={appData.rotationVariant}
      animationState={animationState}
      appIconData={iconSvg}
    />
  );
};

ApplicationIcon.displayName = 'ApplicationIcon';
export default ApplicationIcon;
