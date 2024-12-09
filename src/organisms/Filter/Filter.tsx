import { KeyboardEvent, useRef, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  clear,
  filter_list,
} from '@equinor/eds-icons';

import {
  Container,
  Content,
  SearchField,
  StyledChip,
  Wrapper,
} from './Filter.styles';
import { colors } from 'src/atoms/style/colors';
import { FilterProps } from 'src/organisms/Filter/Filter.types';
import { QuickFilter } from 'src/organisms/Filter/QuickFilter';
import { Sorting } from 'src/organisms/Filter/Sorting';

import { AnimatePresence } from 'framer-motion';

/**
 * @param values - Array of values to display as chips ({ value: string, label: string, icon?: IconData }[])
 * @param search - The current search value
 * @param onSearchChange - Callback when search changes
 * @param onSearchEnter - Callback when users hit {Enter} in the search field
 * @param onClearFilter - Function to call when the user clicks the delete button on a chip
 * @param onClearAllFilters - Function to call when the user clicks the clear filters button
 * @param children - ReactNode or ReactNode[] to display below when the filter is open
 * @param initialOpen - Whether the filter should be open by default, defaults to false
 * @param placeholder - Placeholder text for the search input, defaults to 'Search...'
 * @param id - ID for the search field
 * @param showClearFiltersButton - Whether to show the clear filters button, defaults to true
 * - Sorting props
 * @param sortValue - The current sort value
 * @param onSortChange - Callback when a sorting is selected in the menu
 * @param sortItems - Array of sort items ({ value: S, label: string }[])
 * - Quick filter props
 * @param onQuickFilter - Callback when a quick filter is selected in the menu
 * @param quickFilterItems - Array of quick filter items ({ value: Q, label: string }[])
 */
export function Filter<T, S, Q>({
  values,
  search,
  onSearchChange,
  onSearchEnter,
  onClearFilter,
  onClearAllFilters,
  children,
  initialOpen = false,
  placeholder = 'Search...',
  id = 'filter-search',
  showClearFiltersButton = true,
  ...rest
}: FilterProps<T, S, Q>) {
  const [open, setOpen] = useState(initialOpen);
  const [attemptingToRemove, setAttemptingToRemove] = useState<number>(-1);
  const initialHeight = useRef(initialOpen ? 'auto' : 0);

  const handleOnToggleOpen = () => {
    setOpen((prev) => !prev);
    if (initialHeight.current === 'auto') {
      initialHeight.current = 0;
    }
  };

  const handleOnFocus = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search !== '') {
      onSearchEnter(search);
    } else if (event.key === 'Backspace' && search === '') {
      if (values.length > 0 && attemptingToRemove === -1) {
        setAttemptingToRemove(values.length - 1);
      } else if (attemptingToRemove !== -1) {
        onClearFilter(values[attemptingToRemove].key);
        setAttemptingToRemove(-1);
      }
    }
  };

  const handleOnClearAll = () => {
    onClearAllFilters();
  };

  return (
    <Wrapper>
      <Container>
        <Icon
          onClick={handleOnToggleOpen}
          data={filter_list}
          color={colors.text.static_icons__tertiary.rgba}
        />
        <section>
          {values.map(({ key, label, icon }, index) => (
            <StyledChip
              key={`${label}-${index}`}
              onDelete={() => onClearFilter(key)}
              leadingIconData={icon}
              $tryingToRemove={attemptingToRemove === index}
            >
              {label}
            </StyledChip>
          ))}
          <SearchField
            id={id}
            type="search"
            value={search}
            placeholder={placeholder}
            onChange={onSearchChange}
            onKeyDownCapture={handleOnKeyDown}
            onFocus={handleOnFocus}
          />
        </section>
        {values.length > 0 && (
          <Button
            variant="ghost_icon"
            onClick={handleOnClearAll}
            data-testid="clear-all-x"
          >
            <Icon
              data={clear}
              size={16}
              color={colors.text.static_icons__tertiary.rgba}
            />
          </Button>
        )}
        {'quickFilterItems' in rest && <QuickFilter {...rest} />}
        {'sortValue' in rest && <Sorting {...rest} />}
        <button onClick={handleOnToggleOpen} data-testid="toggle-open-button">
          <Icon
            data={open ? arrow_drop_up : arrow_drop_down}
            color={colors.text.static_icons__tertiary.rgba}
          />
        </button>
      </Container>
      <AnimatePresence>
        {open && (
          <Content
            $showClearFilterButton={showClearFiltersButton}
            animate={{ height: 'auto' }}
            initial={{ height: initialHeight.current }}
            exit={{ height: 0 }}
          >
            <section>
              {Array.isArray(children) ? (
                children.map((child, index) => (
                  <div key={index}>
                    {child}
                    {index === children.length - 1 &&
                      showClearFiltersButton && (
                        <Button
                          variant="outlined"
                          onClick={handleOnClearAll}
                          disabled={values.length === 0}
                        >
                          Clear filters
                        </Button>
                      )}
                  </div>
                ))
              ) : (
                <div>
                  {children}
                  {showClearFiltersButton && (
                    <Button
                      variant="outlined"
                      onClick={handleOnClearAll}
                      disabled={values.length === 0}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </section>
          </Content>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
