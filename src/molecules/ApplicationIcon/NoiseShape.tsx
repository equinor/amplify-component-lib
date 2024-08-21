import { FC } from 'react';

import {
  LARGE_WAVES_PATH_DATA,
  SMALL_WAVES_PATH_DATA,
} from './ApplicationIcon.constants';

export interface WaveShapeWithNoiseProps {
  index?: number;
  isAltWave?: boolean;
  hasLargeWaves?: boolean;
}

export const NoiseShape: FC<WaveShapeWithNoiseProps> = ({
  index,
  isAltWave,
  hasLargeWaves,
}) => {
  return (
    <svg
      className={'noiseShape'}
      width="100%"
      height="100%"
      viewBox="0 0 725 725"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="appNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.75}
            numOctaves={3}
            stitchTiles="stitch"
          />

          <feColorMatrix
            type="matrix"
            values="
            0 0 0 2 0
            0 0 0 2 0
            0 0 0 2 0
            0 0 0 10 0"
          />
        </filter>
        <mask
          id={'appNoiseMask' + index}
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          {!isAltWave ? (
            <path
              d={
                hasLargeWaves
                  ? LARGE_WAVES_PATH_DATA[0]
                  : SMALL_WAVES_PATH_DATA[0]
              }
              fill="white"
            />
          ) : (
            <path
              d={
                hasLargeWaves
                  ? LARGE_WAVES_PATH_DATA[1]
                  : SMALL_WAVES_PATH_DATA[1]
              }
              fill="white"
            />
          )}
        </mask>
      </defs>
      <g>
        <rect
          width="100%"
          height="100%"
          filter="url(#appNoiseFilter)"
          mask={'url(#appNoiseMask' + index + ')'}
        />
      </g>
    </svg>
  );
};
