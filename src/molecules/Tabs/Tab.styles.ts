import { colors, shape, spacings } from 'src/atoms/style';

import { motion } from 'motion/react';
import styled from 'styled-components';

interface ButtonProps {
  $centered: boolean;
}

export const Button = styled.button<ButtonProps>`
  position: relative;
  padding: ${spacings.medium};
  display: flex;
  align-items: center;
  justify-content: ${({ $centered }) => ($centered ? 'center' : 'flex-start')};
  gap: ${spacings.small};
  width: auto;
  flex-grow: 1;
  height: 48px;
  overflow-x: clip;
  cursor: pointer;

  > svg {
    fill: ${colors.text.static_icons__tertiary.rgba};
  }

  > label {
    white-space: nowrap;
    pointer-events: none;
    display: block;
    height: 16px;
    color: ${colors.text.static_icons__tertiary.rgba};
  }

  &[aria-selected='true'] {
    > svg {
      fill: ${colors.interactive.primary__resting.rgba};
    }

    > label {
      color: ${colors.interactive.primary__resting.rgba};
    }
  }

  &:hover:not(:disabled) {
    background: ${colors.interactive.primary__hover_alt.rgba};

    &[aria-selected='true'] {
      > svg {
        fill: ${colors.interactive.primary__hover.rgba};
      }

      > label {
        color: ${colors.interactive.primary__hover.rgba};
      }

      > span:not(.count):last-child {
        background: ${colors.interactive.primary__hover.rgba};
      }
    }
  }

  &:disabled {
    cursor: not-allowed;

    > svg {
      fill: ${colors.interactive.disabled__fill.rgba};
    }

    > label {
      color: ${colors.interactive.disabled__text.rgba};
    }

    > span.static-line {
      background: ${colors.ui.background__medium.rgba};
    }
  }
`;

interface LineProps {
  $active?: boolean;
}

export const Line = styled.span<LineProps>`
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: ${({ $active }) =>
    $active
      ? colors.interactive.primary__resting.rgba
      : colors.ui.background__heavy.rgba};
`;
export const ActiveLine = styled(motion.span)`
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
  background: ${colors.interactive.primary__resting.rgba};
`;

export const Count = styled.span`
  display: flex;
  padding: ${spacings.x_small} ${spacings.small};
  background: ${colors.interactive.primary__resting.rgba};
  border-radius: ${shape.rounded.borderRadius};
  > span {
    color: ${colors.text.static_icons__primary_white.rgba};
  }
`;
