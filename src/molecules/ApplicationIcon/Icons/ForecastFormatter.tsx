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

export const ForecastFormatter = forwardRef<HTMLDivElement, AppIconProps>(
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
          d="M10 35.8696V11.8261C10 10.8176 10.8176 10.0001 11.8261 10.0001C12.8346 10.0001 13.6522 10.8176 13.6522 11.8261V35.8696C13.6522 36.8782 12.8346 37.6957 11.8261 37.6957C10.8176 37.6957 10 36.8782 10 35.8696Z"
          fill="white"
        />
        <path
          d="M38 11.8261L38 35.8696C38 36.8781 37.1824 37.6957 36.1739 37.6957C35.1654 37.6957 34.3478 36.8781 34.3478 35.8696L34.3478 11.8261C34.3478 10.8176 35.1654 10 36.1739 10C37.1824 10 38 10.8176 38 11.8261Z"
          fill="white"
        />
        <path
          d="M19.739 25.2175C19.739 26.226 18.9214 27.0436 17.9129 27.0436C16.9044 27.0436 16.0868 26.226 16.0868 25.2175L16.0868 11.8261C16.0868 10.8176 16.9044 10.0001 17.9129 10.0001C18.9214 10.0001 19.739 10.8176 19.739 11.8261L19.739 25.2175Z"
          fill="white"
        />
        <path
          d="M28.2609 22.4783C28.2609 21.4698 29.0784 20.6522 30.087 20.6522C31.0955 20.6522 31.913 21.4698 31.913 22.4783L31.913 35.8696C31.913 36.8781 31.0955 37.6957 30.087 37.6957C29.0784 37.6957 28.2609 36.8781 28.2609 35.8696L28.2609 22.4783Z"
          fill="white"
        />
        <path
          d="M25.826 12.7392C25.826 13.7477 25.0085 14.5653 24 14.5653C22.9914 14.5653 22.1739 13.7477 22.1739 12.7392L22.1739 11.8261C22.1739 10.8176 22.9914 10.0001 24 10.0001C25.0085 10.0001 25.826 10.8176 25.826 11.8261L25.826 12.7392Z"
          fill="white"
        />
        <path
          d="M22.174 34.9565C22.174 33.948 22.9915 33.1305 24 33.1305C25.0086 33.1305 25.8261 33.948 25.8261 34.9565L25.8261 35.8696C25.8261 36.8781 25.0086 37.6957 24 37.6957C22.9915 37.6957 22.174 36.8781 22.174 35.8696L22.174 34.9565Z"
          fill="white"
        />
      </svg>
    </ApplicationIconBase>
  )
);

ForecastFormatter.displayName = 'ForecastFormatter';
