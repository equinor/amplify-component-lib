import { Chip as Base } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled, { css } from 'styled-components';

const { colors } = tokens;

interface ChipProps {
  $readonly?: boolean;
  $variant?: 'active' | 'error' | 'default';
}

const getColorSchemeBy = (variant: ChipProps['$variant'] = 'default') => {
  const colorSchemes = {
    error: {
      color: `${colors.interactive.danger__resting.rgba}`,
      background: `${colors.ui.background__light.rgba}`,
      borderColor: `${colors.interactive.danger__resting.rgba}`,
      hover: {
        color: `${colors.interactive.danger__resting.rgba}`,
        background: `${colors.ui.background__light.rgba}`,
        borderColor: `${colors.interactive.danger__resting.rgba}`,
      },
    },
    active: {
      color: `${colors.interactive.focus.rgba}`,
      background: `${colors.interactive.success__highlight.rgba}`,
      borderColor: `${colors.interactive.primary__selected_hover.rgba}`,
      hover: {
        color: `${colors.interactive.primary__hover.rgba}`,
        background: `${colors.interactive.success__highlight.rgba}`,
        borderColor: `${colors.interactive.primary__hover.rgba}`,
      },
    },
    default: {
      color: `${colors.infographic.primary__moss_green_100.rgba}`,
      background: `${colors.ui.background__light.rgba}`,
      borderColor: `${colors.ui.background__medium.rgba}`,
      hover: {
        background: `${colors.interactive.primary__hover_alt.rgba}`,
        color: `${colors.interactive.primary__hover.rgba}`,
        borderColor: `${colors.interactive.primary__hover.rgba}`,
      },
    },
  } as const;

  return colorSchemes[variant];
};

export const StyledChip = styled(Base)<ChipProps>`
  border: 1px solid ${colors.ui.background__medium.rgba};
  ${({ $readonly, $variant }) =>
    $readonly
      ? css`
          color: ${colors.text.static_icons__default.rgba} !important;
        `
      : css`
          color: ${getColorSchemeBy($variant).color} !important;
          background: ${getColorSchemeBy($variant).background} !important;
          border: 1px solid ${getColorSchemeBy($variant).borderColor};

          &:hover {
            background: ${getColorSchemeBy($variant).hover
              .background} !important;
            color: ${getColorSchemeBy($variant).hover.color} !important;
            border: 1px solid ${getColorSchemeBy($variant).hover.borderColor};
          }
        `};
`;
