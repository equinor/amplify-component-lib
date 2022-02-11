import React from 'react';
import DataAcquisition from './data-acquisition';
import DataExperience from './data-experience';
import { find } from 'lodash-es';
import DataSharing from './data-sharing';
import DataTracker from './data-tracker';
import DefaultIcon from './defaultIcon';
import Portal from './portal';
import { ISvgIconProps } from '.';

interface IApplicationIconProps {
  name:
    | 'acquire'
    | '4dinsight'
    | 'recap'
    | 'dasha'
    | 'portal'
    | 'default'
    | string;
  size?: 16 | 24 | 32 | 40 | 48 | 96;
}
interface IApplicationIconData {
  appName: string;
  component: React.FC<ISvgIconProps>;
}
const apps: IApplicationIconData[] = [
  { appName: 'default', component: DefaultIcon },
  { appName: 'portal', component: Portal },
  { appName: 'acquire', component: DataAcquisition },
  { appName: '4dinsight', component: DataExperience },
  { appName: 'dasha', component: DataSharing },
  { appName: 'recap', component: DataTracker },
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
