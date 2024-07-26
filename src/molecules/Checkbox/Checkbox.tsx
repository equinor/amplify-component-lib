import { ChangeEventHandler, forwardRef } from 'react';

import { Checkbox as Base } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { animation } from 'src/atoms/style';
import { spacings } from 'src/atoms/style/spacings';

import styled, { css } from 'styled-components';

const { colors, shape } = tokens;

interface StyledBaseProps {
  $outlined: boolean;
}

const StyledBase = styled(Base)<StyledBaseProps>`
  padding: 0 ${spacings.large} 0 ${spacings.small};
  transition: background ${animation.transitionMS};

  > span:before {
    background-color: transparent !important;
  }
  svg {
    transition: fill ${animation.transitionMS};
  }
  input:not(:checked) {
    ~ svg {
      fill: ${colors.text.static_icons__tertiary.rgba};
      &:hover {
        fill: ${colors.text.static_icons__default.rgba};
      }
    }
  }

  &:hover:not(:has(input:disabled)) {
    background: ${colors.interactive.primary__hover_alt.rgba};
    svg {
      fill: ${colors.text.static_icons__default.rgba};
    }
  }

  &:focus:not(:hover):not(:has(input:disabled)) {
    outline: 1px dashed ${colors.interactive.primary__resting.rgba};
    outline-offset: -1px;
  }

  &:has(input:disabled) {
    span:last-child {
      color: ${colors.interactive.disabled__text.rgba};
    }
    svg {
      fill: ${colors.interactive.disabled__text.rgba};
    }
  }

  ${({ $outlined }) => {
    if ($outlined) {
      return css`
        border-radius: ${shape.button.borderRadius};
        outline: 1px solid ${colors.ui.background__medium.rgba};
        &:has(input:disabled) {
          svg {
            fill: ${colors.interactive.disabled__border.rgba};
          }
        }
      `;
    }
  }}
`;

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  indeterminate?: boolean;
  outlined?: boolean;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked,
      onChange,
      indeterminate = false,
      outlined = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <StyledBase
        ref={ref}
        $outlined={outlined}
        checked={checked}
        label={label}
        onChange={onChange}
        indeterminate={indeterminate}
        disabled={disabled}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
