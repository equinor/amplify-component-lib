import { animation, colors, shape, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

interface WrapperProps {
  $outlined: boolean;
  $error?: boolean;
  $checked?: boolean;
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

  &.switch {
    position: relative;
    display: inline-flex;

    > label {
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

    /* Track: 34x20 pill centered in the 40px EDS click bound */
    > label > span > span > span:first-child {
      width: 34px;
      height: 20px;
      border-radius: 10px;
      background: ${({ $checked }) =>
        $checked
          ? colors.interactive.primary__resting.rgba
          : colors.ui.background__medium.rgba};
    }

    /* Handle: 12px knob, 3px inset from the pill edge */
    > label > span > span > span:last-child {
      width: 12px;
      height: 12px;
      left: 6px;
      box-shadow: none;
      background: ${colors.text.static_icons__primary_white.hex};
    }
    > label:has(input:checked) > span > span > span:last-child {
      transform: translate(16px, -50%);
      background: ${colors.text.static_icons__primary_white.rgba};
    }

    > label:hover:not(:has(input:disabled)) > span > span > span:first-child {
      background: ${({ $checked }) =>
        $checked
          ? colors.interactive.primary__hover.rgba
          : colors.ui.background__heavy.rgba};
    }

    &:has(input:disabled) {
      > label > span > span > span:first-child {
        background: ${colors.interactive.disabled__fill.rgba};
      }
      > label > span > span > span:last-child {
        background: ${colors.ui.background__default.rgba};
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
    input:disabled {
      background: transparent !important;
      opacity: 1;
    }
    > label > span::before {
      background: transparent !important;
    }
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
