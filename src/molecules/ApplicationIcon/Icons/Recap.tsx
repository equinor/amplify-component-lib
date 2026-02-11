import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import {
  ApplicationIconBase,
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';

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

export const Recap = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 24L21.3333 30L32 18"
        stroke="#F5F5F5"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </ApplicationIconBase>
));

Recap.displayName = 'Recap';
