import { FC } from 'react';

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

const LoggingQualification: FC<SvgIconProps> = ({ size }) => (
  <ApplicationIconBase
    size={size}
    iconData={loggingQualification}
    shapes={shapes}
  />
);

export default LoggingQualification;
