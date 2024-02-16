import { FC } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { pwex } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types/AppIcon';

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

const Pwex: FC<AppIconProps> = ({
  size,
  iconOnly = false,
  withHover = true,
}) => (
  <ApplicationIconBase
    size={size}
    iconData={pwex}
    iconOnly={iconOnly}
    withHover={withHover}
    shapes={shapes}
  />
);

export default Pwex;
