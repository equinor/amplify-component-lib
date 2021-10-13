import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, ButtonProps, Icon, Typography } from '@equinor/eds-core-react';
import EquinorLogo from '../EquinorLogo';
import { dashboard, menu, add } from '@equinor/eds-icons';
import MenuItem, { MenuItemDto } from './MenuItem';
import Wellbore from '../Icons/wellbore';

const { colors, shape } = tokens;

interface IContainerProps {
  open: boolean;
}

const Container = styled.div<IContainerProps>`
  border-right: 2px solid ${colors.ui.background__medium.hsla};
  background-color: ${colors.ui.background__default.hsla};
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
  overflow: hidden;
  width: ${(props) => (props.open ? '256px' : '72px')};
  min-width: ${(props) => (props.open ? '256px' : '72px')};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
`;

const MenuButtonContainer = styled.div<IContainerProps>`
  display: ${(props) => (props.open ? 'grid' : 'flex')};
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
`;

interface IMenuToggleButtonProps extends ButtonProps {
  open?: boolean;
}

const MenuToggleButton = styled(Button)<IMenuToggleButtonProps>`
  background: transparent;
  grid-column: 2 / 8;
`;

interface INewWellBoreButtonProps extends ButtonProps {
  open?: boolean;
}

const CreateNewButton = styled(Button)<INewWellBoreButtonProps>`
  background: ${colors.interactive.primary__resting.hsla};
  width: ${(props) => props.open && '100%'};
  border-radius: ${(props) => props.open && shape.icon_button.borderRadius};
  grid-column: 2 / 8;

  &:hover {
    border-radius: ${(props) => props.open && shape.icon_button.borderRadius};
  }
`;

const CreateNewButtonText = styled(Typography)`
  font-size: 12px;
`;

const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const menuItems: Array<MenuItemDto> = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Wellbore', icon: Wellbore, link: '/wellbore' },
  ];

  return (
    <Container open={open}>
      <TopContainer>
        <MenuButtonContainer open={open}>
          <MenuToggleButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            variant="ghost_icon"
          >
            <Icon
              data={menu}
              color={colors.interactive.primary__resting.hsla}
            />
          </MenuToggleButton>
        </MenuButtonContainer>
        <MenuButtonContainer open={open}>
          <CreateNewButton
            open={open}
            variant={open ? 'contained' : 'ghost_icon'}
            href="/add"
          >
            <Icon data={add} color={colors.ui.background__default.hsla} />
            {open && (
              <CreateNewButtonText
                color={colors.text.static_icons__primary_white.hsla}
                variant="body_short"
              >
                Create new wellbore
              </CreateNewButtonText>
            )}
          </CreateNewButton>
        </MenuButtonContainer>
        {menuItems.map((m) => (
          <MenuItem key={m.name} open={open} data={m} currentUrl="" />
        ))}
      </TopContainer>
      <LogoContainer>
        <EquinorLogo />
      </LogoContainer>
    </Container>
  );
};

export default SideBar;
