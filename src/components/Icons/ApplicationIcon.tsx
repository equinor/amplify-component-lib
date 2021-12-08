import React from 'react';
import DataAcquisition from '../utilities/icons/data-acquisition';
import DataExperience from '../utilities/icons/data-experience';
import { find } from 'lodash-es';
import DataSharing from '../utilities/icons/data-sharing';
import DataTracker from '../utilities/icons/data-tracker';
import Default from '../utilities/icons/default';
import Portal from '../utilities/icons/portal';

interface ISvgIconProps {
  size?: 16 | 24 | 32 | 40 | 48;
}

interface IApplicationIconProps {
  name:
    | 'data acquisition'
    | 'data experience'
    | 'data tracker'
    | 'data sharing'
    | 'portal'
    | 'default'
    | string;
  size?: 16 | 24 | 32 | 40 | 48;
}
interface IApplicationIconData {
  appName: string;
  component: React.FC<ISvgIconProps>;
}
const apps: IApplicationIconData[] = [
  { appName: 'default', component: Default },
  { appName: 'portal', component: Portal },
  { appName: 'data acquisition', component: DataAcquisition },
  { appName: 'data experience', component: DataExperience },
  { appName: 'data sharing', component: DataSharing },
  { appName: 'data tracker', component: DataTracker },
];

const ApplicationIcon: React.FC<IApplicationIconProps> = ({ name, size }) => {
  const Fallback = apps[0].component;
  if (name) {
    const appData = find(apps, { appName: name });
    if (appData) {
      return <appData.component size={size} />;
    }

    return <Fallback size={size} />;
  }

  console.warn(
    `Unable to find app icon with name ${name}, returning default icon`
  );
  return <Fallback size={size} />;
};

export default ApplicationIcon;
