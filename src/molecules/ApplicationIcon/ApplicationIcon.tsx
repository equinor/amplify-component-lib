import { FC } from 'react';

import {
  acquire,
  amplify,
  AppIconData,
  bravos,
  dasha,
  embark,
  equinor,
  fallback,
  inpress,
  ltg,
  orca,
  premo,
  pwex,
} from './ApplicationIconData/ApplicationIconCollection';
import { AllowedColors } from './ApplicationIcon.utils';
import { ApplicationIconBase } from './ApplicationIconBase';

export type ApplicationName =
  | 'amplify'
  | 'embark'
  | 'bravos'
  | 'inpress'
  | 'premo'
  | 'dasha'
  | 'orca'
  | 'acquire'
  | 'pwex'
  | 'ltg'
  | 'equinor';

interface ApplicationIconData {
  appName: string;
  iconSvg: AppIconData['svgPathData'];
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
    appName: 'bravos',
    iconSvg: bravos.svgPathData,
    rotationVariant: 2,
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
    appName: 'inpress',
    iconSvg: inpress.svgPathData,
    rotationVariant: 1,
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
  iconOnly?: boolean;
}

export const ApplicationIcon: FC<ApplicationIconProps> = ({
  name = 'amplify',
  size = 64,
  animationState = 'none',
  iconOnly = false,
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
      iconOnly={iconOnly}
    />
  );
};

ApplicationIcon.displayName = 'ApplicationIcon';
