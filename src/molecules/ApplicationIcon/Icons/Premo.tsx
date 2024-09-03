import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';
import { premo } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

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

const Premo = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => {
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

export default Premo;
