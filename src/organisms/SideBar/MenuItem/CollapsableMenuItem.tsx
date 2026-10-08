import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Icon, Menu, Tooltip, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import {
  Link as TanstackLink,
  useLocation,
  useMatchRoute,
} from '@tanstack/react-router';

import { usePrevious } from 'src/atoms/hooks/usePrevious';
import { colors, spacings } from 'src/atoms/style';
import {
  SideBarMenuItemWithItems,
  SideBarSubMenuItem,
} from 'src/atoms/types/SideBar';
import { TextField } from 'src/molecules/TextField/TextField';
import {
  IconContainer,
  ItemText,
  Link,
  MenuItemWrapper,
} from 'src/organisms/SideBar/MenuItem/MenuItem.styles';
import { useSideBar } from 'src/providers/SideBarProvider';

import styled, { css } from 'styled-components';

interface ParentProps {
  $open: boolean;
  $active: boolean;
  $expanded: boolean;
}

const Parent = styled.button<ParentProps>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-self: stretch;
  align-items: center;
  height: 64px;
  min-width: 64px;
  padding: ${spacings.medium};
  gap: ${spacings.medium};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  background: ${({ $active, $expanded }) => {
    if ($active) return colors.interactive.primary__selected_highlight.rgba;
    if ($expanded) return colors.interactive.table__header__fill_resting.rgba;
    return 'transparent';
  }};
  text-decoration: none;
  transition: background 0.1s ease-out;

  &:hover {
    text-decoration: none;
    background: ${({ $active, $expanded }) => {
      if ($active) return colors.interactive.primary__selected_hover.rgba;
      if ($expanded) return colors.ui.background__medium.rgba;
      return colors.interactive.primary__hover_alt.rgba;
    }};
    svg {
      fill: ${colors.interactive.primary__hover.rgba};
    }
  }

  ${({ $open }) =>
    !$open &&
    css`
      &:after {
        position: absolute;
        right: -7px; // 1px border offset from 8px width
        bottom: 0;
        height: 0;
        width: 0;
        border-color: transparent;
        border-bottom-color: ${colors.interactive.primary__resting.rgba};
        border-style: solid;
        border-width: 8px;
        content: '';
        z-index: 500;
      }
    `}
`;

const Child = styled(Link)`
  display: grid;
  grid-template-columns: 32px 1fr;
  height: unset;
  > p:first-child {
    grid-column: 2;
  }
`;

const StyledMenu = styled(Menu)`
  max-height: 80vh;
  overflow-y: auto;
`;

const PopupChild = styled(Child)`
  width: 256px;
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

const SearchField = styled(TextField)`
  width: 100%;
  min-width: 0;
`;

const EmptyResults = styled(Typography)`
  padding: ${spacings.medium};
`;

// Keep the input and results inside one component: EDS clones direct children
// with menu-item indexes, which do not apply to a searchable navigation list.
const SearchableSubMenu = ({
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
    <div ref={contentRef} onKeyDown={handleKeyDown}>
      <SearchField
        id={id}
        type="search"
        aria-label={`Search ${name}`}
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearch(event.target.value)
        }
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
    </div>
  );
};

export type CollapsableMenuItemProps = SideBarMenuItemWithItems;

export const CollapsableMenuItem: FC<CollapsableMenuItemProps> = ({
  icon,
  name,
  items,
  isSearchable = false,
  ...rest
}) => {
  const { pathname } = useLocation();
  const matchRoute = useMatchRoute();
  const previousPathname = usePrevious(pathname);
  const { isOpen } = useSideBar();
  const previousIsOpen = usePrevious(isOpen);
  const isActive = items.some((item) => !!matchRoute({ ...item }));
  const parentRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleOnToggleExpanded = () => setExpanded((prev) => !prev);

  useEffect(() => {
    if (
      (previousIsOpen && !isOpen && expanded) ||
      (previousPathname !== pathname && expanded && !isOpen)
    ) {
      setExpanded(false);
    }
  }, [expanded, isOpen, pathname, previousIsOpen, previousPathname]);

  const parentContent = useMemo(() => {
    return (
      <Tooltip title={isOpen ? '' : name} placement="right">
        <MenuItemWrapper>
          <Parent
            ref={parentRef}
            $open={isOpen}
            $active={isActive}
            $expanded={expanded}
            onClick={handleOnToggleExpanded}
            aria-label={name}
            aria-expanded={expanded}
            aria-haspopup={isOpen ? undefined : 'menu'}
            {...rest}
          >
            <IconContainer data-testid="icon-container">
              <Icon
                data={icon}
                size={24}
                color={colors.interactive.primary__resting.rgba}
              />
            </IconContainer>
            {isOpen && (
              <>
                <ItemText
                  $active={false}
                  $disabled={false}
                  variant="button"
                  group="navigation"
                >
                  {name}
                </ItemText>
                <Icon
                  data={expanded ? chevron_up : chevron_down}
                  size={24}
                  color={colors.interactive.primary__resting.rgba}
                />
              </>
            )}
          </Parent>
        </MenuItemWrapper>
      </Tooltip>
    );
  }, [expanded, icon, isActive, isOpen, name, rest]);

  if (expanded && isOpen) {
    return (
      <>
        {parentContent}
        {isSearchable ? (
          <SearchableSubMenu items={items} name={name} isOpen={isOpen} />
        ) : (
          items.map((item, index) => (
            <Child key={index} $disabled={item.disabled || false} {...item}>
              <ItemText
                $active={isActive}
                $disabled={item.disabled || false}
                variant="button"
                group="navigation"
              >
                {item.name}
              </ItemText>
            </Child>
          ))
        )}
      </>
    );
  }

  if (expanded) {
    return (
      <>
        {parentContent}
        <StyledMenu
          open
          anchorEl={parentRef.current}
          placement="right-start"
          onClose={handleOnToggleExpanded}
        >
          {isSearchable ? (
            <SearchableSubMenu items={items} name={name} isOpen={isOpen} />
          ) : (
            items.map((item) => (
              <Menu.Item
                as={TanstackLink}
                key={`${item.to}-${item.name}`}
                active={!!matchRoute({ ...item })}
                style={{ width: '256px' }}
                {...item}
              >
                {item.name}
              </Menu.Item>
            ))
          )}
        </StyledMenu>
      </>
    );
  }

  return parentContent;
};
