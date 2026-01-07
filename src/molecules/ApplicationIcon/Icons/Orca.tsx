import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { orca } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -17,
    rotation: 328,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

export const Orca = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase iconData={orca} shapes={shapes} ref={ref} {...props} />
));

Orca.displayName = 'Orca';
