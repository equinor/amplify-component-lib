import React, { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import styled, { keyframes } from 'styled-components';

const { colors } = tokens;

const animateCheckmark = keyframes`
  from {
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
  }
  to {
    stroke-dasharray: 130;
    stroke-dashoffset: 260;
  }
`;

interface ContainerProps {
  $isApplication?: boolean;
}

const Container = styled.div<ContainerProps>`
  height: fit-content;
  width: fit-content;

  svg {
    width: ${({ $isApplication }) =>
      $isApplication ? '84px' : 'calc(24px * 6)'};
    height: ${({ $isApplication }) =>
      $isApplication ? '84px' : 'calc(24px * 6)'};
  }
  path {
    fill: transparent;
    stroke-width: 2;
    stroke: ${colors.interactive.primary__resting.rgba};
    animation: ${animateCheckmark} 1.5s;
  }
`;
interface AnimatedCheckmarkProps {
  portal?: boolean;
}

export const AnimatedCheckmark: FC<AnimatedCheckmarkProps> = ({ portal }) => (
  <Container $isApplication={portal}>
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="svg-icon"
    >
      <path d="M12 22L18 28L30 16M42 21.5C42 32.8218 32.8218 42 21.5 42C10.1782 42 1 32.8218 1 21.5C1 10.1782 10.1782 1 21.5 1C32.8218 1 42 10.1782 42 21.5Z" />
    </svg>
  </Container>
);
