import { forwardRef } from 'react';

import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { loggingQualification } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -17,
    rotation: 343,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

const LoggingQualification = forwardRef<HTMLDivElement, AppIconProps>(
  ({ size, iconOnly = false, withHover = true }, ref) => (
    <ApplicationIconBase
      ref={ref}
      size={size}
      iconData={loggingQualification}
      iconOnly={iconOnly}
      withHover={withHover}
      shapes={shapes}
    />
  )
);

LoggingQualification.displayName = 'LoggingQualification';

export default LoggingQualification;
