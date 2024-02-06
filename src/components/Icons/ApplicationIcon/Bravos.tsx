import { FC } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { bravos } from './ApplicationIconCollection';
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
