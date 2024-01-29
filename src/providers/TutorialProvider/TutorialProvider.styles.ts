import { tokens } from '@equinor/eds-tokens';

import styled, { keyframes } from 'styled-components';

const { spacings, elevation, shape } = tokens;

interface HighlighterProps {
  $top: number;
  $left: number;
  $width: number;
  $height: number;
}

const fadeinBoxShadowAnimation = keyframes`
  from {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0);
  }
  to {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);
  }

`;

export const Highlighter = styled.div<HighlighterProps>`
  position: absolute;
  z-index: 10000;
  pointer-events: none;
  transition: top, left, width, height;
  transition-duration: 300ms;
  border-radius: 4px;
  animation: ${fadeinBoxShadowAnimation} 300ms;
  animation-fill-mode: forwards;
  ${({ $width, $height, $top, $left }) => `
    top: ${$top}px;
    left: ${$left}px;
    width: ${$width}px;
    height: ${$height}px;
  `}
`;

export const DialogWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  background: transparent;
`;

interface TutorialDialogProps {
  $positionCss: string;
}

const fadeinOpacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }

`;
export const StyledTutorialDialog = styled.dialog<TutorialDialogProps>`
  border: none;
  box-shadow: ${elevation.above_scrim};
  border-radius: ${shape.corners.borderRadius};
  // TODO: figure out why transition does not work with margin change
  transition: all;
  transition-duration: 300ms;
  animation: ${fadeinOpacityAnimation} 300ms;
  animation-fill-mode: forwards;
  ${({ $positionCss }) => $positionCss}
  &::backdrop {
    background: transparent;
  }
`;
export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.large};
  width: 300px;
`;

export const DialogImage = styled.img`
  max-height: 300px;
  min-height: 50px;
  object-fit: contain;
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const NavigateSteps = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
`;

export const BrokenTutorialDialog = styled.dialog`
  box-shadow: ${elevation.above_scrim};
  border: none;
  width: 300px;
  border-radius: ${shape.corners.borderRadius};
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.large};
  > button {
    align-self: flex-end;
  }
  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;
