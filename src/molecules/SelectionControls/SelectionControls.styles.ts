import { animation, colors, shape, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

interface WrapperProps {
  $outlined: boolean;
  $error?: boolean;
}

export const Wrapper = styled.span<WrapperProps>`
  > label {
    padding: ${spacings.x_small} ${spacings.medium_small};
    border-radius: ${shape.button.borderRadius};
    transition: background ${animation.transitionMS};
    gap: ${spacings.small};
    min-height: 36px;
    > span:first-child {
      padding: 0;
      height: 24px;
      aspect-ratio: 1;
    }
    > span[class*='Switch']:last-child {
      padding: 0 ${spacings.medium_small} 0 0;
    }
  }

  &.switch > label {
    padding: 0 ${spacings.x_small} 0 ${spacings.medium_small};
    gap: ${spacings.small};

    > span:first-child {
      height: 36px;
    }

    input {
      width: 0;
      ~ span {
        height: 36px;
      }
    }
  }

  /* Radio / Checkbox hover state override */
  > label > span:before {
    background-color: transparent !important;
    height: 36px;
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
      fill: ${({ $error }) =>
        $error
          ? colors.interactive.danger__resting.rgba
          : colors.text.static_icons__tertiary.rgba};
      &:hover {
        fill: ${({ $error }) =>
          $error
            ? colors.interactive.danger__hover.rgba
            : colors.text.static_icons__default.rgba};
      }
    }
  }
  ${({ $error }) => {
    if ($error) {
      return css`
        input ~ svg {
          fill: ${colors.interactive.danger__resting.rgba};
          &:hover {
            fill: ${colors.interactive.danger__hover.rgba};
          }
        }
      `;
    }
    return '';
  }}

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
    background: ${({ $error }) =>
      $error
        ? colors.interactive.danger__highlight.rgba
        : colors.interactive.primary__hover_alt.rgba};
    svg {
      fill: ${({ $error }) =>
        $error
          ? colors.interactive.danger__hover.rgba
          : colors.text.static_icons__default.rgba};
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
