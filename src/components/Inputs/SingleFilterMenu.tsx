import React, { FC, MouseEvent, useState } from 'react';

import {
  Button,
  Chip as EDSChip,
  Icon,
  Menu as EdsMenu,
  Typography,
} from '@equinor/eds-core-react';
import { filter_list, IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Container = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 25px;
`;

interface ChipProps {
  backgroundColor: string;
}

const Chip = styled(EDSChip)<ChipProps>`
  background: ${(props) => props.backgroundColor};
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

export interface SingleFilterMenuProps {
  onChange: (selectedId: string | undefined | null) => void;
  customIcon?: IconData;
  menuTitle: string;
  data: Array<string>;
  showChip?: boolean;
  chipColor?: string;
}

const SingleFilterMenu: FC<SingleFilterMenuProps> = ({
  onChange,
  customIcon,
  menuTitle,
  data,
  showChip = false,
  chipColor = colors.ui.background__default.hex,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null
  );
  const [selectedName, setSelectedName] = useState<string | undefined | null>();

  const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setButtonElement(target);
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  const handleSelect = (selected: string | undefined | null) => {
    setShowMenu(false);
    if (selectedName === selected) {
      setSelectedName(undefined);
      onChange(undefined);
    } else {
      setSelectedName(selected);
      onChange(selected);
    }
  };

  const clearFilter = () => {
    closeMenu();
    onChange(undefined);
    setSelectedName(undefined);
  };

  return (
    <Container>
      {showChip && selectedName && (
        <Chip
          data-testid="chip"
          onDelete={clearFilter}
          variant="default"
          backgroundColor={chipColor}
        >
          {selectedName}
        </Chip>
      )}
      <FilterButton
        data-testid="menuButton"
        variant="ghost_icon"
        onClick={(e: MouseEvent<HTMLButtonElement>) => openMenu(e)}
      >
        <Icon data={customIcon ?? filter_list} />
      </FilterButton>
      <Menu
        open={showMenu}
        anchorEl={buttonElement}
        onClose={closeMenu}
        placement="bottom-end"
        data-testid="menuContainer"
      >
        <MenuTitleContainer>
          <Typography group="navigation" variant="label">
            {menuTitle}
          </Typography>
        </MenuTitleContainer>
        {data.map((item: string, index: number) => (
          <MenuItem
            key={item + index}
            onClick={() => handleSelect(item)}
            disabled={selectedName === item && showChip}
            active={selectedName === item && !showChip}
          >
            <Typography group="navigation" variant="menu_title" as="span">
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};
SingleFilterMenu.displayName = 'FilterMenu';

export default SingleFilterMenu;
