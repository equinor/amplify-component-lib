import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import {
  ApplicationIconBase,
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -22,
    left: -17,
    rotation: 0,
  },
  {
    top: 40,
    left: 11,
    rotation: 200,
  },
];

export const JsEmbark = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="23.6667" cy="24.3333" r="3.33333" fill="#F5F5F5" />
        <circle cx="17.6667" cy="34.3333" r="3.33333" fill="#F5F5F5" />
        <circle cx="12.3333" cy="24.3333" r="3.33333" fill="#F5F5F5" />
        <circle cx="35.0001" cy="24.3333" r="3.33333" fill="#F5F5F5" />
        <circle cx="29.0001" cy="34.3333" r="3.33333" fill="#F5F5F5" />
        <circle cx="29.0001" cy="14.3333" r="3.33333" fill="#F5F5F5" />
        <circle cx="17.6667" cy="14.3333" r="3.33333" fill="#F5F5F5" />
      </svg>
    </ApplicationIconBase>
  )
);

JsEmbark.displayName = 'JsEmbark';
