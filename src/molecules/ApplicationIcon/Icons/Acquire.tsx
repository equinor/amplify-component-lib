import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { acquire } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

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

export const Acquire = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase
      ref={ref}
      iconData={acquire}
      shapes={shapes}
      {...props}
    />
  )
);

Acquire.displayName = 'Acquire';
