import { FC } from 'react';

import WaveShapeWithNoise from './WaveShapeWithNoise';

import styled, { keyframes } from 'styled-components';

export interface VisualWavesProps {
  waveIntervalDist?: number;
  waveDelay?: number;
  numWaves?: number;
  heightFromBottom?: number;
}

const Waves = styled.div`
  --topGradientColor: #77d9dd;
  --bottomGradientColor: #407577;

  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
  position: relative;
  background: linear-gradient(
    180deg,
    var(--bottomGradientColor) 0%,
    var(--topGradientColor) 100%
  );
  > svg {
    position: absolute;
    filter: grayscale(1);
    mix-blend-mode: color-burn;
    z-index: 0;
  }
`;

const WaveInnerContainer = styled.div<VisualWavesProps>`
  --heightFromBottom: ${({ heightFromBottom }) => `${heightFromBottom}px`};
  bottom: var(--heightFromBottom);
  width: 100%;
  --rotate3d: rotateX(330deg) rotateY(-15deg) scaleX(1.2);
  position: absolute;
`;

const waveWobble = keyframes`
    0% {
      transform: var(--rotate3d) translateY(-2px) rotateX(0) scaleY(1);
    }
    50% {
      transform: var(--rotate3d) translateY(5px) rotateX(60deg) scaleY(0.8);
    }
    100% {
      transform: var(--rotate3d) translateY(-2px) rotateX(0) scaleY(1);
    }
`;

const Wave = styled.div<VisualWavesProps>`
  position: absolute;
  height: 100%;
  min-height: 1000px;
  width: 100%;
  top: ${({ waveIntervalDist }) => `${waveIntervalDist}rem`};
  transform-origin: top;
  transform: var(--rotate3d) translateY(-2px) scaleY(1);
  filter: grayscale(1);
  mix-blend-mode: overlay;

  animation: ${waveWobble} 5.5s infinite ease alternate;
`;

const NoiseSvg: FC = () => (
  <svg viewBox="0 0 1500 1500" xmlns="http://www.w3.org/2000/svg">
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

const VisualWaves: FC<VisualWavesProps> = ({
  waveIntervalDist = 3,
  waveDelay = 0.75,
  numWaves = 10,
  heightFromBottom = 600,
}) => {
  const waves = Array.from({ length: numWaves }, (_, index) => {
    const top = index * waveIntervalDist;
    const altWave = index % 2 === 0;
    const delay = index * waveDelay;

    return {
      waveIntervalDist: top,
      delay,
      altWave,
    };
  });

  return (
    <Waves>
      <NoiseSvg />
      <WaveInnerContainer heightFromBottom={heightFromBottom}>
        {waves.map((wave, index) => (
          <Wave
            key={index}
            waveIntervalDist={wave.waveIntervalDist}
            style={{
              animationDelay: `${wave.delay}s`,
            }}
          >
            <WaveShapeWithNoise index={index} isAltWave={wave.altWave} />
          </Wave>
        ))}
      </WaveInnerContainer>
    </Waves>
  );
};

export default VisualWaves;
