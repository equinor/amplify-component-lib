import { FC, forwardRef } from 'react';

import { SvgIconProps } from '../index';
import Acquire from './Acquire';
import Bravos from './Bravos';
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
  | 'orca'
  | 'portal'
  | 'logging-qualification'
  | 'pwex'
  | 'inpress'
  | 'bravos';

interface IApplicationIconData {
  appName: string;
  component: FC<SvgIconProps>;
}
const apps: IApplicationIconData[] = [
  { appName: 'portal', component: Portal },
  { appName: 'acquire', component: Acquire },
  { appName: '4dinsight', component: FourDInsight },
  { appName: 'dasha', component: Dasha },
  { appName: 'orca', component: DepthConversion },
  { appName: 'logging-qualification', component: LoggingQualification },
  { appName: 'recap', component: Recap },
  { appName: 'pwex', component: Pwex },
  { appName: 'inpress', component: InPress },
  { appName: 'bravos', component: Bravos },
];

export interface ApplicationIconProps {
  name: ApplicationName | string;
  size?: 16 | 18 | 24 | 32 | 40 | 48;
}

const ApplicationIcon = forwardRef<HTMLDivElement, ApplicationIconProps>(
  ({ name, size = 48 }, ref) => {
    const appData = apps.find((app) => app.appName === name.toLowerCase());

    if (appData === undefined) return <Fallback size={size} ref={ref} />;
    return <appData.component size={size} />;
  }
);

ApplicationIcon.displayName = 'ApplicationIcon';

export default ApplicationIcon;
