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
  recap,
} from './ApplicationIconData/ApplicationIconCollection';
import { AllowedColors } from './ApplicationIcon.utils';
import { ApplicationIconBase } from './ApplicationIconBase';

export type ApplicationName =
  | 'amplify'
  | 'bravos'
  | 'embark'
  | 'premo'
  | 'inpress'
  | 'dasha'
  | 'orca'
  | 'acquire'
  | 'pwex'
  | 'ltg'
  | 'equinor'
  | 'recap';

interface ApplicationIconData {
  appName: string;
  iconSvg: AppIconData['svgPathData'];
  rotationVariant: number;
  color: AllowedColors;
}

const apps: Record<ApplicationName | string, ApplicationIconData | undefined> =
  {
    amplify: {
      appName: 'amplify',
      iconSvg: amplify.svgPathData,
      rotationVariant: 1,
      color: 'blue',
    },
    bravos: {
      appName: 'bravos',
      iconSvg: bravos.svgPathData,
      rotationVariant: 2,
      color: 'blue',
    },
    embark: {
      appName: 'embark',
      iconSvg: embark.svgPathData,
      rotationVariant: 2,
      color: 'green',
    },
    premo: {
      appName: 'premo',
      iconSvg: premo.svgPathData,
      rotationVariant: 3,
      color: 'purple',
    },
    dasha: {
      appName: 'dasha',
      iconSvg: dasha.svgPathData,
      rotationVariant: 0,
      color: 'red',
    },
    acquire: {
      appName: 'acquire',
      iconSvg: acquire.svgPathData,
      rotationVariant: 1,
      color: 'yellow',
    },
    orca: {
      appName: 'orca',
      iconSvg: orca.svgPathData,
      rotationVariant: 2,
      color: 'magenta',
    },
    pwex: {
      appName: 'pwex',
      iconSvg: pwex.svgPathData,
      rotationVariant: 3,
      color: 'blue',
    },
    ltg: {
      appName: 'ltg',
      iconSvg: ltg.svgPathData,
      rotationVariant: 0,
      color: 'green',
    },
    recap: {
      appName: 'recap',
      iconSvg: recap.svgPathData,
      rotationVariant: 2,
      color: 'red',
    },
    inpress: {
      appName: 'inpress',
      iconSvg: inpress.svgPathData,
      rotationVariant: 1,
      color: 'green',
    },
    equinor: {
      appName: 'equinor',
      iconSvg: equinor.svgPathData,
      rotationVariant: 1,
      color: 'purple',
    },
  };

const FALLBACK_APP_ICON: ApplicationIconData = {
  appName: 'fallback',
  iconSvg: fallback.svgPathData,
  rotationVariant: 2,
  color: 'blue',
} as const;

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
  let appData = apps[name];

  if (!appData) {
    // Set appData to the fallback icon data
    appData = FALLBACK_APP_ICON;
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
