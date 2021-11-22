import React from "react";
import { ISvgIconProps } from ".";

const DataSharing: React.FC<ISvgIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="data-sharing-mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <rect width="48" height="48" rx="8" fill="#C4C4C4" />
    </mask>
    <g mask="url(#data-sharing-mask0)">
      <path
        d="M-2.18548 30.3775C-25.2796 70.3777 17.5797 58.943 41.8961 48.2257C72.442 36.5575 65.4976 21.3931 57.8138 14.8503C57.4819 14.5677 57.1719 14.277 56.8739 13.9587C46.37 2.7378 20.5859 -9.06359 -2.18548 30.3775Z"
        fill="#004F55"
      />
      <g filter="url(#data-sharing-filter0_dd)">
        <path
          d="M41.5269 56.3417C68.8967 73.3878 64.9297 32.9273 58.0193 15.7114C50.6516 -5.6966 37.1864 8.24302 32.2181 13.9638C31.9322 14.2929 31.626 14.5935 31.3004 14.8834C23.268 22.0363 14.705 39.6368 41.5269 56.3417Z"
          fill="#007079"
        />
      </g>
      <g filter="url(#data-sharing-filter1_dd)">
        <path
          d="M-19.9197 7.88152C-44.0705 31.8612 -12.6088 35.302 -2.0499 33.1231C-1.67304 33.0454 -1.31353 32.9837 -0.930958 32.9424C19.7675 30.7103 47.9148 12.7262 50.3026 0.762597C50.5841 -0.647805 50.0358 -2.07611 48.9597 -3.0303C39.0221 -11.8421 3.29925 -15.173 -19.9197 7.88152Z"
          fill="#007079"
        />
      </g>
      <path
        d="M15 19.1667L24 14L33 19.1667M15 19.1667V29.8333L19 32L24 34.5M15 19.1667L19 21.5L24 24.5M24 34.5V24.5M24 34.5L29 32L33 29.8333V19.1667M33 19.1667L29 21.5L24 24.5"
        stroke="#F5F5F5"
        strokeWidth="3"
      />
      <path
        d="M33 29.3333L24 34.5L15 29.3333L15 18.6667L19 16.5L24 14L29 16.5L33 18.6667L33 29.3333Z"
        stroke="#F5F5F5"
        strokeWidth="3"
      />
    </g>
    <defs>
      <filter
        id="data-sharing-filter0_dd"
        x="14"
        y="0"
        width="58.353"
        height="72.8179"
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
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
      </filter>
      <filter
        id="data-sharing-filter1_dd"
        x="-33.3372"
        y="-14.4091"
        width="88.1504"
        height="58.0575"
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
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default DataSharing;
