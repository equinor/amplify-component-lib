import styled, { keyframes } from 'styled-components';

interface WaveInnerContainerProps {
  $heightFromBottom: number;
}

export const WaveInnerContainer = styled.div<WaveInnerContainerProps>`
  --heightFromBottom: ${({ $heightFromBottom }) => `${$heightFromBottom}px`};
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

interface WaveProps {
  $waveIntervalDist: number;
}

export const Wave = styled.div<WaveProps>`
  position: absolute;
  height: 100%;
  min-height: 1000px;
  width: 100%;
  top: ${({ $waveIntervalDist }) => `${$waveIntervalDist}rem`};
  transform-origin: top;
  transform: var(--rotate3d) translateY(-2px) scaleY(1);
  mix-blend-mode: overlay;

  //animation: ${waveWobble} 5.5s infinite ease alternate;
`;
export const Container = styled.div`
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
    mix-blend-mode: color-burn;
    z-index: 0;
  }
`;
