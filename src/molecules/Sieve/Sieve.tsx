import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';

import Filter from 'src/molecules/Sieve/Filter';
import {
  Container,
  FilterChip,
  Search,
  Wrapper,
} from 'src/molecules/Sieve/Sieve.styles';
import {
  FilterValues,
  SieveOption,
  SieveProps,
  SieveValue,
} from 'src/molecules/Sieve/Sieve.types';
import Sort from 'src/molecules/Sieve/Sort';

import { debounce } from 'lodash';

export const Sieve: FC<SieveProps> = ({
  searchPlaceholder,
  sortOptions,
  filterOptions,
  sieveValue,
  onUpdate,
  showChips = true,
  minSearchWidth = '24rem',
  debounceSearchValue = false,
  onIsTyping,
}) => {
  const [localSearchString, setLocalSearchString] = useState(
    sieveValue.searchValue ?? ''
  );
  const previousOnIsTyping = useRef<boolean>(false);

  const handleUpdateSieveValue = useCallback(
    <K extends keyof SieveValue, V extends SieveValue[K]>(key: K, value: V) => {
      const newSieveValue: SieveValue = {
        ...sieveValue,
        [key]: value,
      };

      onUpdate(newSieveValue);
    },
    [onUpdate, sieveValue]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateSieveValue = useCallback(
    debounce(
      <K extends keyof SieveValue, V extends SieveValue[K]>(
        key: K,
        value: V
      ) => {
        handleUpdateSieveValue(key, value);
        onIsTyping?.(false);
        previousOnIsTyping.current = false;
      },
      800
    ),
    [handleUpdateSieveValue, onIsTyping]
  );

  const handleRemoveFilter = (parent: string, option: SieveOption) => {
    let newValues: FilterValues | undefined = { ...sieveValue.filterValues };

    const index = newValues[parent].findIndex(
      (item) => item.value === option.value
    );
    newValues[parent].splice(index, 1);

    if (newValues[parent].length === 0) {
      delete newValues[parent];
    }

    if (
      Object.keys(newValues).flatMap((parent) => newValues?.[parent]).length ===
      0
    ) {
      newValues = undefined;
    }

    handleUpdateSieveValue('filterValues', newValues);
  };

  const handleRemoveAll = () => {
    handleUpdateSieveValue('filterValues', undefined);
  };

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceSearchValue) {
      setLocalSearchString(event.target.value);
      if (event.target.value === '') {
        debouncedUpdateSieveValue.cancel();
        handleUpdateSieveValue('searchValue', undefined);
        onIsTyping?.(false);
        previousOnIsTyping.current = false;
      } else {
        debouncedUpdateSieveValue('searchValue', event.target.value);
        if (!previousOnIsTyping.current) {
          onIsTyping?.(true);
          previousOnIsTyping.current = true;
        }
      }
    } else {
      handleUpdateSieveValue(
        'searchValue',
        event.target.value !== '' ? event.target.value : undefined
      );
    }
  };

  return (
    <Wrapper className="sieve-container">
      <Container>
        <Search
          style={{ minWidth: minSearchWidth }}
          placeholder={searchPlaceholder}
          value={
            debounceSearchValue
              ? localSearchString
              : (sieveValue.searchValue ?? '')
          }
          onChange={handleOnSearch}
        />
        {sortOptions !== undefined && (
          <Sort
            options={sortOptions}
            selectedOption={sieveValue.sortValue}
            setSelectedOption={(value) =>
              handleUpdateSieveValue('sortValue', value)
            }
          />
        )}
        {filterOptions !== undefined && (
          <Filter
            options={filterOptions}
            filterValues={sieveValue.filterValues}
            setFilterValues={(value) =>
              handleUpdateSieveValue('filterValues', value)
            }
          />
        )}
      </Container>
      {showChips && (
        <Container>
          {Object.keys(sieveValue.filterValues ?? {}).map((parent: string) =>
            sieveValue.filterValues?.[parent].map((option) => (
              <FilterChip
                key={`filter-chip-${option?.value}`}
                onDelete={() => handleRemoveFilter(parent, option)}
              >
                {option?.label}
              </FilterChip>
            ))
          )}
          {sieveValue.filterValues &&
            Object.keys(sieveValue.filterValues).flatMap(
              (key) => sieveValue.filterValues?.[key]
            ).length > 1 && (
              <FilterChip onDelete={handleRemoveAll}>Remove all</FilterChip>
            )}
        </Container>
      )}
    </Wrapper>
  );
};
