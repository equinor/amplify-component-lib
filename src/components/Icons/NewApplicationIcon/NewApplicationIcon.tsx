import React, { forwardRef } from 'react';

import {
  acquire,
  amplify,
  dasha,
  embark,
  equinor,
  ltg,
  orca,
  premo,
  pwex,
} from './ApplicationIcons/ApplicationIconCollection'; // Adjust imports as per your icons collection
import NewApplicationBase from './NewApplicationIconBase'; // Adjust the path as per your project structure
import { AppIconProps } from 'src/types'; // Adjust the path as per your types file

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
  appName: string[];
  iconSvg: string[]; // This is where you'll store paths like amplify.svgPathData
}

const apps: ApplicationIconData[] = [
  { appName: ['amplify'], iconSvg: amplify.svgPathData },
  { appName: ['embark'], iconSvg: embark.svgPathData },
  { appName: ['premo'], iconSvg: premo.svgPathData },
  { appName: ['dasha'], iconSvg: dasha.svgPathData },
  { appName: ['acquire'], iconSvg: acquire.svgPathData },
  { appName: ['orca'], iconSvg: orca.svgPathData },
  { appName: ['pwex'], iconSvg: pwex.svgPathData },
  { appName: ['ltg'], iconSvg: ltg.svgPathData },
  { appName: ['equinor'], iconSvg: equinor.svgPathData },
];

export interface ApplicationIconProps extends Partial<AppIconProps> {
  name: ApplicationName | string;
}

const ApplicationIcon = forwardRef<HTMLDivElement, ApplicationIconProps>(
  ({ name, size = 48 }) => {
    const appData = apps.find((app) =>
      app.appName.includes(name.toLowerCase())
    );

    if (!appData) {
      // Handle case where appData is not found
      return <div>Icon not found for {name}</div>;
    }

    const { iconSvg } = appData;

    return (
      <NewApplicationBase
        size={size}
        color="blue" // You can replace with logic to determine color based on props or data
        rotationVariant={1} // Example rotation variant
        hasLargeWaves={true} // Example value, adjust as needed
        animationState="animated" // Example animation state
        appIconData={iconSvg}
      />
    );
  }
);

ApplicationIcon.displayName = 'ApplicationIcon';

export default ApplicationIcon;
