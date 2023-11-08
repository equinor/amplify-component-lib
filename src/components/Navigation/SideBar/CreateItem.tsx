import { FC } from 'react';

import {
  Button,
  ButtonProps,
  Icon,
  Tooltip as EDSTooltip,
  Typography,
} from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { backgroundColor, hoverColor, textColor } from './CreateItem.utils';
import { borderBottomColor } from './MenuItem.utils';
import { SidebarTheme } from './SideBar.types';
import { useSideBar } from 'src/providers/SideBarProvider';

import styled from 'styled-components';

const { colors, shape, spacings } = tokens;

interface ContainerProps {
  $theme: SidebarTheme;
  $open: boolean;
}

const MenuButtonContainer = styled.div<ContainerProps>`
  display: ${(props) => (props.$open ? 'grid' : 'flex')};
  grid-template-columns: repeat(9, 1fr);
  justify-content: center;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid ${({ $theme }) => borderBottomColor($theme)};
  box-sizing: border-box;
`;

interface CustomButtonProps extends ButtonProps {
  $theme: SidebarTheme;
  $open?: boolean;
}

const CreateNewButton = styled(Button)<CustomButtonProps>`
  width: ${(props) => (props.$open ? 'fit-content' : '40px')};
  height: ${(props) => (props.$open ? '36px' : '40px')};
  background: ${({ $theme }) => backgroundColor($theme)};
  border-color: ${({ $theme }) => backgroundColor($theme)};
  border-radius: ${(props) => props.$open && shape.icon_button.borderRadius};
  grid-column: 3;
  box-sizing: border-box;
  ${(props) =>
    props.$open &&
    `
  padding-right: ${spacings.comfortable.large};
  margin-left: -2px; /* border size */
  `};
  p {
    color: ${({ $theme }) => textColor($theme)};
  }
  svg {
    fill: ${({ $theme }) => textColor($theme)};
  }

  &:hover:not([disabled]) {
    border-radius: ${(props) => props.$open && shape.icon_button.borderRadius};
    background: ${({ $theme }) => hoverColor($theme, false)};
  }
  &:disabled:hover,
  &:disabled {
    border-radius: ${(props) => props.$open && shape.icon_button.borderRadius};
    background: ${({ $theme }) => hoverColor($theme, true)};
    border: 0 solid transparent;
    ${({ $theme }) =>
      $theme === SidebarTheme.dark &&
      `
    p {
      color: #637583;
    }
    svg { 
      fill: #637583;
    };
    `}
  }
`;

const CreateNewButtonText = styled(Typography)`
  font-weight: 400;
  text-transform: lowercase;
  white-space: nowrap;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const Tooltip = styled(EDSTooltip)`
  &::first-letter {
    text-transform: uppercase;
  }
`;

interface CreateItemProps {
  theme: SidebarTheme;
  createLabel: string;
  onCreate: () => void;
  disabled?: boolean;
}

const CreateItem: FC<CreateItemProps> = ({
  theme,
  createLabel,
  onCreate,
  disabled = false,
}) => {
  const { isOpen } = useSideBar();
  if (isOpen) {
    return (
      <MenuButtonContainer $theme={theme} $open={isOpen}>
        <CreateNewButton
          $open
          $theme={theme}
          variant="contained"
          onClick={onCreate}
          disabled={disabled}
        >
          <Icon data={add} />
          <CreateNewButtonText
            color={colors.text.static_icons__primary_white.hsla}
            variant="button"
            group="navigation"
          >
            {createLabel}
          </CreateNewButtonText>
        </CreateNewButton>
      </MenuButtonContainer>
    );
  }
  return (
    <Tooltip title={createLabel} placement="right">
      <MenuButtonContainer $theme={theme} $open={isOpen}>
        <CreateNewButton
          $theme={theme}
          variant="ghost_icon"
          onClick={onCreate}
          disabled={disabled}
        >
          <Icon data={add} />
        </CreateNewButton>
      </MenuButtonContainer>
    </Tooltip>
  );
};

export default CreateItem;
