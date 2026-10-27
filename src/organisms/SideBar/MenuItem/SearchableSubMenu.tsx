import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Child, ItemText } from './MenuItem.styles';
import { colors, spacings } from 'src/atoms/style';
import { SideBarSubMenuItem } from 'src/atoms/types/SideBar';
import { Search } from 'src/molecules/Search/Search';

import styled from 'styled-components';

const SearchContainer = styled.div<{ $isOpen: boolean }>`
  align-self: stretch;
  width: ${({ $isOpen }) => ($isOpen ? '100%' : '256px')};
  min-width: 0;
`;

const PopupChild = styled(Child)`
  width: 100%;
  min-width: 0;
  display: block;
  border-bottom: 0;
  color: ${colors.text.static_icons__default.rgba};

  &[data-status='active'] {
    color: ${colors.interactive.primary__resting.rgba};
  }

  &:focus-visible {
    outline: 2px dashed ${colors.interactive.focus.rgba};
    outline-offset: -2px;
  }

  &[aria-disabled='true'] {
    color: ${colors.interactive.disabled__text.rgba};
  }
`;

const SearchField = styled(Search)`
  width: 100%;
  min-width: 0;
  /* Keep the clear button's oversized hit area from overflowing the menu. */
  overflow: clip;
`;

const EmptyResults = styled(Typography)`
  padding: ${spacings.medium};
`;

// Keep the input and results inside one component: EDS clones direct children
// with menu-item indexes, which do not apply to a searchable navigation list.
export const SearchableSubMenu = ({
  items,
  name,
  isOpen,
}: {
  items: SideBarSubMenuItem[];
  name: string;
  isOpen: boolean;
}) => {
  const id = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // The popover is hidden at mount; focus after EDS has shown it.
    const frame = requestAnimationFrame(() => {
      contentRef.current?.querySelector('input')?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const query = search.trim().toLowerCase();
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      isOpen ||
      !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
    ) {
      return;
    }

    const input = event.currentTarget.querySelector('input');
    const isInput = event.target === input;
    // Home/End should still move the caret while editing the search query.
    if (isInput && ['Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();
    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLAnchorElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      )
    );
    if (links.length === 0) return;

    const currentIndex = links.indexOf(event.target as HTMLAnchorElement);
    let nextIndex: number;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = links.length - 1;
    else if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % links.length;
    } else {
      nextIndex = (currentIndex - 1 + links.length) % links.length;
      if (isInput) nextIndex = links.length - 1;
    }
    links[nextIndex].focus();
  };

  return (
    <SearchContainer
      $isOpen={isOpen}
      ref={contentRef}
      onKeyDown={handleKeyDown}
    >
      <SearchField
        id={id}
        type="search"
        aria-label={`Search ${name}`}
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
          if (event.target.value === '') event.target.focus();
        }}
      />
      {filteredItems.length === 0 && (
        <EmptyResults role="status" aria-label="Search results">
          No matching items
        </EmptyResults>
      )}
      {filteredItems.map((item) =>
        isOpen ? (
          <Child
            key={`${item.to}-${item.name}`}
            aria-disabled={item.disabled || undefined}
            tabIndex={item.disabled ? -1 : 0}
            $disabled={!!item.disabled}
            {...item}
          >
            <ItemText
              $active={false}
              $disabled={!!item.disabled}
              variant="button"
              group="navigation"
            >
              {item.name}
            </ItemText>
          </Child>
        ) : (
          <PopupChild
            key={`${item.to}-${item.name}`}
            role="menuitem"
            aria-disabled={item.disabled || undefined}
            tabIndex={item.disabled ? -1 : 0}
            $disabled={!!item.disabled}
            {...item}
          >
            {item.name}
          </PopupChild>
        )
      )}
    </SearchContainer>
  );
};
