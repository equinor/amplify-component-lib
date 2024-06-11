import { FC } from 'react';

interface WaveShapeWithNoiseProps {
  index?: number;
  isAltWave?: boolean;
}

const WaveShapeWithNoise: FC<WaveShapeWithNoiseProps> = ({
  index,
  isAltWave,
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100% 100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.5}
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <linearGradient id="gradient" x1="0" y1="100%" x2="0" y2="0%">
          <stop offset="0%" stopColor="black" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>

        <pattern
          id={'wavePattern' + index}
          x="0"
          y="0"
          width="117px"
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {!isAltWave ? (
            <path
              d="M58.5 0C33.952 0 28.4498 23 0 23V834.5H117V23C88.5502 23 83.048 0 58.5 0Z"
              fill="url(#gradient)"
            />
          ) : (
            <path
              d="M0 0C24.548 0 30.0502 23 58.5 23C86.9498 23 92.452 0 117 0V834.5H0V0Z"
              fill="url(#gradient)"
            />
          )}
        </pattern>

        <mask id={'waveMask' + index} x="0" y="0" width="100%" height="1">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={'url(#wavePattern' + index + ')'}
          />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        filter="url(#noiseFilter)"
        mask={'url(#waveMask' + index + ')'}
      />
    </svg>
  );
};

export default WaveShapeWithNoise;
