import { Menu } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface CustomMenuItemProps {
  $depth: number;
}

export const MenuItemMultiselect = styled(Menu.Item)<CustomMenuItemProps>`
  > div {
    display: grid;
    grid-template-columns:
      ${({ $depth }) => ($depth > 0 ? '24px '.repeat($depth) : '')}
      auto 1fr;
  }
`;

export const MenuItemParentSelect = styled(Menu.Item)<CustomMenuItemProps>`
  > div {
    display: grid;
    grid-template-columns:
      ${({ $depth }) => ($depth > 0 ? '24px '.repeat($depth) : '')}
      auto 1fr auto;
  }
`;

export const MenuItemSpacer = styled.hr`
  height: calc(100% + ${spacings.comfortable.medium} * 2);
  width: 2px;
  background: ${colors.ui.background__medium.rgba};
  justify-self: center;
`;
