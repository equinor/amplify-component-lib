import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { loggingQualification } from './ApplicationIconCollection';
import { AppIconProps } from 'src/atoms/types';

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
  (props, ref) => (
    <ApplicationIconBase
      ref={ref}
      iconData={loggingQualification}
      shapes={shapes}
      {...props}
    />
  )
);

LoggingQualification.displayName = 'LoggingQualification';

export default LoggingQualification;
