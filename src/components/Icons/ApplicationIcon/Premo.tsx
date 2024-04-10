import { FC } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { premo } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types/AppIcon';

const shapes: ShapeProps[] = [
  {
    top: -25,
    left: -5,
    rotation: 25,
  },
  {
    top: 45,
    left: -11,
    rotation: 15,
  },
];

const Premo: FC<AppIconProps> = ({
  size,
  iconOnly = false,
  withHover = true,
}) => {
  return (
    <ApplicationIconBase
      size={size}
      iconData={premo}
      iconOnly={iconOnly}
      withHover={withHover}
      shapes={shapes}
    />
  );
};

export default Premo;
