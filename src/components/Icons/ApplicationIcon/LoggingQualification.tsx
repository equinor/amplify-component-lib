import { forwardRef } from 'react';

import { SvgIconProps } from '../index';
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

const LoggingQualification = forwardRef<HTMLDivElement, SvgIconProps>(
  ({ size }, ref) => (
    <ApplicationIconBase
      ref={ref}
      size={size}
      iconData={loggingQualification}
      shapes={shapes}
    />
  )
);

LoggingQualification.displayName = 'LoggingQualification';

export default LoggingQualification;
