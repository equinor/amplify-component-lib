import { FC } from 'react';

import IconSvg from './ApplicationIcons/AppIconSvg';
import { NoiseShape, WaveShape } from './AppBaseSvg';

import styled, { css, keyframes } from 'styled-components';

export interface AppBaseProps {
  waveIntervalDist?: number;
  size?: number;
  color?: AllowedColors;
  rotationVariant?: number;
  numWaves?: number;
  hasLargeWaves?: boolean;
  animationState?: 'none' | 'hoverable' | 'animated' | 'loading';
  appIconData: string[];
}

export type AllowedColors =
  | 'blue'
  | 'green'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'magenta';

export const colorMap: Record<AllowedColors, string> = {
  blue: '#61ACB2',
  green: '#62B295',
  purple: '#BE9FD0',
  red: '#DB949A',
  yellow: '#C7A97A',
  magenta: '#BC6B88',
};

const darkenColor = (
  color: AllowedColors,
  percentage: number,
  alphaHex: string
) => {
  return `color-mix(in srgb, ${colorMap[color]}${alphaHex}, rgba(0, 0, 0, 1) ${percentage}%)`;
};
const AppIconContainer = styled.div<{
  size: number;
  color: AllowedColors;
  animationState: 'none' | 'hoverable' | 'animated' | 'loading';
}>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
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
    width: ${({ size }) => `${size - size / 8}px`};
    height: ${({ size }) => `${size - size / 8}px`};
    position: absolute;
    transform: scale(1.5);
    border-radius: 100%;
    pointer-events: none;
    border: ${({ size }) => `${size / 8}px`} solid
      color-mix(in srgb, ${({ color }) => colorMap[color]} 10%, white);
    border-top-color: ${({ color }) => colorMap[color]};
  }

  ${({ animationState }) =>
    animationState === 'loading'
      ? css`
          border-radius: 100%;

          &:after {
            animation: ${outlinePulsate} 1750ms infinite ease; /* Adjust duration and timing function as needed */
            animation-delay: 250ms;
            transform: scale(1);
          }
        `
      : ''}
  position: relative;
  ${({ color }) => {
    return `
      box-shadow:
        0px 105px 68px 0px ${darkenColor(color, 0, '00')},
        0px 96px 62px 0px ${darkenColor(color, 0.1, '03')},
        0px 56px 52px 0px ${darkenColor(color, 0.5, '0D')},
        0px 32px 39px 0px ${darkenColor(color, 0.9, '17')},
        0px 8px 21px 0px ${darkenColor(color, 0.1, '1a')};
    `;
  }}
`;

const outlinePulsate = keyframes`
//to{transform: rotate(1turn)}

0% {
  transform: scale(1);
}

100% {
  transform: scale(1) rotate(360deg);
}
`;

const IconContainer = styled.div`
  --pos: 12.5%;
  position: absolute;
  top: var(--pos);
  left: var(--pos);
  bottom: var(--pos);
  right: var(--pos);
  z-index: 999;
  pointer-events: none;
  opacity: 0.85;
  svg {
    filter: drop-shadow(0px 256px 72px rgba(0, 0, 0, 0))
      drop-shadow(0px 164px 55px rgba(0, 0, 0, 0.04))
      drop-shadow(0px 92px 45px rgba(0, 0, 0, 0.09))
      drop-shadow(0px 41px 31px rgba(0, 0, 0, 0.12))
      drop-shadow(0px 10px 13px rgba(0, 0, 0, 0.14));
  }
`;

const WaveInnerContainer = styled.div<{
  color: AllowedColors;
  rotationVariant: number;
}>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => colorMap[color]};
  transform: ${({ rotationVariant }) => getRotation(rotationVariant)};
  position: absolute;

  .noiseShape {
    mix-blend-mode: multiply;
    filter: grayscale(1);
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

const Waves = styled.div<{
  animationState: 'none' | 'hoverable' | 'animated' | 'loading';
}>`
  height: 141.6%;
  min-width: 141.6%;
  overflow: hidden;
  position: relative;
  filter: saturate(1.75);
  transform: scaleY(1);

  ${({ animationState }) => {
    switch (animationState) {
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

const Wave = styled.div<{ waveIntervalDist: number }>`
  position: absolute;
  top: ${({ waveIntervalDist }) => `${waveIntervalDist}%`};
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

const NewApplicationBase: FC<AppBaseProps> = ({
  waveIntervalDist = 14.75,
  size = 512,
  color = 'blue', // Default to yellow or any other color as needed
  rotationVariant = 1,
  hasLargeWaves = false,
  animationState = 'none',
  appIconData,
}) => {
  const waves = Array.from({ length: 8 }, (_, index) => {
    const top = hasLargeWaves
      ? index * (waveIntervalDist * 1.15)
      : index * waveIntervalDist;
    const altWave = index % 2 === 0;
    const delay =
      animationState === 'animated' ? index * 0.75 : (index + 1) * 0.05;

    if (size <= 128) {
      hasLargeWaves = true;
    }
    return {
      waveIntervalDist: top,
      size,
      delay,
      altWave,
      hasLargeWaves,
      animationState,
      appIconData,
    };
  });

  return (
    <AppIconContainer size={size} color={color} animationState={animationState}>
      <IconContainer>
        <IconSvg paths={appIconData} />
      </IconContainer>
      <Waves animationState={animationState}>
        <WaveInnerContainer color={color} rotationVariant={rotationVariant}>
          <Wave
            className="wave"
            waveIntervalDist={0}
            style={{
              animationDelay: `0s`,
              transitionDelay: `0s`,
            }}
          >
            <WaveShape
              index={-1}
              isAltWave={false}
              hasLargeWaves={hasLargeWaves}
            />
            <NoiseShape
              index={-1}
              isAltWave={false}
              hasLargeWaves={hasLargeWaves}
            />
          </Wave>
          {waves.map((wave, index) => (
            <Wave
              className="wave"
              key={index}
              waveIntervalDist={wave.waveIntervalDist}
              style={{
                animationDelay: `${wave.delay}s`,
                transitionDelay: `${wave.delay}s`,
              }}
            >
              <WaveShape
                index={index}
                isAltWave={wave.altWave}
                hasLargeWaves={wave.hasLargeWaves}
              />
              <NoiseShape
                index={index}
                isAltWave={wave.altWave}
                hasLargeWaves={wave.hasLargeWaves}
              />
            </Wave>
          ))}
        </WaveInnerContainer>
      </Waves>
    </AppIconContainer>
  );
};

export default NewApplicationBase;
