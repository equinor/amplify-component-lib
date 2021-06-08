import {
  Button,
  Chip,
  Icon,
  Menu as EdsMenu,
  Typography,
} from "@equinor/eds-core-react";
import { IconData } from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import React, { useState } from "react";
import styled from "styled-components";

const { colors, spacings } = tokens;

const Container = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 25px;
`;

const StyledChip = styled(Chip)`
  background: white;
`;

const FilterButton = styled(Button)`
  justify-self: flex-end;
`;

const Menu = styled(EdsMenu)`
  overflow-y: auto;
`;

const MenuTitleContainer = styled.div`
  padding: ${spacings.comfortable.medium};
  padding-left: ${spacings.comfortable.large};
`;

const MenuItem = styled(Menu.Item)`
  &:focus {
    outline: none;
    background: ${colors.ui.background__light.hsla};
  }
`;

export interface IComponentProps {
  onChange: (selectedId: string | undefined | null) => void;
  icon: IconData;
  menuTitle: string;
  data: Array<string>;
}

const FilterMenu: React.FC<IComponentProps> = ({
  onChange,
  icon,
  menuTitle,
  data
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement>();
  const [selectedName, setSelectedName] = useState<string | undefined | null>();

  const openMenu = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement;
    setButtonElement(target);
    setShowMenu(!showMenu);
  };

  const handleSelect = (selected: string | undefined | null) => {
    setShowMenu(false);
    setSelectedName(selected);
    onChange(selected);
  };

  const clearFilter = () => {
    closeMenu();
    onChange(undefined);
    setSelectedName(undefined);
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <Container>
      {selectedName && (
        <StyledChip data-testid="chip" onDelete={clearFilter} variant="default">
          {selectedName}
        </StyledChip>
      )}
      <FilterButton data-testid="menuButton" variant="ghost_icon" onClick={(e) => openMenu(e)}>
        <Icon data={icon} />
      </FilterButton>
      <Menu
        open={showMenu}
        anchorEl={buttonElement!}
        onClose={closeMenu}
        placement="bottom-end"
        data-testid="menuContainer"
      >
        <MenuTitleContainer>
          <Typography group="navigation" variant="label">
            {menuTitle}
          </Typography>
        </MenuTitleContainer>
        {data.map((item: string, index) => (
          <MenuItem key={item + index} onClick={() => handleSelect(item)}>
            <Typography group="navigation" variant="menu_title" as="span">
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};
export default FilterMenu;
