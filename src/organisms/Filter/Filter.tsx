import { KeyboardEvent, useRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  clear,
  info_circle,
  search as search_icon,
} from '@equinor/eds-icons';

import {
  Container,
  Content,
  SearchField,
  SearchFieldWrapper,
  Section,
  StyledChip,
  Wrapper,
} from './Filter.styles';
import { colors } from 'src/atoms/style/colors';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { AutoCompleteMenu } from 'src/organisms/Filter/AutoCompleteMenu';
import { AutoCompleteText } from 'src/organisms/Filter/AutoCompleteText';
import { FilterProps } from 'src/organisms/Filter/Filter.types';
import { getFilteredAutoCompleteOptions } from 'src/organisms/Filter/Filter.utils';

import { AnimatePresence, motion } from 'framer-motion';

/**
 * @param values - Array of values to display as chips ({ value: string, label: string, icon?: IconData }[])
 * @param search - The current search value
 * @param onSearchChange - Callback when search changes
 * @param onSearchEnter - Callback when users hit {Enter} in the search field
 * @param onClearFilter - Function to call when the user clicks the delete button on a chip
 * @param onClearAllFilters - Function to call when the user clicks the clear filters button
 * @param children - ReactNode or ReactNode[] to display below when the filter is open
 * @param inlineContent - ReactNode or ReactNode[] to display inline with the search field, but before the open/close button
 * @param initialOpen - Whether the filter should be open by default, defaults to false
 * @param placeholder - Placeholder text for the search input, defaults to 'Search...'
 * @param id - ID for the search field
 */
export function Filter<T extends string>({
  values,
  search,
  onSearchChange,
  onSearchEnter,
  onClearFilter,
  onClearAllFilters,
  children,
  topContent,
  inlineContent,
  initialOpen = false,
  placeholder = 'Search...',
  id,
  ...rest
}: FilterProps<T>) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(initialOpen);
  const [attemptingToRemove, setAttemptingToRemove] = useState<T | undefined>(
    undefined
  );
  const initialHeight = useRef(initialOpen ? 'auto' : 0);

  const handleOnToggleOpen = () => {
    setOpen((prev) => !prev);
    if (initialHeight.current === 'auto') {
      initialHeight.current = 0;
    }
  };

  const handleOnFocus = () => {
    if (!open) setOpen(true);
  };

  const handleOnSectionClick = () => {
    searchRef.current?.focus();
  };

  const handleOnSearchEnter = (searchValue: string) => {
    if (!('autoCompleteOptions' in rest)) {
      onSearchEnter(searchValue);
      return;
    }

    const filteredAutoCompleteOptions = getFilteredAutoCompleteOptions({
      searchValue,
      autoCompleteOptions: rest.autoCompleteOptions,
    });

    if (filteredAutoCompleteOptions.length === 1) {
      rest.onAutoComplete(
        filteredAutoCompleteOptions[0].key,
        filteredAutoCompleteOptions[0]
      );
      return;
    }

    onSearchEnter(searchValue);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search !== '') {
      handleOnSearchEnter(search);
    } else if (event.key === 'Backspace' && search === '') {
      if (attemptingToRemove === undefined) {
        for (const key of Object.keys(values).toReversed() as T[]) {
          if (values[key].length > 0) {
            setAttemptingToRemove(key);
            break;
          }
        }
        return;
      }
      onClearFilter(attemptingToRemove, values[attemptingToRemove].length - 1);
      setAttemptingToRemove(undefined);
    }
  };

  const hasAnyValues = (Object.values(values) as Array<T>).some(
    (value) => value.length > 0
  );

  return (
    <Wrapper id={id}>
      {topContent}
      <Container>
        <Section ref={sectionRef} onClick={handleOnSectionClick}>
          <Icon
            data={search_icon}
            color={colors.text.static_icons__tertiary.rgba}
          />
          {(Object.keys(values) as Array<T>).flatMap((key) =>
            values[key].map(({ label, icon }, index, list) => (
              <StyledChip
                key={`${label}-${index}-${key}`}
                onDelete={() => onClearFilter(key, index)}
                leadingIconData={icon}
                $tryingToRemove={
                  attemptingToRemove === key && index === list.length - 1
                }
              >
                {label}
              </StyledChip>
            ))
          )}
          <SearchFieldWrapper>
            {'autoCompleteOptions' in rest && rest.autoCompleteOptions && (
              <AutoCompleteText
                search={search}
                autoCompleteOptions={rest.autoCompleteOptions}
              />
            )}
            <SearchField
              ref={searchRef}
              id={`filter-search-${id}`}
              type="search"
              autoComplete="off"
              value={search}
              placeholder={hasAnyValues ? undefined : placeholder}
              onChange={onSearchChange}
              onKeyDownCapture={handleOnKeyDown}
              onFocus={handleOnFocus}
            />
          </SearchFieldWrapper>
          {(Object.values(values) as SelectOptionRequired[][]).some(
            (list) => list.length > 0
          ) && (
            <Button
              variant="ghost_icon"
              onClick={onClearAllFilters}
              data-testid="clear-all-x"
            >
              <Icon
                data={clear}
                size={18}
                color={colors.text.static_icons__tertiary.rgba}
              />
            </Button>
          )}
        </Section>
        {inlineContent}
        <button onClick={handleOnToggleOpen} data-testid="toggle-open-button">
          <Typography variant="button" group="navigation" as="span">
            Filters
          </Typography>
          <Icon
            data={open ? arrow_drop_up : arrow_drop_down}
            color={colors.text.static_icons__tertiary.rgba}
          />
        </button>
      </Container>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ height: 'auto' }}
            initial={{ height: initialHeight.current }}
            exit={{ height: 0 }}
          >
            <Content>
              <span>
                <Icon
                  data={info_circle}
                  size={16}
                  color={colors.text.static_icons__tertiary.rgba}
                />
                <Typography
                  variant="label"
                  group="input"
                  color={colors.text.static_icons__tertiary.rgba}
                >
                  Type a keyword and press enter
                </Typography>
              </span>
              {children}
            </Content>
          </motion.div>
        )}
      </AnimatePresence>
      {'autoCompleteOptions' in rest && rest.autoCompleteOptions && (
        <AutoCompleteMenu
          isFilterOpen={open}
          search={search}
          anchorElement={sectionRef.current}
          autoCompleteOptions={rest.autoCompleteOptions}
          onAutoComplete={rest.onAutoComplete}
          searchElement={searchRef.current}
        />
      )}
    </Wrapper>
  );
}
