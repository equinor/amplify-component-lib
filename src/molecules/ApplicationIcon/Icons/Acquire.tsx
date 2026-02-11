import { forwardRef } from 'react';

import { AppIconProps } from '../ApplicationIcon.types';
import { ApplicationIconBase, ShapeProps } from '../ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -40,
    left: -10,
    rotation: 13,
  },
  {
    top: 60,
    left: -8,
    rotation: 217,
  },
];

export const Acquire = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34 29.2696C34 26.9416 30.0264 26.7489 28.0419 26.7978C27.4513 26.8124 26.9412 26.3453 26.9412 25.7546L26.9412 22.0942M34 29.2696C34 32.3724 29.2941 31.9845 26.9412 31.9845L15 31.9845C14.4477 31.9845 14 31.5368 14 30.9845L14 19.0217C14 18.4694 14.4477 18.0217 15 18.0217L26.9412 18.0217M34 29.2696L34 24.5M34 29.2696C34 27.8612 34 26.1882 34 24.5M26.9412 22.0942L26.9412 20.0579M26.9412 22.0942L34 22.0942M26.9412 18.0217L26.9412 15.045C26.9412 14.4754 27.4141 14.0246 27.9804 14.0852C29.9431 14.2955 34 14.986 34 17.1028M26.9412 18.0217L34 18M26.9412 18.0217L26.9412 20.0579M34 17.1028C34 17.3762 34 17.6767 34 18M34 17.1028L34 18M34 17.1028L27 16M34 18L34 20M34 18C34 18.5982 34 19.2742 34 20M26.9412 20.0579L34 20M34 20C34 20.6635 34 21.3687 34 22.0942M34 20L34 22.0942M34 22.0942L34 24.5M34 22.0942C34 22.8814 34 23.6924 34 24.5M27 24.5L34 24.5"
          stroke="#F5F5F5"
          strokeWidth="3"
        />
      </svg>
    </ApplicationIconBase>
  )
);

Acquire.displayName = 'Acquire';
