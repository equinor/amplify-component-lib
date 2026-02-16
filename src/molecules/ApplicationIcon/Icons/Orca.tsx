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

export const Orca = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.0162 26.6358C33.4988 26.2606 34.1746 26.2611 34.6569 26.6367C35.3437 27.1718 35.3433 28.2107 34.6559 28.7451L25.235 36.0694C24.5127 36.6308 23.5012 36.6308 22.7789 36.0694L13.3483 28.7383C12.6657 28.2073 12.6656 27.1746 13.3483 26.6436C13.8271 26.2713 14.4983 26.2714 14.9772 26.6436L23.9928 33.6514L33.0162 26.6358ZM23.1813 11.9258C23.6628 11.5513 24.3373 11.5515 24.819 11.9258L34.6442 19.5674C35.3314 20.1022 35.3298 21.1416 34.6412 21.6748L33.8141 22.3155L24.819 29.3184C24.3375 29.6929 23.663 29.6937 23.1813 29.3194L14.1735 22.3155L13.3522 21.6758C12.6665 21.1416 12.6671 20.1041 13.3531 19.5703L23.1813 11.9258ZM21.4069 24.5655L23.9996 26.585L26.8776 24.3428L24.11 22.3135L21.4069 24.5655ZM16.3463 20.625L19.2535 22.8887L21.8942 20.6885L18.9938 18.5625L16.3463 20.625ZM26.2203 20.5547L29.0641 22.6407L31.653 20.625L28.8014 18.4043L26.2203 20.5547ZM21.1803 16.8594L24.0045 18.9297L26.6481 16.7266L23.9996 14.6651L21.1803 16.8594Z"
        fill="#F5F5F5"
      />
    </svg>
  </ApplicationIconBase>
));

Orca.displayName = 'Orca';
