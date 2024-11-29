import { tokens } from '@equinor/eds-tokens';

import { animation, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

const { colors, shape } = tokens;

interface WrapperProps {
  $outlined: boolean;
}

export const Wrapper = styled.span<WrapperProps>`
  > label {
    padding: 0 ${spacings.medium} 0 ${spacings.x_small};
    border-radius: ${shape.button.borderRadius};
    transition: background ${animation.transitionMS};
    > span:last-child {
      padding: 0 ${spacings.medium_small} 0 0;
    }
  }

  &.switch > label {
    padding: 0 ${spacings.medium} 0 0;
  }

  /* Radio / Checkbox hover state override */
  > label > span:before {
    background-color: transparent !important;
  }
  /* Switch hover state override */
  > label > span > input[type='checkbox'] + span {
    background: transparent !important;
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
  /* Switch dot override */
  > label:has(input:checked)
    > span
    > span
    > span:last-child:not([class*='SwitchSmall']) {
    background: ${colors.interactive.primary__resting.rgba};
  }
  > label:has(input)
    > span
    > span
    > span:last-child:not([class*='SwitchSmall']) {
    background: ${colors.text.static_icons__tertiary.rgba};
  }

  > label:hover:not(:has(input:disabled)) {
    background: ${colors.interactive.primary__hover_alt.rgba};
    svg {
      fill: ${colors.text.static_icons__default.rgba};
    }
  }

  > label:focus:not(:hover):not(:has(input:disabled)) {
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
        > label {
          outline: 1px solid ${colors.ui.background__medium.rgba};
        }
        &:has(input:disabled) {
          svg {
            fill: ${colors.interactive.disabled__border.rgba};
          }
        }
      `;
    }
  }}
`;
