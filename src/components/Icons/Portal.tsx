import { FC } from 'react';
import { ISvgIconProps } from '.';

const Portal: FC<ISvgIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="portal-mask0"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="48"
    >
      <rect width="48" height="48" rx="8" fill="#C4C4C4" />
    </mask>
    <g mask="url(#portal-mask0)">
      <path
        d="M-2.89582 25.1391C-25.9899 65.1393 16.8694 53.7046 41.1858 42.9873C71.7317 31.3191 64.7872 16.1547 57.1035 9.61188C56.7716 9.32926 56.4615 9.03855 56.1636 8.7203C45.6597 -2.5006 19.8755 -14.302 -2.89582 25.1391Z"
        fill="#004F55"
      />
      <g filter="url(#portal-filter0_dd)">
        <path
          d="M40.3198 56.9535C68.244 40.8314 30.6801 25.2833 12.2382 23.275C-10.1177 19.6967 -4.15859 38.1389 -1.45047 45.2154C-1.29466 45.6226 -1.17365 46.0342 -1.07114 46.458C1.45802 56.912 12.9547 72.7527 40.3198 56.9535Z"
          fill="#007079"
        />
      </g>
      <g filter="url(#portal-filter1_dd)">
        <path
          d="M-5.14701 19.3673C-13.4924 50.5127 13.3422 35.0582 27.8026 23.4378C46.6944 9.75929 43.9767 -7.8543 32.5994 -11.6779C21.8542 -15.2891 3.19836 -11.7781 -5.14701 19.3673Z"
          fill="#007079"
        />
      </g>
      <path
        d="M17.2803 19.4431L30.1086 12.1093C30.653 11.7984 31.3328 12.1878 31.3333 12.8114L31.333 27.5024C31.3336 27.9377 31.1138 28.3398 30.7339 28.5573L17.9053 35.8905C17.3611 36.2018 16.6672 35.8123 16.6667 35.1888V20.4978C16.6661 20.0625 16.9003 19.6603 17.2803 19.4431Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="portal-filter0_dd"
        x="-14.9994"
        y="17.0001"
        width="72.6091"
        height="60.8741"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="portal-filter1_dd"
        x="-24.0004"
        y="-22.0001"
        width="78.0499"
        height="70.8236"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Portal;
