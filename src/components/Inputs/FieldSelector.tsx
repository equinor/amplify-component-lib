import { ChangeEvent, forwardRef, useMemo, useRef, useState } from 'react';

import {
  Button,
  Icon,
  Menu as EDSMenu,
  Search,
  Typography,
} from '@equinor/eds-core-react';
import { check, clear, exit_to_app, platform } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Field } from '../../types/Field';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Menu = styled(EDSMenu)`
  width: 17rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
  padding: ${spacings.comfortable.large};
  div[role='search'] {
    > div {
      outline: none !important;
    }
    input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.hex};
    }
  }
`;

const NoFieldsText = styled(Typography)`
  margin: 0 auto ${spacings.comfortable.medium};
`;

const ListContainer = styled.div`
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MenuItem = styled(Menu.Item)`
  &:hover {
    background: ${colors.interactive.primary__selected_hover.hex};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.hex};
  outline: none !important;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
`;

const MenuFixedItem = styled(Menu.Item)`
  ${(props) =>
    props.active &&
    `background: ${colors.interactive.primary__selected_highlight.hex};
     border-bottom: 1px solid ${colors.interactive.primary__resting.hex};
    `};
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
    width: 100%;
  }
  &:hover {
    background: ${colors.interactive.primary__selected_hover.hex};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.hex};
  outline: none !important;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
`;
const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.hex};
  display: flex;
  flex-direction: column;
  > p {
    margin-left: ${spacings.comfortable.large};
    margin-bottom: ${spacings.comfortable.small};
  }
`;

const MenuHeader = styled.li`
  padding: 0 ${spacings.comfortable.large};
  margin: ${spacings.comfortable.small} 0;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-between;
  > button {
    margin-left: -${spacings.comfortable.medium_small};
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
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const openMenu = () => {
      setOpen(true);
    };

    const closeMenu = () => setOpen(false);

    const handleOnClick = () => {
      if (open) closeMenu();
      else openMenu();
    };

    const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

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
        <Button variant="ghost_icon" ref={buttonRef} onClick={handleOnClick}>
          <Icon
            data={platform}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
        {open && (
          <Menu
            id="field-menu"
            anchorEl={buttonRef.current}
            open
            onClose={closeMenu}
          >
            <>
              <MenuSection>
                <MenuHeader>
                  <Typography variant="h6">Field selection</Typography>
                  <Button variant="ghost_icon" onClick={closeMenu}>
                    <Icon
                      data={clear}
                      size={24}
                      color={colors.text.static_icons__secondary.hex}
                    />
                  </Button>
                </MenuHeader>
                <Typography variant="overline">Current selection</Typography>
                {currentField && (
                  <MenuFixedItem active>
                    <TextContainer>
                      <Typography variant="h6">
                        {currentField.name?.toLowerCase()}
                      </Typography>
                    </TextContainer>
                    <Icon
                      data={check}
                      color={colors.interactive.primary__resting.hex}
                      size={24}
                    />
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
                  onClick={() =>
                    window.open('https://accessit.equinor.com/#', '_blank')
                  }
                >
                  <TextContainer>
                    <Typography variant="overline">Missing a field?</Typography>
                    <Typography variant="h6">Go to AccessIT</Typography>
                  </TextContainer>
                  <Icon
                    data={exit_to_app}
                    color={colors.interactive.primary__resting.hex}
                    size={24}
                  />
                </MenuFixedItem>
              )}
            </>
          </Menu>
        )}
      </div>
    );
  }
);

FieldSelector.displayName = 'FieldSelector';

export default FieldSelector;
