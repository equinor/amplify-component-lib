import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { fallback } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -17,
    rotation: 355,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

const Fallback: FC<SvgIconProps> = ({ size }) => (
  <ApplicationIconBase size={size} iconData={fallback} shapes={shapes} />
);

export default Fallback;
