import { FC } from 'react';

import noiseImage from './noise2.png';

export const NoiseSvg: FC = () => (
  <svg viewBox="0 0 1500 1500" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={1.5}
        numOctaves={3}
        stitchTiles="stitch"
      />
    </filter>

    <pattern
      id="noisePattern"
      patternUnits="userSpaceOnUse"
      width="100"
      height="100"
    >
      <image
        href={noiseImage} /* Replace this with your noise image URL or path */
        x="0"
        y="0"
        width="100"
        height="100"
        preserveAspectRatio="none"
      />
    </pattern>
    <rect width="100%" height="100%" fill="url(#noisePattern)" />
  </svg>
);
