import { FC } from 'react';

import { SizeIconProps } from 'src/types/Icon';

const Fallback: FC<SizeIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="fallback-icon"
  >
    <mask
      id="default-mask0"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="48"
    >
      <rect
        x="48"
        y="48"
        width="48"
        height="48"
        rx="8"
        transform="rotate(180 48 48)"
        fill="#C4C4C4"
      />
    </mask>
    <g mask="url(#default-mask0)">
      <g filter="url(#default-filter0_dd)">
        <path
          d="M48.3459 59.0826C97.7925 44.1779 70.7513 19.787 51.0499 9.4546C27.6526 -5.32728 0.510316 13.519 -4.19076 32.72C-8.6307 50.8543 -1.10067 73.9874 48.3459 59.0826Z"
          fill="#004F55"
        />
      </g>
      <g filter="url(#default-filter1_dd)">
        <path
          d="M17.1362 22.8622C-12.5394 34.6576 20.243 55.338 42.5801 58.683C64.85 64.9856 60.4948 46.6556 58.3749 39.5181C58.2471 39.0877 58.1558 38.6531 58.0846 38.2098C56.428 27.8885 46.1815 11.3172 17.1362 22.8622Z"
          fill="#007079"
        />
      </g>
      <g filter="url(#default-filter2_dd)">
        <path
          d="M-8.234 7.92147C-12.8093 56.9569 38.565 24.2337 58.8047 -4.8994C83.3202 -32.347 54.2156 -37.7392 43.177 -39.2457C42.7246 -39.3075 42.3 -39.4032 41.8613 -39.5297C26.6227 -43.9228 -3.72362 -40.4183 -8.234 7.92147Z"
          fill="#007079"
        />
      </g>
      <path
        d="M12 24C12 27.1826 13.2643 30.2348 15.5147 32.4853C17.7652 34.7357 20.8174 36 24 36C27.1826 36 30.2348 34.7357 32.4853 32.4853C34.7357 30.2348 36 27.1826 36 24L32.4 24C32.4 26.2278 31.515 28.3644 29.9397 29.9397C28.3644 31.515 26.2278 32.4 24 32.4C21.7722 32.4 19.6356 31.515 18.0603 29.9397C16.485 28.3644 15.6 26.2278 15.6 24L12 24Z"
        fill="#F5F5F5"
      />
      <circle cx="16" cy="15" r="3" fill="#F5F5F5" />
      <circle cx="32" cy="15" r="3" fill="#F5F5F5" />
    </g>
    <defs>
      <filter
        id="default-filter0_dd"
        x="-21.0392"
        y="-14"
        width="107.968"
        height="109.097"
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
        id="default-filter1_dd"
        x="-3.00079"
        y="7"
        width="75.9992"
        height="65.263"
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
        id="default-filter2_dd"
        x="-33.0005"
        y="-62"
        width="113.766"
        height="113.001"
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

export default Fallback;
