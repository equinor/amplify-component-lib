import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import EquinorLogo from '../EquinorLogo';
import MenuItem, { MenuItemType } from './MenuItem';
import ToggleOpen from './ToggleOpen';
import CreateItem from './CreateItem';

const { colors, spacings } = tokens;
interface ContainerProps {
  open: boolean;
}

const Container = styled.div<ContainerProps>`
  border-right: 1px solid ${colors.ui.background__medium.hsla};
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
  border-top: 1px solid ${colors.ui.background__medium.hex};
  padding-top: ${spacings.comfortable.large};
`;

const TopContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  align-items: center;
`;

interface SideBarProps {
  onCreate?: () => void;
  createLabel?: string;
  menuItems: MenuItemType[];
  currentUrl?: string;
}

const SideBar: React.FC<SideBarProps> = ({
  onCreate,
  createLabel,
  menuItems,
  currentUrl,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Container open={open}>
      <TopContainer>
        {onCreate && createLabel && (
          <CreateItem
            open={open}
            createLabel={createLabel}
            onCreate={onCreate}
          />
        )}
        {menuItems.map((m) => (
          <MenuItem key={m.name} currentUrl={currentUrl} open={open} {...m} />
        ))}
      </TopContainer>
      <ToggleOpen open={open} setOpen={setOpen} />
      <LogoContainer>
        <EquinorLogo />
      </LogoContainer>
    </Container>
  );
};

export default SideBar;
