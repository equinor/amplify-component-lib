import React, { FC } from 'react';

import { Container } from './AnimatedCheckmark.styles';

export interface AnimatedCheckmarkProps {
  size?: 'small' | 'medium';
}

export const AnimatedCheckmark: FC<AnimatedCheckmarkProps> = ({ size }) => (
  <Container
    $size={size}
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="svg-icon"
  >
    <path d="M12 22L18 28L30 16M42 21.5C42 32.8218 32.8218 42 21.5 42C10.1782 42 1 32.8218 1 21.5C1 10.1782 10.1782 1 21.5 1C32.8218 1 42 10.1782 42 21.5Z" />
  </Container>
);
