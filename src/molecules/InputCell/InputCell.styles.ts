import { colors, spacings } from 'src/atoms/style';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';
import {
  CellStyleProps,
  cellStyles,
} from 'src/molecules/EmptyCell/EmptyCell.styles';

import styled, { css } from 'styled-components';

export const cellInputSurface = css`
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  outline: none;
`;

export const cellInputHeight = `calc(${spacings.large} + ${spacings.medium_small})`;

// Exclude native popover descendants from cell styling and validation; they remain in the cell's DOM subtree.
export const excludeCellPopoverContent =
  ':not(:where([data-input-cell] [popover] *))';

export const cellInputSelector = `[data-input-cell] &&&${excludeCellPopoverContent}`;

interface ContainerProps extends CellStyleProps {
  $active?: boolean;
  $variant?: Variants;
}

const cellOutline = (color: string) => css`
  position: relative;
  z-index: 1;
  box-shadow: none;
  border-color: ${color};
  outline: 2px solid ${color};
  outline-offset: -1px;
`;

export const Container = styled.td<ContainerProps>`
  ${cellStyles}
  height: calc(${cellInputHeight} + ${spacings.small} * 2);

  &:is(div) {
    height: auto;
    min-height: calc(${cellInputHeight} + ${spacings.small} * 2);
  }

  &:hover:not(
      :has(
        :is(
          :disabled,
          [aria-disabled='true'],
          [readonly]
        )${excludeCellPopoverContent}
      )
    ) {
    box-shadow: inset 0 -2px 0 ${colors.interactive.primary__resting.rgba};
  }

  &&:focus-within:not(:where(:has([popover]:focus-within))),
  &&:has([aria-expanded='true']${excludeCellPopoverContent}) {
    ${cellOutline(colors.interactive.primary__resting.rgba)}
  }

  ${({ $active }) =>
    $active &&
    css`
      && {
        ${cellOutline(colors.interactive.primary__resting.rgba)}
      }
    `}

  ${Object.entries(VARIANT_COLORS).map(
    ([variant, color]) => css`
      &&:has(
          [data-input-cell-variant='${variant}']${excludeCellPopoverContent}
        ) {
        ${cellOutline(color)}
      }
    `
  )}

  &&:has([aria-invalid='true']${excludeCellPopoverContent}) {
    ${cellOutline(colors.interactive.danger__resting.rgba)}
  }

  ${({ $variant }) =>
    $variant &&
    css`
      &&& {
        ${cellOutline(VARIANT_COLORS[$variant])}
      }
    `}
`;
