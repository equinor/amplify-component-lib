import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import {
  ApplicationIconBase,
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -25,
    left: -20,
    rotation: -18,
  },
  {
    top: 12,
    left: 36,
    rotation: -70,
  },
];

export const Dasha = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7273 29.2044L21.6364 33.0795V25.4027L15.7273 21.7561V29.2044ZM26.3636 25.4015V33.0795L32.2727 29.2044V21.7549L26.3636 25.4015ZM17.8959 17.3714L23.9988 21.1383L30.1018 17.3714L24 13.369L17.8959 17.3714ZM37 30.5638C37 31.4096 36.5828 32.1961 35.8955 32.6468L25.2591 39.6216C24.4895 40.1261 23.5105 40.1261 22.7409 39.6216L12.1045 32.6468C11.4172 32.1961 11 31.4096 11 30.5638V17.4363C11 16.5905 11.4172 15.804 12.1045 15.3534L22.7409 8.37855L22.8874 8.28961C23.632 7.87573 24.5377 7.90553 25.2591 8.37855L35.8955 15.3534C36.5828 15.804 37 16.5905 37 17.4363V30.5638Z"
        fill="#F5F5F5"
      />
    </svg>
  </ApplicationIconBase>
));

Dasha.displayName = 'Dasha';
