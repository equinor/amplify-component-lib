import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, ButtonProps, Icon, Typography } from '@equinor/eds-core-react';
import EquinorLogo from '../EquinorLogo';
import { add } from '@equinor/eds-icons';
import MenuItem, { MenuItemType } from './MenuItem';
import ToggleOpen from './ToggleOpen';

const { colors, shape, spacings } = tokens;
interface ContainerProps {
  open: boolean;
}

const Container = styled.div<ContainerProps>`
  border-right: 2px solid ${colors.ui.background__medium.hsla};
  background-color: ${colors.ui.background__default.hsla};
  display: flex;
  flex-direction: column;
  padding-bottom: ${spacings.comfortable.large};
  overflow: hidden;
  width: ${(props) => (props.open ? '256px' : '72px')};
  min-width: ${(props) => (props.open ? '256px' : '72px')};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 2px solid ${colors.ui.background__medium.hex};
  padding-top: ${spacings.comfortable.large};
`;

const ToggleContainer = styled.div<ContainerProps>`
  display: ${(props) => (props.open ? 'grid' : 'flex')};
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
  margin-top: auto;
  margin-bottom: ${spacings.comfortable.medium};
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
`;

const MenuButtonContainer = styled.div<ContainerProps>`
  display: ${(props) => (props.open ? 'grid' : 'flex')};
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
`;
interface CustomButtonProps extends ButtonProps {
  open?: boolean;
}

const CreateNewButton = styled(Button)<CustomButtonProps>`
  background: ${colors.interactive.primary__resting.hsla};
  width: ${(props) => props.open && '100%'};
  border-radius: ${(props) => props.open && shape.icon_button.borderRadius};
  grid-column: 2;
  ${(props) =>
    props.open &&
    `
  padding-right: ${spacings.comfortable.large}
  `};

  &:hover {
    border-radius: ${(props) => props.open && shape.icon_button.borderRadius};
  }
`;

const CreateNewButtonText = styled(Typography)`
  font-weight: 400;
`;

interface SideBarProps {
  onCreate?: () => void;
  createLabel?: string;
  menuItems: MenuItemType[];
}

const SideBar: React.FC<SideBarProps> = ({
  onCreate,
  createLabel,
  menuItems,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Container open={open}>
      <TopContainer>
        {onCreate && createLabel && (
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
                  variant="button"
                  group="navigation"
                >
                  {createLabel}
                </CreateNewButtonText>
              )}
            </CreateNewButton>
          </MenuButtonContainer>
        )}
        {menuItems.map((m) => (
          <MenuItem key={m.name} open={open} {...m} currentUrl="" />
        ))}
      </TopContainer>
      <ToggleContainer open={open}>
        <ToggleOpen open={open} setOpen={setOpen} />
      </ToggleContainer>
      <LogoContainer>
        <EquinorLogo />
      </LogoContainer>
    </Container>
  );
};

export default SideBar;
