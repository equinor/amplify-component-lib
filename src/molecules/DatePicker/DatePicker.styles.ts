import { tokens } from '@equinor/eds-tokens';
import { typographyTemplate } from '@equinor/eds-utils';

import { colors, VARIANT_COLORS } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';
import { DatePickerProps } from 'src/molecules/DatePicker/DatePicker';
import {
  cellInputHeight,
  cellInputSelector,
  cellInputSurface,
} from 'src/molecules/InputCell/InputCell.styles';

import styled, { css } from 'styled-components';

interface DatePickerWrapperProps {
  $variant: DatePickerProps['variant'];
  $loading?: boolean;
  $locked?: boolean;
  $autofilled?: boolean;
}

export const DatePickerWrapper = styled.div<DatePickerWrapperProps>`
  position: relative;
  height: fit-content;
  > p {
    color: ${colors.text.static_icons__tertiary.rgba};
    position: absolute;
    top: 0;
    right: 8px;
  }
  /* If the DatePicker doesn't have a label there won't be space for the meta text*/
  &:not(:has(> div > label)):has(> p) {
    padding-top: 1rem;
  }

  > div:hover:not(:disabled):not(:focus-within) {
    ${({ $variant, $locked }) => {
      if ($locked) return;

      if ($variant === undefined) {
        return css`
          > div[id*='react-aria'] {
            box-shadow: inset 0 -2px 0 0
              ${colors.text.static_icons__tertiary.rgba};
          }
        `;
      }

      return css`
        > div[id*='react-aria'] {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      `;
    }}
  }

  > div > div[id*='react-aria'] {
    outline: none !important;

    ${({ $variant }) => {
      if ($variant === undefined) {
        return css`
          box-shadow: inset 0 -1px 0 0
            ${colors.text.static_icons__tertiary.rgba};
          &:focus-within {
            box-shadow: inset 0 -2px 0 0
              ${colors.interactive.primary__resting.rgba};
          }
        `;
      }

      return css`
        box-shadow: inset 0 -${$variant === 'dirty' ? 2 : 1}px 0 0
          ${VARIANT_COLORS[$variant]};
        &:focus-within {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      `;
    }}
  }

  ${({ $loading }) => {
    if ($loading)
      return css`
        div[role='presentation'] {
          visibility: hidden;

          // For the date range picker there is a "-" in between the two dates, so we hide that as well
          & ~ span {
            visibility: hidden;
          }
        }
      `;
  }}

  ${({ $autofilled }) =>
    $autofilled &&
    css`
      > div > div[id*='react-aria'] {
        background-color: ${colors.dataviz.primary.primary20};
      }
    `}

  ${({ $locked, $autofilled }) =>
    $locked &&
    css`
      /* Icons are absolutely positioned, so don't let the wrapper shrink below the field content */
      min-width: min-content;

      > div > div[id*='react-aria'] {
        background-color: ${$autofilled
          ? colors.dataviz.primary.primary20
          : colors.ui.background__light.rgba};
        box-shadow: none;
        outline: none;
        /* Lock icon (left) and calendar icon (right) replace the EDS toggle buttons hidden by readOnly,
           so keep the same total horizontal space as the unlocked field to avoid overflow */
        padding: 0 calc(${spacings.small} + ${spacings.large});
        &:focus-within {
          box-shadow: none;
        }
      }
    `}

  > svg {
    position: absolute;
    right: ${spacings.small};
    transform: translateY(calc(${spacings.x_small} + ${spacings.xx_small}));
  }

  > svg.lock-icon {
    right: auto;
    left: ${spacings.small};
  }

  ${cellInputSelector} > div > div[id*='react-aria'] {
    ${cellInputSurface}
    box-sizing: border-box;
    min-height: ${cellInputHeight};
    padding: calc(${spacings.x_small} + ${spacings.xx_small}) ${spacings.small};
  }

  ${cellInputSelector}[data-input-cell-locked] > div > div[id*='react-aria'] {
    padding-left: calc(${spacings.small} + ${spacings.large});
    padding-right: calc(${spacings.small} + ${spacings.large});
  }

  ${cellInputSelector} [role='spinbutton'] {
    ${typographyTemplate(tokens.typography.input.text)}
    color: ${colors.text.static_icons__default.rgba};
  }

  ${cellInputSelector} [role='spinbutton'][aria-disabled='true'] {
    color: ${colors.interactive.disabled__text.rgba};
  }

  ${cellInputSelector} [role='spinbutton'].placeholder:not([aria-disabled='true']) {
    color: ${colors.text.static_icons__tertiary.rgba};
  }

  ${cellInputSelector} button[aria-label='Reset'] svg {
    fill: ${colors.text.static_icons__tertiary.rgba};
    width: calc(${spacings.medium} + ${spacings.xx_small});
    height: calc(${spacings.medium} + ${spacings.xx_small});
  }
`;
