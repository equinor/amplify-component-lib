import { FC } from 'react';

import { SvgIconProps } from '../index';
import Acquire from './Acquire';
import Dasha from './Dasha';
import DepthConversion from './DepthConversion';
import FourDInsight from './FourDInsight';
import LoggingQualification from './LoggingQualification';
import Portal from './Portal';
import PWEX from './PWEX';
import Recap from './Recap';

export interface ApplicationIconProps {
  name:
    | 'acquire'
    | '4dinsight'
    | 'recap'
    | 'dasha'
    | 'depth-conversion'
    | 'portal'
    | 'logging-qualification'
    | 'pwex';
  size?: 16 | 24 | 32 | 40 | 48 | 96;
}
interface IApplicationIconData {
  appName: string;
  component: FC<SvgIconProps>;
}
const apps: IApplicationIconData[] = [
  { appName: 'portal', component: Portal },
  { appName: 'acquire', component: Acquire },
  { appName: '4dinsight', component: FourDInsight },
  { appName: 'dasha', component: Dasha },
  { appName: 'depth-conversion', component: DepthConversion },
  { appName: 'logging-qualification', component: LoggingQualification },
  { appName: 'recap', component: Recap },
  { appName: 'pwex', component: PWEX },
];

const ApplicationIcon: FC<ApplicationIconProps> = ({ name, size }) => {
  const appData = apps.find(
    (app) => app.appName === name
  ) as IApplicationIconData;
  return <appData.component size={size} />;
};

export default ApplicationIcon;
