import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { fluxMaps } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -20,
    left: -17,
    rotation: 343,
  },
  {
    top: 46,
    left: 11,
    rotation: 193,
  },
];

export const FluxMaps = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase
      ref={ref}
      iconData={fluxMaps}
      shapes={shapes}
      {...props}
    />
  )
);
FluxMaps.displayName = 'FluxMaps';
