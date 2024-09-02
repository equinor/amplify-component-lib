import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';
import { inPress } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';
const shapes: ShapeProps[] = [
  {
    top: -31,
    left: -17,
    rotation: 343,
  },
  {
    top: 42,
    left: 32,
    rotation: 182,
  },
];

const InPress = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase
    ref={ref}
    iconData={inPress}
    shapes={shapes}
    {...props}
  />
));

InPress.displayName = 'InPress';

export default InPress;
