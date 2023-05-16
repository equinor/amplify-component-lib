import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { pwex } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -18,
    left: -17,
    rotation: 343,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

const Pwex: FC<SvgIconProps> = ({ size }) => (
  <ApplicationIconBase size={size} iconData={pwex} shapes={shapes} />
);

export default Pwex;
