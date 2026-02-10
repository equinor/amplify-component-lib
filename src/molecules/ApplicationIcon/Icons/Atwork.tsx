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

export const AtWork = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.7021 10C29.6186 10.0001 30.3613 10.7427 30.3613 11.6592V12.7656H32.5742C35.0183 12.7656 37 14.7473 37 17.1914V34.3398C36.9999 36.7838 35.0183 38.7646 32.5742 38.7646H15.4258L15.1973 38.7588C12.8593 38.64 11.0001 36.7073 11 34.3398V17.1914C11 14.8239 12.8593 12.8903 15.1973 12.7715L15.4258 12.7656H17.6387V11.6592C17.6387 10.7426 18.3813 10 19.2979 10C20.2144 10 20.957 10.7426 20.957 11.6592V12.7656H27.042V11.6592C27.042 10.7426 27.7856 10 28.7021 10ZM14.3193 34.3398C14.3195 34.9508 14.8148 35.4463 15.4258 35.4463H32.5742C33.1852 35.4463 33.6805 34.9508 33.6807 34.3398V24.3828H14.3193V34.3398ZM15.4258 16.085C14.8148 16.085 14.3193 16.5804 14.3193 17.1914V21.0635H33.6807V17.1914C33.6807 16.5804 33.1852 16.085 32.5742 16.085H30.3613V17.7441C30.3613 18.6606 29.6186 19.4032 28.7021 19.4033C27.7856 19.4033 27.042 18.6607 27.042 17.7441V16.085H20.957V17.7441C20.957 18.6607 20.2144 19.4033 19.2979 19.4033C18.3813 19.4033 17.6387 18.6607 17.6387 17.7441V16.085H15.4258Z"
        fill="white"
      />
    </svg>
  </ApplicationIconBase>
));

AtWork.displayName = 'atWork';
