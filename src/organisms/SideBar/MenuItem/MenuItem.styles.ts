import { Typography } from '@equinor/eds-core-react';
import { createLink } from '@tanstack/react-router';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const MenuItemWrapper = styled.span`
  width: 100%;
`;

interface LinkProps {
  $active?: boolean;
  $disabled?: boolean;
}

const AnchorTag = styled.a<LinkProps>`
  display: flex;
  align-self: stretch;
  align-items: center;
  height: 64px;
  min-width: 64px;
  padding: ${spacings.medium};
  gap: ${spacings.medium};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  background: ${({ $active }) =>
    $active && colors.interactive.primary__selected_highlight.rgba};
  text-decoration: none;
  transition: background 0.1s ease-out;
  > div > svg {
    fill: ${({ $disabled }) =>
      $disabled
        ? colors.interactive.disabled__text.rgba
        : colors.interactive.primary__resting.rgba};
  }
  &:hover {
    cursor: ${({ $disabled }) => !$disabled && 'pointer'};
    text-decoration: none;
    background: ${({ $active, $disabled }) =>
      !$disabled &&
      ($active
        ? colors.interactive.primary__selected_hover.rgba
        : colors.interactive.primary__hover_alt.rgba)};
    > div > svg {
      fill: ${({ $disabled, $active }) =>
        !$disabled && !$active && colors.interactive.primary__hover.rgba};
    }
  }
`;

export const Link = createLink(AnchorTag);

export const IconContainer = styled.div`
  display: flex;
  padding: ${spacings.x_small};
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

interface ItemTextProps {
  $active: boolean;
  $disabled: boolean;
}

export const ItemText = styled(Typography)<ItemTextProps>`
  color: ${({ $disabled }) =>
    $disabled
      ? colors.interactive.disabled__text.rgba
      : colors.text.static_icons__default.rgba};
`;
