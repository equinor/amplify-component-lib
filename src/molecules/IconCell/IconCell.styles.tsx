import {
  IconCellState,
  IconCellStates,
  IconCellVariant,
  IconCellVariants,
} from './IconCell.types';
import {
  getBackground,
  getBorderBottom,
  getSelectedBorder,
  stateBGColor,
} from './IconCell.utils';
import { animation, colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

// Shared overlay pseudo-element
const overlay = (color: string = 'rgba(0, 0, 0, 0.1)') => `
  content: '';
  position: absolute;
  inset: 0;
  background-color: ${color};
  opacity: 0.7;
  pointer-events: none;
`;

export const Container = styled.div`
  min-width: 48px;
  padding: 0;
`;

export const Label = styled.div`
  display: flex;
  position: absolute;
  bottom: ${spacings.small};
  left: ${spacings.small};
  padding-right: ${spacings.xx_small};

  span {
    font-size: 10px;
    font-weight: 500;
    position: relative;
    color: ${colors.text.static_icons__default.rgba};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HelperIconContainer = styled.div`
  display: flex;
  position: absolute;
  top: ${spacings.small};
  right: ${spacings.small};

  svg {
    width: 16px;
    height: 16px;
    position: relative;
  }
`;

export interface ButtonProps {
  $selected?: boolean;
  $state?: IconCellState;
  $variant: IconCellVariant;
  $backgroundColor?: string;
  $noBottomBorder?: boolean;
  $clickable?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 52px;
  position: relative;
  justify-content: center;
  overflow: hidden;
  padding: ${spacings.small};
  background: ${getBackground};
  transition: background ${animation.transitionMS};
  border: none;
  border-bottom: ${getBorderBottom};
  cursor: ${({ $clickable }) => ($clickable ? 'pinter' : 'default')};

  // Scribbled-out hides content
  ${({ $variant }) =>
    $variant === IconCellVariants.SCRIBBLED_OUT &&
    `
      ${Label}, ${HelperIconContainer}, ${IconContainer} {
        display: none;
      }
    `}

  // Selected state
  ${({ $selected, $state }) =>
    $selected &&
    `
      border: 1px solid ${getSelectedBorder($state)};
    `}

  // Overlay for Label & HelperIconContainer
  ${({ $backgroundColor, $variant, $state }) => {
    const color =
      $variant === IconCellVariants.COLOURED
        ? $state === IconCellStates.ERROR
          ? stateBGColor[IconCellStates.ERROR]
          : $state === IconCellStates.WARNING
            ? stateBGColor[IconCellStates.WARNING]
            : $backgroundColor
        : colors.ui.background__default.rgba;

    return `
      ${Label}::before,
      ${HelperIconContainer}::before {
        ${overlay(color)}
      }
    `;
  }}

  // Disabled state
  &:disabled {
    cursor: not-allowed;
    background: ${({ $variant }) =>
      $variant === IconCellVariants.COLOURED
        ? colors.ui.background__light.rgba
        : 'transparent'};

    ${Label} span {
      color: ${colors.interactive.disabled__text.rgba};
    }

    ${IconContainer},${HelperIconContainer} {
      opacity: 0.3;
      filter: grayscale(100%);
    }

    ${({ $selected }) =>
      $selected &&
      `
        border: 1px solid ${colors.ui.background__light.rgba};
      `}

    border-bottom: 1px solid ${colors.ui.background__medium.rgba};

    ${({ $variant }) => `
      ${Label}::before,
      ${HelperIconContainer}::before {
        background-color: ${
          $variant === IconCellVariants.COLOURED
            ? colors.ui.background__light.rgba
            : colors.ui.background__default.rgba
        };
      }
    `}
  }

  // Hover effect (only if clickable)
  ${({ $clickable }) =>
    $clickable &&
    `
      &:hover:not(:disabled)::after {
        ${overlay()}
        animation: ${animation.transitionMS} ease-in-out;
      }
    `}
`;
