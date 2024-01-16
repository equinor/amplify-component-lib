import { ChangeEvent, forwardRef, useMemo, useRef, useState } from 'react';

import { Button, Icon, Search, Typography } from '@equinor/eds-core-react';
import { check, clear, exit_to_app, platform } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import TopBarMenu from './TopBarMenu';
import { spacings } from 'src/style';
import { Field } from 'src/types/Field';

import styled from 'styled-components';
const { colors } = tokens;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  padding: ${spacings.large};
  div[role='search'] {
    > div {
      outline: none !important;
    }
    input {
      color: ${colors.text.static_icons__default.rgba};
    }
    input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.rgba};
    }
  }
`;

const NoFieldsText = styled(Typography)`
  margin: 0 auto ${spacings.medium};
`;

const ListContainer = styled.div`
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

interface MenuItemProps {
  $active?: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  &:hover {
    background: ${colors.interactive.primary__selected_hover.rgba};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.rgba};
  outline: none !important;
  padding: ${spacings.medium} ${spacings.large};
`;

const MenuFixedItem = styled.div<MenuItemProps>`
  ${(props) =>
    props.$active &&
    `background: ${colors.interactive.primary__selected_highlight.rgba};
     border-bottom: 1px solid ${colors.interactive.primary__resting.rgba};
    `};
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
    width: 100%;
  }
  &:hover {
    background: ${colors.interactive.primary__selected_hover.rgba};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.rgba};
  outline: none !important;
  padding: ${spacings.medium} ${spacings.large};
  svg {
    align-self: center;
  }
`;

const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.rgba};
  display: flex;
  flex-direction: column;
  > p {
    margin-left: ${spacings.large};
    margin-bottom: ${spacings.small};
  }
`;

const MenuHeader = styled.li`
  padding: 0 ${spacings.large};
  margin: ${spacings.small} 0;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-between;
  > button {
    margin-left: -${spacings.medium_small};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;

export type FieldSelectorType = {
  currentField?: Field;
  availableFields: Array<Field>;
  onSelect: (selectedField: Field) => void;
  showAccessITLink?: boolean;
};

const FieldSelector = forwardRef<HTMLDivElement, FieldSelectorType>(
  (
    { currentField, availableFields, onSelect, showAccessITLink = true },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    useOutsideClick(menuRef.current, (e) => {
      if (buttonRef.current === e.target) return;

      setIsOpen(false);
    });

    const filteredFields = useMemo(() => {
      const fieldItems = availableFields.filter(
        (field) => currentField?.uuid !== field?.uuid
      );
      if (searchValue === '') return fieldItems;
      return fieldItems.filter((field) =>
        field.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [availableFields, currentField?.uuid, searchValue]);

    return (
      <div ref={ref}>
        <Button variant="ghost_icon" ref={buttonRef} onClick={toggleMenu}>
          <Icon
            data={platform}
            size={24}
            color={colors.interactive.primary__resting.rgba}
          />
        </Button>
        <TopBarMenu
          open={isOpen}
          title="Field Selector"
          onClose={closeMenu}
          anchorEl={buttonRef.current}
          contentPadding={false}
          ref={menuRef}
        >
          <>
            <MenuSection>
              <MenuHeader>
                <Typography variant="h6">Field selection</Typography>
                <Button variant="ghost_icon" onClick={closeMenu}>
                  <Icon
                    data={clear}
                    size={24}
                    color={colors.text.static_icons__secondary.rgba}
                  />
                </Button>
              </MenuHeader>
              <Typography variant="overline">Current selection</Typography>
              {currentField && (
                <MenuFixedItem $active>
                  <div>
                    <TextContainer>
                      <Typography variant="h6">
                        {currentField.name?.toLowerCase()}
                      </Typography>
                    </TextContainer>
                    <Icon
                      data={check}
                      color={colors.interactive.primary__resting.rgba}
                      size={24}
                    />
                  </div>
                </MenuFixedItem>
              )}
              <SearchContainer>
                <Typography variant="overline">Switch to</Typography>
                <Search
                  placeholder="Search fields"
                  value={searchValue}
                  onChange={handleSearchOnChange}
                />
              </SearchContainer>
              <ListContainer>
                {filteredFields.length === 0 ? (
                  <NoFieldsText variant="body_short">
                    No fields matching your search
                  </NoFieldsText>
                ) : (
                  filteredFields.map((field) => (
                    <MenuItem
                      key={field.uuid}
                      onClick={() => {
                        onSelect(field);
                        closeMenu();
                      }}
                    >
                      <TextContainer>
                        <Typography variant="h6">
                          {field.name?.toLowerCase()}
                        </Typography>
                      </TextContainer>
                    </MenuItem>
                  ))
                )}
              </ListContainer>
            </MenuSection>
            {showAccessITLink && (
              <MenuFixedItem
                data-testid="access-it-link"
                onClick={() =>
                  window.open('https://accessit.equinor.com/#', '_blank')
                }
              >
                <div>
                  <TextContainer>
                    <Typography variant="overline">Missing a field?</Typography>
                    <Typography variant="h6">Go to AccessIT</Typography>
                  </TextContainer>
                  <Icon
                    data={exit_to_app}
                    color={colors.interactive.primary__resting.rgba}
                    size={24}
                  />
                </div>
              </MenuFixedItem>
            )}
          </>
        </TopBarMenu>
      </div>
    );
  }
);

FieldSelector.displayName = 'FieldSelector';

export default FieldSelector;
