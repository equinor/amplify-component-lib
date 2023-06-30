import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Chip as EDSChip, Search as EDSSearch } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import Filter, { FilterOption } from './Filter';
import { Option } from './Sieve.common';
import Sort from './Sort';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
  align-items: center;
`;

const FilterChip = styled(EDSChip)`
  background: ${colors.ui.background__default.hex};
`;

const Search = styled(EDSSearch)`
  > div {
    box-shadow: none;
    outline: none !important;
    background: ${colors.ui.background__default.hex};
    > input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.hex};
    }
  }
`;

export type FilterValues = {
  [key: string]: Option[];
};

export type SieveValue = {
  searchValue: string | undefined;
  sortValue: Option | undefined;
  filterValues: FilterValues | undefined;
};

export interface SieveProps {
  searchPlaceholder: string;
  sortOptions?: Option[];
  filterOptions?: FilterOption[];
  sieveValue: SieveValue;
  onUpdate: (value: SieveValue) => void;
  showChips?: boolean;
  minSearchWidth?: string;
  syncWithSearchParams?: boolean;
  isLoadingOptions?: boolean;
}

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
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initalizedSearchParams = useRef<boolean>(false);

  useEffect(() => {
    if (
      !initalizedSearchParams.current &&
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
        );

        if (labels.length === 0) continue;

        const selectedOptions = parentOptions?.filter((option) =>
          labels.includes(option.label)
        ) as Option[];

        filterValues[parent] = selectedOptions;
      }

      onUpdate({
        searchValue: search,
        filterValues,
        sortValue: sieveValue.sortValue,
      });

      initalizedSearchParams.current = true;
    }
  }, [
    filterOptions,
    initalizedSearchParams,
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
      initalizedSearchParams.current &&
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
      const filterValues = sieveValue.filterValues as FilterValues | undefined;

      for (const parent of parents) {
        if (
          filterValues &&
          filterValues[parent] &&
          filterValues[parent].length > 0
        ) {
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
    initalizedSearchParams,
    isLoadingOptions,
    onUpdate,
    searchParams,
    setSearchParams,
    sieveValue,
    syncWithSearchParams,
  ]);

  const handleUpdateSieveValue = <
    K extends keyof SieveValue,
    V extends SieveValue[K]
  >(
    key: K,
    value: V
  ) => {
    const newSieveValue: SieveValue = {
      ...sieveValue,
      [key]: value,
    };

    onUpdate(newSieveValue);
  };

  const handleRemoveFilter = (parent: string, option: Option) => {
    let newValues: FilterValues | undefined = { ...sieveValue.filterValues };

    const index = newValues[parent].findIndex(
      (item) => item.value === option.value
    );
    newValues[parent].splice(index, 1);

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

  return (
    <Wrapper>
      <Container>
        <Search
          style={{ minWidth: minSearchWidth }}
          placeholder={searchPlaceholder}
          value={sieveValue.searchValue ?? ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleUpdateSieveValue(
              'searchValue',
              event.target.value !== '' ? event.target.value : undefined
            );
          }}
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
