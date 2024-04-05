import { Chip as Base } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled, { css } from 'styled-components';

const { colors } = tokens;

interface ChipProps {
  $readonly?: boolean;
}

export const StyledChip = styled(Base)<ChipProps>`
  border: 1px solid ${colors.ui.background__medium.rgba};
  ${({ $readonly }) =>
    $readonly
      ? css`
          color: ${colors.text.static_icons__default.rgba} !important;
        `
      : css`
          color: ${colors.infographic.primary__moss_green_100.rgba} !important;

          &:hover {
            background: ${colors.interactive.primary__hover_alt.rgba};
            color: ${colors.interactive.primary__hover.rgba} !important;
            border: 1px solid ${colors.interactive.primary__hover.rgba};
          }
        `};
`;
