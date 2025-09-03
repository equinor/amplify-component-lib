import {
  IconCellColors,
  IconCellStates,
  IconCellTypes,
} from './IconCell.types';
import {
  getBorderBottom,
  getSelectedBorder,
  stateBGColor,
} from './IconCell.utils';
import { animation, colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

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
  $selected: boolean;
  $color: IconCellColors;
  $state: IconCellStates;
  $type: IconCellTypes;
  $backgroundColor: string;
  $noBorder: boolean;
  $nonClickable: boolean;
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
  background: ${({ $type, $state, $backgroundColor }) => {
    if ($type === IconCellTypes.SCRIBBLED_OUT)
      return `repeating-linear-gradient(
      20deg,
      ${colors.ui.background__light_medium.rgba} 0px,
      ${colors.ui.background__default.rgba} 1px,
      ${colors.ui.background__default.rgba} 10px,
      ${colors.ui.background__light_medium.rgba} 11px,
      ${colors.ui.background__light_medium.rgba} 12px
    )`;
    if ($type !== IconCellTypes.COLOURED) return 'transparent';
    if ($state === IconCellStates.DANGER)
      return stateBGColor[IconCellStates.DANGER];
    if ($state === IconCellStates.WARNING)
      return stateBGColor[IconCellStates.WARNING];
    return $backgroundColor;
  }};
  transition: background ${animation.transitionMS};
  border: none;
  border-bottom: ${getBorderBottom};

  ${({ $type }) =>
    $type === IconCellTypes.SCRIBBLED_OUT &&
    `
      ${Label}, ${HelperIconContainer}, ${IconContainer} { display: none; }
    `}

  ${({ $selected, $state }) =>
    $selected &&
    `
      border: 1px solid ${getSelectedBorder($state)};
    `}

  ${({ $backgroundColor, $type, $state }) =>
    `
      ${Label}::before, ${HelperIconContainer}::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: ${
          $type === IconCellTypes.COLOURED
            ? $state === IconCellStates.DANGER
              ? stateBGColor[IconCellStates.DANGER]
              : $state === IconCellStates.WARNING
                ? stateBGColor[IconCellStates.WARNING]
                : $backgroundColor
            : colors.ui.background__default.rgba
        };
        opacity: 0.7;
        pointer-events: none;
      }
    `}

  &:disabled {
    cursor: not-allowed;
    background: ${({ $type }) =>
      $type === IconCellTypes.COLOURED
        ? colors.ui.background__light.rgba
        : 'transparent'};
    ${Label} span {
      color: ${colors.interactive.disabled__text.rgba};
    }
    ${HelperIconContainer}, ${IconContainer} {
      opacity: 0.3;
    }

    ${({ $backgroundColor, $type }) =>
      $backgroundColor &&
      `
        ${Label}::before, ${HelperIconContainer}::before {
          background-color: ${$type === IconCellTypes.COLOURED ? colors.ui.background__light.rgba : colors.ui.background__default.rgba};
        }
      `}
  }

  cursor: ${({ $nonClickable }) => ($nonClickable ? 'default' : 'pointer')};

  ${({ $nonClickable }) =>
    !$nonClickable &&
    `
      &:hover:not(:disabled)::after {
        background: rgba(0, 0, 0, 0.1);
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        animation: ${animation.transitionMS} ease-in-out;
      }
    `}
`;
