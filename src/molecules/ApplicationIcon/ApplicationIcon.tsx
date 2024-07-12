import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Acquire } from './Acquire';
import { Bravos } from './Bravos';
import { Dasha } from './Dasha';
import { Fallback } from './Fallback';
import { FourDInsight } from './FourDInsight';
import { InPress } from './InPress';
import { LoggingQualification } from './LoggingQualification';
import { Orca } from './Orca';
import { Portal } from './Portal';
import { Premo } from './Premo';
import { Pwex } from './Pwex';
import { Recap } from './Recap';
// Needs to be relative path for the type to be importable after build
import { AppIconProps } from 'src/atoms/types';

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
  | 'bravos'
  | 'premo';

interface ApplicationIconData {
  appName: string[];
  component: ForwardRefExoticComponent<
    AppIconProps & RefAttributes<HTMLDivElement>
  >;
}
const apps: ApplicationIconData[] = [
  { appName: ['portal'], component: Portal },
  { appName: ['acquire'], component: Acquire },
  { appName: ['4dinsight'], component: FourDInsight },
  { appName: ['dasha'], component: Dasha },
  { appName: ['orca'], component: Orca },
  {
    appName: ['logging-qualification', 'logging qualification'],
    component: LoggingQualification,
  },
  { appName: ['recap'], component: Recap },
  { appName: ['pwex'], component: Pwex },
  { appName: ['inpress'], component: InPress },
  { appName: ['bravos'], component: Bravos },
  { appName: ['premo'], component: Premo },
];

export interface ApplicationIconProps extends Partial<AppIconProps> {
  name: ApplicationName | string;
}

export const ApplicationIcon = forwardRef<HTMLDivElement, ApplicationIconProps>(
  (
    { name, size = 48, iconOnly = false, withHover = false, grayScale = false },
    ref
  ) => {
    const appData = apps.find((app) =>
      app.appName.includes(name.toLowerCase())
    );

    if (appData === undefined)
      return (
        <Fallback
          size={size}
          ref={ref}
          iconOnly={iconOnly}
          withHover={withHover}
          grayScale={grayScale}
        />
      );
    return (
      <appData.component
        size={size}
        ref={ref}
        iconOnly={iconOnly}
        withHover={withHover}
        grayScale={grayScale}
      />
    );
  }
);

ApplicationIcon.displayName = 'ApplicationIcon';
