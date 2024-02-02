import { FC } from 'react';

import { AppIconProps } from '../index';
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

const Bravos: FC<AppIconProps> = ({
  size,
  iconOnly = false,
  withHover = true,
}) => {
  return (
    <ApplicationIconBase
      size={size}
      iconData={bravos}
      iconOnly={iconOnly}
      withHover={withHover}
      shapes={shapes}
    />
  );
};

export default Bravos;
