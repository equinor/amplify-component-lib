import { Button, ButtonProps } from '@equinor/eds-core-react';

import { colors, shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

interface MenuItemContainerProps {
  $active?: boolean;
}

export const MenuItemContainer = styled.div<MenuItemContainerProps>`
  display: flex;
  align-self: stretch;
  box-sizing: border-box;
  padding: ${spacings.medium_small} 0 ${spacings.medium_small} 14px;
  background: ${({ $active }) =>
    $active
      ? colors.interactive.primary__selected_highlight.rgba
      : 'transparent'};
  cursor: pointer;
  &:has(button:disabled) {
    cursor: not-allowed;
  }
  &:hover:not(:has(button:disabled)) {
    background: ${({ $active }) =>
      $active
        ? colors.interactive.primary__selected_hover.rgba
        : colors.interactive.primary__hover_alt.rgba};

    > button {
      border-color: ${colors.interactive.primary__hover.rgba};
      background: ${colors.interactive.primary__hover.rgba};
    }
  }
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
