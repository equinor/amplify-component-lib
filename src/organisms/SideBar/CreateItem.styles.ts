import { Button, ButtonProps } from '@equinor/eds-core-react';

import { shape, spacings } from 'src/atoms';

import styled from 'styled-components';

export const MenuItemContainer = styled.div`
  display: flex;
  align-self: stretch;
  box-sizing: border-box;
  padding-top: ${spacings.medium};
  padding-left: 14px;
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
