import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { depthConversion } from './ApplicationIconCollection';

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

const DepthConversion: FC<SvgIconProps> = ({ size }) => (
  <ApplicationIconBase size={size} iconData={depthConversion} shapes={shapes} />
);

export default DepthConversion;
