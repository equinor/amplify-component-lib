import { Button, ButtonProps } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, shape } = tokens;

interface MenuItemContainerProps {
  $active?: boolean;
}

export const MenuItemContainer = styled.div<MenuItemContainerProps>`
  display: flex;
  align-self: stretch;
  align-items: center;
  height: 64px;
  padding: 0 14px;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  box-sizing: border-box;
  ${({ $active }) =>
    $active &&
    `background: ${colors.interactive.primary__selected_highlight.rgba};`}
`;

interface CreateButtonProps extends ButtonProps {
  $open?: boolean;
}

export const CreateButton = styled(Button)<CreateButtonProps>`
  width: ${(props) => (props.$open ? 'fit-content' : '36px')};
  height: 36px;
  border-radius: ${shape.icon_button.borderRadius};
  transition: 0.1s ease-out;
  &:hover {
    border-radius: ${shape.icon_button.borderRadius};
  }
  &:disabled {
    border: 0 solid transparent;
  }
  > span {
    ${(props) => props.$open && 'margin-left: -11px'};
  }
`;
