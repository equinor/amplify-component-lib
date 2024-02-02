import { FC } from 'react';

import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { acquire } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -45,
    left: -5,
    rotation: 25,
  },
  {
    top: 64,
    left: -5,
    rotation: 5,
  },
];

const Acquire: FC<AppIconProps> = ({ size, iconOnly, withHover }) => {
  return (
    <ApplicationIconBase
      size={size}
      iconData={acquire}
      iconOnly={iconOnly}
      withHover={withHover}
      shapes={shapes}
    />
  );
};

export default Acquire;
