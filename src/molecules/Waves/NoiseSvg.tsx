import { FC } from 'react';

interface NoiseSvgProps {
  viewBox: string;
}

export const NoiseSvg: FC<NoiseSvgProps> = ({ viewBox }) => (
  <svg
    width="100%"
    height="100%"
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={1.5}
        numOctaves={3}
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);
