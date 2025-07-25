import { colors, VARIANT_COLORS } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';
import { DatePickerProps } from 'src/molecules/DatePicker/DatePicker';

import styled, { css } from 'styled-components';

interface DatePickerWrapperProps {
  $variant: DatePickerProps['variant'];
  $loading?: boolean;
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
    ${({ $variant }) => {
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

  > svg {
    position: absolute;
    right: ${spacings.small};
    transform: translateY(calc(${spacings.x_small} + ${spacings.xx_small}));
  }
`;
