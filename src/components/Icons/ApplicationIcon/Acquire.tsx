import { FC } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { acquire } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -45,
    left: -5,
    rotation: 25,
  },
  {
    top: 60,
    left: -5,
    rotation: 5,
  },
];

const Acquire: FC<SvgIconProps> = ({ size }) => {
  return <ApplicationIconBase size={size} iconData={acquire} shapes={shapes} />;
};

export default Acquire;
