import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { portal } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -31,
    rotation: 339,
  },
  {
    top: 52,
    left: -5,
    rotation: 220,
  },
];

const Portal: FC<SvgIconProps> = ({ size }) => (
  <ApplicationIconBase size={size} iconData={portal} shapes={shapes} />
);

export default Portal;
