import { FC } from 'react';

import { NoiseSvg } from './NoiseSvg';
import { Container, Wave, WaveInnerContainer } from './Waves.styles';
import { WaveShapeWithNoise } from './WaveShapeWithNoise';

export interface WavesProps {
  waveIntervalDist?: number;
  waveDelay?: number;
  numWaves?: number;
  heightFromBottom?: number;
}

export const Waves: FC<WavesProps> = ({
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
    <Container>
      <NoiseSvg />
      <WaveInnerContainer $heightFromBottom={heightFromBottom}>
        {waves.map((wave, index) => (
          <Wave
            key={index}
            $waveIntervalDist={wave.waveIntervalDist}
            style={{
              animationDelay: `${wave.delay}s`,
            }}
          >
            <WaveShapeWithNoise index={index} isAltWave={wave.altWave} />
          </Wave>
        ))}
      </WaveInnerContainer>
    </Container>
  );
};
