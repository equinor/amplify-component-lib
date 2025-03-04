import { FC } from 'react';

import { Container } from './Waves.styles';
import { WaveStatic } from './WaveStatic';

export interface WaveProps {
  gradientColors?: string[];
}

export const Waves: FC<WaveProps> = ({ gradientColors }) => (
  <Container>
    <WaveStatic gradientColors={gradientColors} />
  </Container>
);
