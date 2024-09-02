import { AnimationState } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew.types';
import {
  AllowedColors,
  colorMap,
  darkenColor,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew.utils';

import styled, { css, keyframes } from 'styled-components';

const outlinePulsate = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
`;

const waveWobble = keyframes`
  0% {
    transform: scaleY(1) rotateZ(0deg);
  }
  50% {
    transform: scaleY(0.95) rotateZ(-1deg);
  }
  100% {
    transform: scaleY(1) rotateZ(0deg);
  }
`;

interface AppIconContainerProps {
  $size: number;
  $color: AllowedColors;
  $animationState: AnimationState;
  $iconOnly: boolean;
}

export const AppIconContainer = styled.div<AppIconContainerProps>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-sizing: content-box;
  transition: border-radius 350ms ease;
  border-radius: 16%;

  &:after {
    content: '';
    transition:
      border-radius 350ms,
      transform 200ms linear;
    width: ${({ $size }) => `${$size - $size / 8}px`};
    height: ${({ $size }) => `${$size - $size / 8}px`};
    position: absolute;
    transform: scale(1.5);
    border-radius: 100%;
    pointer-events: none;
    border: ${({ $size }) => `${$size / 8}px`} solid
      color-mix(in srgb, ${({ $color }) => colorMap[$color]} 10%, white);
    border-top-color: ${({ $color }) => colorMap[$color]};
  }

  ${({ $animationState }) =>
    $animationState === 'loading'
      ? css`
          border-radius: 100%;

          &:after {
            animation: ${outlinePulsate} 1750ms infinite ease;
            animation-delay: 250ms;
            transform: scale(1);
          }
        `
      : ''}
  position: relative;
  ${({ $color, $iconOnly }) => {
    if ($iconOnly)
      return css`
        > div {
          svg {
            filter: none;
          }
        }
      `;
    return css`
      box-shadow:
        0 105px 68px 0 ${darkenColor($color, 0, '00')},
        0 96px 62px 0 ${darkenColor($color, 0.1, '03')},
        0 56px 52px 0 ${darkenColor($color, 0.5, '0D')},
        0 32px 39px 0 ${darkenColor($color, 0.9, '17')},
        0 8px 21px 0 ${darkenColor($color, 0.1, '1a')};
    `;
  }}
`;

export const IconContainer = styled.div`
  --pos: 12.5%;
  position: absolute;
  top: var(--pos);
  left: var(--pos);
  bottom: var(--pos);
  right: var(--pos);
  z-index: 999;
  pointer-events: none;
  opacity: 1;
  svg {
    filter: drop-shadow(0px 256px 72px rgba(0, 0, 0, 0))
      drop-shadow(0px 164px 55px rgba(0, 0, 0, 0.04))
      drop-shadow(0px 92px 45px rgba(0, 0, 0, 0.09))
      drop-shadow(0px 41px 31px rgba(0, 0, 0, 0.12))
      drop-shadow(0px 10px 13px rgba(0, 0, 0, 0.14));
  }
`;

interface WaveInnerContainerProps {
  $color: AllowedColors;
  $rotationVariant: number;
}

export const WaveInnerContainer = styled.div<WaveInnerContainerProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ $color }) => colorMap[$color]};
  transform: ${({ $rotationVariant }) => getRotation($rotationVariant)};
  position: absolute;

  .noiseShape {
    mix-blend-mode: multiply;
    filter: grayscale(1);
  }
`;

export interface WavesProps {
  $animationState: AnimationState;
}

export const Waves = styled.div<WavesProps>`
  height: 141.6%;
  min-width: 141.6%;
  overflow: hidden;
  position: relative;
  filter: saturate(1.75);
  transform: scaleY(1);

  ${({ $animationState }) => {
    switch ($animationState) {
      case 'hoverable':
        return css`
          & .wave:first-child {
            top: -5%;
          }
          &:hover {
            & .wave {
              transform: scaleY(0);
            }
          }
        `;
      case 'animated':
        return css`
          & .wave {
            transform: scaleY(1);
            transition-delay: 0ms !important;
            animation: ${waveWobble} 5000ms ease-in-out infinite alternate;
          }
        `;
      case 'loading':
        return css`
          & .wave {
            animation: unset;
            transform: scaleY(0);
            transition-delay: 200ms;
          }
        `;
      case 'none':
      default:
        return css``;
    }
  }}
`;

interface WaveProps {
  $waveIntervalDist: number;
}

export const Wave = styled.div<WaveProps>`
  position: absolute;
  top: ${({ $waveIntervalDist }) => `${$waveIntervalDist}%`};
  transform-origin: bottom;
  height: 100%;
  width: 100%;
  transition:
    transform 950ms ease,
    top 950ms ease;
  mix-blend-mode: soft-light;
  filter: contrast(1.2) brightness(1.1);
  svg {
    position: absolute;
    left: 0;
  }
`;

const getRotation = (variant = 0) => {
  const rotations = [
    'rotate(-45deg)',
    'rotate(45deg)',
    'rotate(135deg)',
    'rotate(225deg)',
  ];
  return rotations[variant % rotations.length];
};
