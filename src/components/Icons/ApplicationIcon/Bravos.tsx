import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { bravos } from './ApplicationIconCollection';

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

const Bravos: FC<SvgIconProps> = ({ size }) => {
  return <ApplicationIconBase size={size} iconData={bravos} shapes={shapes} />;
};

export default Bravos;
