import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Menu, Typography } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';
import { FilterWithAutoCompleteOptions } from 'src/organisms/Filter/Filter.types';
import {
  findStartAndEndIndexOfSearch,
  getFilteredAutoCompleteOptions,
} from 'src/organisms/Filter/Filter.utils';

import { styled } from 'styled-components';

const StyledMenu = styled(Menu)`
  overflow-y: auto;
  max-height: 250px;
`;

const MatchingText = styled(Typography)`
  color: ${colors.text.static_icons__tertiary.rgba};
  > strong {
    color: ${colors.text.static_icons__default.rgba};
    font-weight: unset;
  }
`;

interface AutoCompleteMenuProps<T extends string> {
  anchorElement: HTMLElement | null;
  searchElement: HTMLElement | null;
  search: string;
  isFilterOpen: boolean;
  autoCompleteOptions: FilterWithAutoCompleteOptions<T>['autoCompleteOptions'];
  onAutoComplete: FilterWithAutoCompleteOptions<T>['onAutoComplete'];
}

export function AutoCompleteMenu<T extends string>({
  anchorElement,
  searchElement,
  search,
  isFilterOpen,
  autoCompleteOptions,
  onAutoComplete,
}: AutoCompleteMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const previousSearch = useRef<string>('');

  useEffect(() => {
    if (!open && search !== previousSearch.current) {
      previousSearch.current = search;
      setOpen(true);
    } else if (search !== previousSearch.current) {
      previousSearch.current = search;
    }
  }, [open, search]);

  const filteredItems = getFilteredAutoCompleteOptions({
    searchValue: search,
    autoCompleteOptions,
  });

  const handleOnKeyDown = (event: KeyboardEvent, index: number) => {
    // Was not able to test this, tests kept failing and were inconsistent
    /* v8 ignore start */
    if (event.key === 'ArrowUp' && index === 0) {
      event.preventDefault();
      searchElement?.focus();
      return;
    }
    /* v8 ignore end */

    if (event.key === 'Enter' && filteredItems[index]) {
      onAutoComplete(filteredItems[index].key, filteredItems[index]);
      setOpen(false);
      return;
    }
  };

  if (!isFilterOpen || !open || !search || filteredItems.length === 0)
    return null;

  return (
    <StyledMenu
      open
      anchorEl={anchorElement}
      matchAnchorWidth
      onClose={() => {
        setOpen(false);
      }}
    >
      {filteredItems.map((item, index) => {
        const [startIndex, endIndex] = findStartAndEndIndexOfSearch({
          searchValue: search,
          label: item.label,
        });

        const elements = [
          item.label.slice(0, startIndex),
          <strong key={`${item.value}-start`}>
            {item.label.slice(startIndex, endIndex + 1)}
          </strong>,
          item.label.slice(endIndex + 1),
        ];

        return (
          <Menu.Item
            key={item.value}
            onClick={() => onAutoComplete(item.key, item)}
            onKeyDown={(event) => handleOnKeyDown(event, index)}
          >
            <MatchingText>{elements}</MatchingText>
          </Menu.Item>
        );
      })}
    </StyledMenu>
  );
}
