import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { bravos } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

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

export const Bravos = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} iconData={bravos} shapes={shapes} {...props} />
));

Bravos.displayName = 'Bravos';
