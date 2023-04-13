import { FC } from 'react';

import { SvgIconProps } from '../index';
import Acquire from './Acquire';
import Dasha from './Dasha';
import DepthConversion from './DepthConversion';
import Fallback from './Fallback';
import FourDInsight from './FourDInsight';
import InPress from './InPress';
import LoggingQualification from './LoggingQualification';
import Portal from './Portal';
import Pwex from './Pwex';
import Recap from './Recap';

export type ApplicationName =
  | 'acquire'
  | '4dinsight'
  | 'recap'
  | 'dasha'
  | 'depth-conversion'
  | 'portal'
  | 'logging-qualification'
  | 'pwex'
  | 'inpress';

export interface ApplicationIconProps {
  name: ApplicationName;
  size?: 16 | 18 | 24 | 32 | 40 | 48;
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
  { appName: 'pwex', component: Pwex },
  { appName: 'inpress', component: InPress },
];

const ApplicationIcon: FC<ApplicationIconProps> = ({ name, size }) => {
  const appData = apps.find((app) => app.appName === name);

  if (appData === undefined) return <Fallback size={size} />;
  return <appData.component size={size} />;
};

export default ApplicationIcon;
