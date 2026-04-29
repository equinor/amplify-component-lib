import { CircularProgress } from '@equinor/eds-core-react';

import { colors, shape } from 'src/atoms/style';
import {
  ButtonPrimitive,
  resolveBorderColor,
} from 'src/molecules/Button/Button.styles';

import styled, { css } from 'styled-components';

type Shape = 'circular' | 'square';

interface IconButtonWrapperProps {
  $shape: Shape;
}

export const IconButtonWrapper = styled(
  ButtonPrimitive
)<IconButtonWrapperProps>`
  padding: 5px;
  /*
   * Outer footprint is always 36x36 (= shape.button.minHeight) so that
   * circular, square and regular buttons align perfectly when placed in
   * the same 36px-tall container.
   *
   * For the circular shape, the visible 40x40 circle is rendered via a
   * ::before pseudo-element that overflows symmetrically by 2px on each
   * side, matching the Figma spec (inner 40x40 layer / outer 36x36 frame).
   */
  height: ${shape.button.minHeight};
  width: ${shape.button.minHeight};

  ${({ $shape, $tokens }) =>
    $shape === 'circular'
      ? css`
          border-radius: ${shape.icon_button.borderRadius};
          background: transparent;
          border-color: transparent;
          overflow: visible;
          isolation: isolate;
          &::before {
            content: '';
            position: absolute;
            inset: -3px; // -1px border + 2px overflow
            border-radius: ${shape.icon_button.borderRadius};
            background: ${$tokens.backgroundColor};
            border: 1px solid ${resolveBorderColor($tokens)};
            box-sizing: border-box;
            z-index: -1;
            transition:
              background-color 150ms ease,
              border-color 150ms ease;
          }
          &:hover,
          &:active {
            background: transparent;
            border-color: transparent;
          }
          &:hover::before {
            background: ${$tokens.hover.backgroundColor};
            border-color: ${resolveBorderColor($tokens.hover)};
          }
          &:active::before {
            background: ${$tokens.pressed.backgroundColor};
            border-color: ${resolveBorderColor($tokens.pressed)};
          }
          &:disabled,
          &[aria-disabled='true'] {
            background: transparent;
            border-color: transparent;
            &::before {
              background: ${$tokens.disabled.backgroundColor};
              border-color: ${resolveBorderColor($tokens.disabled)};
            }
          }
        `
      : css`
          border-radius: ${shape.button.borderRadius};
        `}
`;

export const StyledCircularProgress = styled(CircularProgress)<{
  $isTertiary: boolean;
}>`
  ${(props) =>
    props.$isTertiary &&
    css`
      & circle:first-child {
        stroke: ${colors.dataviz.lightpink.lighter};
      }

      & circle:last-child {
        stroke: ${colors.interactive.danger__resting.rgba};
      }
    `}
`;
