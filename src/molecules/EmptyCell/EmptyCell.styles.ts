import { colors, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

export interface CellStyleProps {
  $noBottomBorder?: boolean;
}

export const cellStyles = css<CellStyleProps>`
  box-sizing: border-box;
  height: ${spacings.xx_large};
  padding: ${spacings.small};
  vertical-align: middle;
  background: transparent;
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  box-shadow: ${({ $noBottomBorder }) =>
    $noBottomBorder
      ? 'none'
      : `inset 0 -1px 0 ${colors.ui.background__medium.rgba}`};

  &:is(div) {
    height: auto;
    min-height: ${spacings.xx_large};
  }
`;

export const Container = styled.td<CellStyleProps>`
  ${cellStyles}
`;
