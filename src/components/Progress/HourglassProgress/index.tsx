import {
  CircularProgressProps,
  Icon,
  IconProps,
} from '@equinor/eds-core-react';
import { hourglass_empty, hourglass_full } from '@equinor/eds-icons';
import styled, { keyframes } from 'styled-components';

import { forwardRef } from 'react';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

const rotateContainer = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

type ContainerProps = {
  seconds: number;
};

const Container = styled.div<ContainerProps>`
  position: relative;
  animation: ${rotateContainer} ${(props) => props.seconds}s infinite;
`;

const outlineAnimation = keyframes`
  0% { 
    mask-position: 50% 29%;
  }
  25% {
    mask-position: 50% 11%;
  }
  50% {
    mask-position: 50% 11%;
  }
  75% {
    mask-position: 50% 29%;
  }
  100% {
    mask-position: 50% 29%;
  }
`;

interface WrapperProps {
  size: number;
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

type EmptyProps = IconProps & ContainerProps;

const Empty = styled(Icon)<EmptyProps>`
  mask-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 64%,
    rgba(255, 255, 255, 1) 65%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0) 76%,
    rgba(255, 255, 255, 0) 100%
  );
  mask-size: 100% 300%;
  animation: ${outlineAnimation} ${(props) => props.seconds}s infinite;
`;

export interface HourglassProgressProps {
  color?: CircularProgressProps['color'] | 'secondary';
  size?: CircularProgressProps['size'];
  speed?: 'slow' | 'normal' | 'fast';
}

const HourglassProgress = forwardRef<HTMLDivElement, HourglassProgressProps>(
  ({ color, size = 32, speed = 'normal' }, ref) => {
    const iconColor = (): string => {
      if (color === 'primary') {
        return colors.interactive.primary__resting.hex;
      } else if (color === 'secondary') {
        return colors.interactive.secondary__resting.hex;
      }
      return colors.ui.background__medium.hex;
    };

    const secondsAnimation = (): number => {
      switch (speed) {
        case 'slow':
          return 8;
        case 'normal':
          return 6;
        case 'fast':
          return 3;
      }
    };

    return (
      <Container ref={ref} seconds={secondsAnimation()}>
        <Wrapper size={size}>
          <Icon data={hourglass_empty} size={size} color={iconColor()} />
        </Wrapper>
        <Wrapper size={size}>
          <Empty
            data={hourglass_full}
            size={size}
            color={iconColor()}
            seconds={secondsAnimation()}
          />
        </Wrapper>
      </Container>
    );
  }
);

HourglassProgress.displayName = 'HourglassProgress';

export default HourglassProgress;
