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

import {
  ListContainer,
  MenuFixedItem,
  MenuItem,
  MenuSection,
  NoFieldsText,
  NoSearchResultsContainer,
  SearchContainer,
  TextContainer,
} from './FieldMenu.styles';
import { Field } from 'src/atoms/types/Field';
import { TopBarButton } from 'src/organisms/TopBar/TopBar.styles';
import { useTopBarInternalContext } from 'src/organisms/TopBar/TopBarInternalContextProvider';
import { TopBarMenu } from 'src/organisms/TopBar/TopBarMenu';

const { colors } = tokens;

export interface FieldMenuProps {
  availableFields: Field[];
  onSelect: (selectedField: Field) => void;
  itemNameSingular?: string; // Defaults to 'field'
  showAccessITLink?: boolean;
}

export const FieldMenu = forwardRef<HTMLDivElement, FieldMenuProps>(
  (
    {
      availableFields,
      onSelect,
      itemNameSingular = 'field',
      showAccessITLink = true,
    },
    ref
  ) => {
    const { selectedField } = useTopBarInternalContext();
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    const filteredFields = useMemo(() => {
      if (searchValue === '')
        return availableFields.filter(
          (field) =>
            field.name?.toLowerCase() !== selectedField?.name?.toLowerCase()
        );

      return availableFields.filter((field) =>
        field.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [availableFields, searchValue, selectedField]);

    const noSearchResult = useMemo(() => {
      return filteredFields.length === 0 && availableFields.length > 1;
    }, [availableFields.length, filteredFields.length]);

    const transformedFieldName = useMemo(() => {
      if (selectedField?.name) {
        return (
          selectedField.name.charAt(0).toUpperCase() +
          selectedField.name.slice(1)
        );
      }
    }, [selectedField?.name]);

    const showSearchInput = filteredFields.length >= 4;

    if (!selectedField) return null;

    return (
      <div ref={ref}>
        <TopBarButton
          variant="ghost"
          ref={buttonRef}
          onClick={toggleMenu}
          data-testid="field-selector-top-bar-button"
          $fieldSelector
        >
          <Icon data={platform} size={24} />
          {transformedFieldName}
          <Icon data={isOpen ? arrow_drop_up : arrow_drop_down} />
        </TopBarButton>
        <TopBarMenu
          open={isOpen}
          title="Field Selection"
          onClose={closeMenu}
          anchorEl={buttonRef.current}
          contentPadding={false}
        >
          <section>
            <MenuSection>
              {showSearchInput && (
                <SearchContainer>
                  <Search
                    autoFocus
                    placeholder="Search fields"
                    value={searchValue}
                    onChange={handleSearchOnChange}
                  />
                </SearchContainer>
              )}

              <ListContainer>
                {selectedField && !noSearchResult && searchValue === '' && (
                  <MenuFixedItem $active>
                    <div>
                      <TextContainer>
                        <Typography variant="h6">
                          {selectedField.name?.toLowerCase()}
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
                {noSearchResult ? (
                  <NoSearchResultsContainer>
                    <NoFieldsText
                      variant="body_short"
                      color={colors.text.static_icons__tertiary.rgba}
                    >
                      No {itemNameSingular}s matching your search
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
                    <Typography variant="overline">
                      Missing a {itemNameSingular}?
                    </Typography>
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
          </section>
        </TopBarMenu>
      </div>
    );
  }
);

FieldMenu.displayName = 'FieldSelector';
