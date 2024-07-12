import { forwardRef } from 'react';

import { ApplicationIconBase, ShapeProps } from './ApplicationIconBase';
import { premo } from './ApplicationIconCollection';
import { AppIconProps } from 'src/atoms/types';

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

export const Premo = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => {
  return (
    <ApplicationIconBase
      ref={ref}
      iconData={premo}
      shapes={shapes}
      {...props}
    />
  );
});

Premo.displayName = 'Premo';
