import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactNode,
  useRef,
  useState,
} from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  clear,
  filter_list,
  IconData,
} from '@equinor/eds-icons';

import {
  Container,
  Content,
  SearchField,
  StyledChip,
  Wrapper,
} from './Filter.styles';
import { colors } from 'src/atoms/style/colors';

import { AnimatePresence } from 'framer-motion';

export interface FilterProps {
  values: { value: string; label: string; icon?: IconData }[];
  onClearFilter: (value: string) => void;
  onClearAllFilters: () => void;
  onSearch: (value: string) => void;
  children: ReactNode | ReactNode[];
  initialOpen?: boolean;
  placeholder?: string;
  showClearFiltersButton?: boolean;
}

/**
 * @param values - Array of values to display as chips ({ value: string, label: string, icon?: IconData }[])
 * @param onSearch - Function to call when the user presses enter in the search input
 * @param onClearFilter - Function to call when the user clicks the delete button on a chip
 * @param onClearAllFilters - Function to call when the user clicks the clear filters button
 * @param children - ReactNode or ReactNode[] to display below when the filter is open
 * @param initialOpen - Whether the filter should be open by default, defaults to false
 * @param placeholder - Placeholder text for the search input, defaults to 'Search...'
 * @param showClearFiltersButton - Whether to show the clear filters button, defaults to true
 * @constructor
 */
export const Filter: FC<FilterProps> = ({
  values,
  onSearch,
  onClearFilter,
  onClearAllFilters,
  children,
  initialOpen = false,
  placeholder = 'Search...',
  showClearFiltersButton = true,
}) => {
  const [open, setOpen] = useState(initialOpen);
  const [search, setSearch] = useState('');
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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search !== '') {
      event.preventDefault();
      onSearch(search);
      setSearch('');
    }
    if (event.key === 'Backspace' && search === '') {
      if (values.length > 0 && attemptingToRemove === -1) {
        setAttemptingToRemove(values.length - 1);
      } else if (attemptingToRemove !== -1) {
        onClearFilter(values[attemptingToRemove].value);
        setAttemptingToRemove(-1);
      }
    }
  };

  return (
    <Wrapper>
      <Container $open={open}>
        <Icon
          data={filter_list}
          color={colors.interactive.primary__resting.rgba}
        />
        <section>
          {values.map(({ value, label, icon }, index) => (
            <StyledChip
              key={value}
              onDelete={() => onClearFilter(value)}
              leadingIconData={icon}
              $tryingToRemove={attemptingToRemove === index}
            >
              {label}
            </StyledChip>
          ))}
          <SearchField
            id="filter-search"
            type="search"
            value={search}
            placeholder={placeholder}
            onChange={handleOnChange}
            onKeyDownCapture={handleOnKeyDown}
            onFocus={handleOnFocus}
          />
        </section>
        {values.length > 0 && (
          <Button variant="ghost_icon" onClick={onClearAllFilters}>
            <Icon
              data={clear}
              size={16}
              color={colors.text.static_icons__tertiary.rgba}
            />
          </Button>
        )}
        <Button
          variant="ghost_icon"
          onClick={handleOnToggleOpen}
          data-testid="toggle-open-button"
        >
          <Icon data={open ? arrow_drop_up : arrow_drop_down} />
        </Button>
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
                        <Button variant="outlined" onClick={onClearAllFilters}>
                          Clear filters
                        </Button>
                      )}
                  </div>
                ))
              ) : (
                <div>
                  {children}
                  {showClearFiltersButton && (
                    <Button variant="outlined" onClick={onClearAllFilters}>
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
};
