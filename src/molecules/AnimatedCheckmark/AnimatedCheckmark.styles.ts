import { tokens } from '@equinor/eds-tokens';

import { AnimatedCheckmarkProps } from './AnimatedCheckmark';
import { sizeToPx } from './AnimatedCheckmark.utils';

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
  $size: AnimatedCheckmarkProps['size'];
}

export const Container = styled.svg<ContainerProps>`
  width: ${({ $size }) => sizeToPx($size)};
  height: ${({ $size }) => sizeToPx($size)};
  > path {
    fill: transparent;
    stroke-width: 2;
    stroke: ${colors.interactive.primary__resting.rgba};
    animation: ${animateCheckmark} 1.5s;
  }
`;
