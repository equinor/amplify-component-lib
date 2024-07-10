import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { orca } from './ApplicationIconCollection';
import { AppIconProps } from 'src/atoms/types';

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

const Orca = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase iconData={orca} shapes={shapes} ref={ref} {...props} />
));

Orca.displayName = 'Orca';

export default Orca;
