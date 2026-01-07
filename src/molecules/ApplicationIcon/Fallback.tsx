import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import { nameToShapes } from 'src/molecules/ApplicationIcon/ApplicationIcon.utils';
import ApplicationIconBase from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';

interface FallbackProps extends AppIconProps {
  name: string;
}

export const Fallback = forwardRef<HTMLDivElement, FallbackProps>(
  (props, ref) => (
    <ApplicationIconBase
      ref={ref}
      shapes={nameToShapes(props.name)}
      {...props}
    />
  )
);

Fallback.displayName = 'Fallback';
