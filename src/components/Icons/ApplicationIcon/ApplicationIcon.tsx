import { FC, forwardRef } from 'react';

import { AppIconProps } from '../index';
import Acquire from './Acquire';
import Bravos from './Bravos';
import Dasha from './Dasha';
import Fallback from './Fallback';
import FourDInsight from './FourDInsight';
import InPress from './InPress';
import LoggingQualification from './LoggingQualification';
import Orca from './Orca';
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

type ApplicationIconData = {
  appName: string;
  component: FC<AppIconProps>;
};
const apps: ApplicationIconData[] = [
  { appName: 'portal', component: Portal },
  { appName: 'acquire', component: Acquire },
  { appName: '4dinsight', component: FourDInsight },
  { appName: 'dasha', component: Dasha },
  { appName: 'orca', component: Orca },
  { appName: 'logging-qualification', component: LoggingQualification },
  { appName: 'recap', component: Recap },
  { appName: 'pwex', component: Pwex },
  { appName: 'inpress', component: InPress },
  { appName: 'bravos', component: Bravos },
];

export interface ApplicationIconProps {
  name: ApplicationName | string;
  size?: 16 | 18 | 24 | 32 | 40 | 48 | number;
  iconOnly?: boolean;
  withHover?: boolean;
}

const ApplicationIcon = forwardRef<HTMLDivElement, ApplicationIconProps>(
  ({ name, size = 48, iconOnly = false, withHover = false }, ref) => {
    const appData = apps.find((app) => app.appName === name.toLowerCase());

    if (appData === undefined)
      return (
        <Fallback
          size={size}
          ref={ref}
          iconOnly={iconOnly}
          withHover={withHover}
        />
      );
    return (
      <appData.component
        size={size}
        iconOnly={iconOnly}
        withHover={withHover}
      />
    );
  }
);

ApplicationIcon.displayName = 'ApplicationIcon';

export default ApplicationIcon;
