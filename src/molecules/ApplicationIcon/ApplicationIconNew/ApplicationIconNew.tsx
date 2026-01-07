import { FC } from 'react';

import { AllowedColors } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew.utils';
import { ApplicationIconNewBase } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewBase';
import {
  acquire,
  amplify,
  AppIconData,
  bravos,
  dasha,
  embark,
  equinor,
  inpress,
  ltg,
  orca,
  premo,
  pwex,
  recap,
  sam,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewData/ApplicationIconNewCollection';

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
  | 'recap'
  | 'sam';

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
    appName: 'recap',
    iconSvg: recap.svgPathData,
    rotationVariant: 2,
    color: 'red',
  },
  {
    appName: 'inpress',
    iconSvg: inpress.svgPathData,
    rotationVariant: 1,
    color: 'green',
  },
  {
    appName: 'sam',
    iconSvg: sam.svgPathData,
    rotationVariant: 3,
    color: 'magenta',
  },
  {
    appName: 'equinor',
    iconSvg: equinor.svgPathData,
    rotationVariant: 1,
    color: 'purple',
  },
];

export interface ApplicationIconProps {
  name?: ApplicationName | string;
  size?: number;
  animationState?: 'none' | 'hoverable' | 'animated' | 'loading';
  iconOnly?: boolean;
}

export const ApplicationIconNew: FC<ApplicationIconProps> = ({
  name = 'amplify',
  size = 64,
  animationState = 'none',
  iconOnly = false,
}) => {
  const appData = apps.find((icon) => icon.appName === name.toLowerCase());

  if (!appData) {
    // Set appData to the fallback icon data
    throw new Error('Application icon not found');
  }

  const { iconSvg } = appData;
  return (
    <ApplicationIconNewBase
      size={size}
      color={appData.color}
      rotationVariant={appData.rotationVariant}
      animationState={animationState}
      appIconData={iconSvg}
      iconOnly={iconOnly}
    />
  );
};

ApplicationIconNew.displayName = 'ApplicationIconNew';
