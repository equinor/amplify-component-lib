import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import Acquire from './Icons/Acquire';
import Bravos from './Icons/Bravos';
import Dasha from './Icons/Dasha';
import Fallback from './Icons/Fallback';
import FourDInsight from './Icons/FourDInsight';
import InPress from './Icons/InPress';
import LoggingQualification from './Icons/LoggingQualification';
import Orca from './Icons/Orca';
import Premo from './Icons/Premo';
import Pwex from './Icons/Pwex';
import Recap from './Icons/Recap';
import { Sam } from './Icons/Sam';
// Needs to be relative path for the type to be importable after build
import { AppIconProps } from './ApplicationIcon.types';
import JsEmbark from 'src/molecules/ApplicationIcon/Icons/JsEmbark';

export type ApplicationName =
  | 'acquire'
  | '4dinsight'
  | 'recap'
  | 'dasha'
  | 'orca'
  | 'portal'
  | 'jsembark'
  | 'logging-qualification'
  | 'pwex'
  | 'inpress'
  | 'bravos'
  | 'premo'
  | 'sam';

interface ApplicationIconData {
  appName: string[];
  component: ForwardRefExoticComponent<
    AppIconProps & RefAttributes<HTMLDivElement>
  >;
}
const apps: ApplicationIconData[] = [
  { appName: ['portal', 'embark', 'jsembark'], component: JsEmbark },
  { appName: ['acquire'], component: Acquire },
  { appName: ['4dinsight'], component: FourDInsight },
  { appName: ['dasha'], component: Dasha },
  { appName: ['orca'], component: Orca },
  {
    appName: ['logging-qualification', 'logging qualification', 'ltg'],
    component: LoggingQualification,
  },
  { appName: ['recap'], component: Recap },
  { appName: ['pwex'], component: Pwex },
  { appName: ['inpress'], component: InPress },
  { appName: ['bravos'], component: Bravos },
  { appName: ['premo'], component: Premo },
  { appName: ['sam'], component: Sam },
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
