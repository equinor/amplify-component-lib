import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { dasha } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -25,
    left: -20,
    rotation: -5,
  },
  {
    top: 12,
    left: 45,
    rotation: -27,
  },
];

const Dasha: FC<SvgIconProps> = ({ size }) => (
  <ApplicationIconBase size={size} iconData={dasha} shapes={shapes} />
);

export default Dasha;
