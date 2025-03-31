import { Children, forwardRef } from 'react';

import { ToggleGroup as ToggleGroupProps } from './ToggleGroup.types';
import { ToggleGroupOption } from './ToggleGroupOption';
import { colors } from 'src/atoms';

import styled, { css } from 'styled-components';

interface WrapperProps {
  $variant: Required<ToggleGroupProps>['variant'];
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  background: ${colors.ui.background__default.rgba};
  ${({ $variant }) => {
    if ($variant === 'outlined') {
      return css`
        gap: 1px; // Space for the outline
        > button {
          outline: 1px solid ${colors.text.static_icons__tertiary.rgba};
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
`;

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ variant = 'filled', children }, ref) => {
    return (
      <Wrapper ref={ref} $variant={variant}>
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
