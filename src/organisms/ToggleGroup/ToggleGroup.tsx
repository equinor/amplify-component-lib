import { Children, forwardRef } from 'react';

import { ToggleGroup as ToggleGroupProps } from './ToggleGroup.types';
import { ToggleGroupOption } from './ToggleGroupOption';
import { colors, shape } from 'src/atoms/style';

import styled, { css } from 'styled-components';

interface WrapperProps {
  $variant: Required<ToggleGroupProps>['variant'];
  $matchParentHeight: Required<ToggleGroupProps>['matchParentHeight'];
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  ${({ $variant }) => {
    if ($variant === 'filled') {
      return css`
        border-radius: ${shape.button.borderRadius};
        background: ${colors.ui.background__default.rgba};
      `;
    }
    if ($variant === 'outlined') {
      return css`
        gap: 1px; // Space for the outline
        > button {
          outline: 1px solid ${colors.text.static_icons__tertiary.rgba};
          &:hover {
            outline-color: ${colors.text.static_icons__secondary.rgba};
          }
          &[aria-checked='true'] {
            outline-color: ${colors.interactive.primary__resting.rgba};
            &:hover {
              outline-color: ${colors.interactive.primary__hover.rgba};
            }
          }
          &:disabled {
            background: none;
            outline-color: ${colors.interactive.disabled__text.rgba};
          }
        }
      `;
    }
  }}

  ${({ $matchParentHeight }) => {
    if ($matchParentHeight) {
      return css`
        height: 100%;
      `;
    }
    return '';
  }}
`;

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ variant = 'filled', matchParentHeight = false, children }, ref) => {
    return (
      <Wrapper
        ref={ref}
        $variant={variant}
        $matchParentHeight={matchParentHeight}
      >
        {Children.map(children, (toggleOption) => {
          if (toggleOption.type != ToggleGroupOption) {
            throw 'Expected child to be ToggleGroupOption!';
          }
          return toggleOption;
        })}
      </Wrapper>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';
