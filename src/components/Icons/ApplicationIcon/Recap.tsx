import { FC } from 'react';

import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { recap } from './ApplicationIconCollection';

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

const Recap: FC<AppIconProps> = ({ size, iconOnly }) => (
  <ApplicationIconBase
    size={size}
    iconData={recap}
    iconOnly={iconOnly}
    shapes={shapes}
  />
);

export default Recap;
