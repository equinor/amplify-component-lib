import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { acquire } from './ApplicationIconCollection';
import { AppIconProps } from 'src/atoms/types';

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

const Acquire = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase
    ref={ref}
    iconData={acquire}
    shapes={shapes}
    {...props}
  />
));

Acquire.displayName = 'Acquire';

export default Acquire;
