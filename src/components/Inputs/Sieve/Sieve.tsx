import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import Filter from './Filter';
import { Container, FilterChip, Search, Wrapper } from './Sieve.styles';
import { FilterValues, Option, SieveProps, SieveValue } from './Sieve.types';
import Sort from './Sort';

import { debounce } from 'lodash';

const Sieve: FC<SieveProps> = ({
  searchPlaceholder,
  sortOptions,
  filterOptions,
  sieveValue,
  onUpdate,
  showChips = true,
  minSearchWidth = '24rem',
  syncWithSearchParams = false,
  isLoadingOptions = false,
  debounceSearchValue = false,
  onIsTyping,
}) => {
  const [localSearchString, setLocalSearchString] = useState(
    sieveValue.searchValue ?? ''
  );
  const previousOnIsTyping = useRef<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initializedSearchParams = useRef<boolean>(false);

  useEffect(() => {
    if (
      !initializedSearchParams.current &&
      syncWithSearchParams &&
      !isLoadingOptions
    ) {
      const search = searchParams.get('search') ?? undefined;

      const parents =
        filterOptions?.map((filterOption) => filterOption.label) ?? [];

      const filterValues: FilterValues = {};
      for (const parent of parents) {
        const parentOptions = filterOptions?.find(
          (filterOption) => filterOption.label === parent
        )?.options;

        const labels = JSON.parse(
          searchParams.get(parent.toLowerCase()) ?? '[]'
        ) as string[];

        filterValues[parent] = parentOptions?.filter((option) =>
          labels.includes(option.label)
        );
      }

      onUpdate({
        searchValue: search,
        filterValues,
        sortValue: sieveValue.sortValue,
      });

      initializedSearchParams.current = true;
    }
  }, [
    filterOptions,
    initializedSearchParams,
    isLoadingOptions,
    onUpdate,
    searchParams,
    sieveValue.sortValue,
    syncWithSearchParams,
  ]);

  const previousSieveValue = useRef<string>('{}');
  useEffect(() => {
    if (
      syncWithSearchParams &&
      initializedSearchParams.current &&
      !isLoadingOptions &&
      JSON.stringify(sieveValue) !== previousSieveValue.current
    ) {
      if (sieveValue.searchValue === undefined) {
        searchParams.delete('search');
      } else {
        searchParams.set('search', sieveValue.searchValue);
      }

      const parents =
        filterOptions?.map((filterOption) => filterOption.label) ?? [];
      const filterValues = sieveValue.filterValues;

      for (const parent of parents) {
        if (filterValues?.[parent] && filterValues[parent].length > 0) {
          searchParams.set(
            parent.toLowerCase(),
            JSON.stringify(filterValues[parent].map((option) => option.label))
          );
        } else {
          searchParams.delete(parent.toLowerCase());
        }
      }

      previousSieveValue.current = JSON.stringify(sieveValue);
      setSearchParams(searchParams);
      onUpdate(sieveValue);
    }
  }, [
    filterOptions,
    initializedSearchParams,
    isLoadingOptions,
    onUpdate,
    searchParams,
    setSearchParams,
    sieveValue,
    syncWithSearchParams,
  ]);

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

  const handleRemoveFilter = (parent: string, option: Option) => {
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
              : sieveValue.searchValue ?? ''
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

export default Sieve;
