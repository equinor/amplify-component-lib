import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { portal } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types/AppIcon';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -31,
    rotation: 339,
  },
  {
    top: 52,
    left: -5,
    rotation: 220,
  },
];

const Portal = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} iconData={portal} shapes={shapes} {...props} />
));

Portal.displayName = 'Portal';

export default Portal;
