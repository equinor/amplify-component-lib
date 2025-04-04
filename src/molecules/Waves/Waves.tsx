import { FC } from 'react';

import { Container } from './Waves.styles';
import { WaveStatic } from './WaveStatic';

export interface WavesProps {
  gradientColors?: string[];
}

export const Waves: FC<WavesProps> = ({ gradientColors }) => (
  <Container>
    <WaveStatic gradientColors={gradientColors} />
  </Container>
);
