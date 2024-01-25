import { ChangeEvent, forwardRef, useMemo, useRef, useState } from 'react';

import { Icon, Search, Typography } from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  check,
  exit_to_app,
  platform,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { TopBarButton } from './TopBar.styles';
import TopBarMenu from './TopBarMenu';
import { spacings } from 'src/style';
import { Field } from 'src/types/Field';

import styled from 'styled-components';
const { colors } = tokens;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  //gap: ${spacings.small};
  padding: ${spacings.medium_small} ${spacings.medium};
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
     // border-bottom: 1px solid ${colors.interactive.primary__resting.rgba};
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

const NoSearchResultsContainer = styled.div`
  padding-top: ${spacings.small};
  display: flex;
  align-items: center;
  padding-bottom: ${spacings.xxx_large};
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

    const noSearchResult = useMemo(() => {
      return filteredFields.length === 0;
    }, [filteredFields.length]);

    const transformedFieldName = useMemo(() => {
      if (currentField?.name) {
        return (
          currentField?.name?.charAt(0).toUpperCase() +
          currentField?.name?.slice(1)
        );
      }
    }, [currentField?.name]);

    const showSearchInput = useMemo(() => {
      const hasMatch = filteredFields.filter((field) =>
        field.name?.toLowerCase().includes(searchValue.toLowerCase())
      );

      return (filteredFields.length >= 4 && !hasMatch) || hasMatch;
    }, [filteredFields, searchValue]);

    return (
      <div ref={ref}>
        <TopBarButton
          variant="ghost"
          ref={buttonRef}
          onClick={toggleMenu}
          $isSelected={isOpen}
        >
          <Icon
            data={platform}
            size={24}
            color={colors.interactive.primary__resting.rgba}
          />
          {transformedFieldName}
          <Icon data={isOpen ? arrow_drop_up : arrow_drop_down} />
        </TopBarButton>
        <TopBarMenu
          open={isOpen}
          title="Field Selection"
          onClose={closeMenu}
          anchorEl={buttonRef.current}
          contentPadding={false}
          ref={menuRef}
        >
          <>
            <MenuSection>
              {showSearchInput || noSearchResult ? (
                <SearchContainer>
                  <Search
                    placeholder="Search fields"
                    value={searchValue}
                    onChange={handleSearchOnChange}
                  />
                </SearchContainer>
              ) : (
                <></>
              )}

              <ListContainer>
                {currentField && !noSearchResult && (
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
                {filteredFields.length === 0 ? (
                  <NoSearchResultsContainer>
                    <NoFieldsText
                      variant="body_short"
                      color={colors.text.static_icons__tertiary.rgba}
                    >
                      No fields matching your search
                    </NoFieldsText>
                  </NoSearchResultsContainer>
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
            {showAccessITLink && !noSearchResult && (
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
