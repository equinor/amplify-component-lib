import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

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
  min-width: 24rem;
  > div {
    outline: none !important;
    background: ${colors.ui.background__default.hex};
    > input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.hex};
    }
  }
`;

export type SieveValue = {
  searchValue: string | undefined;
  sortValue: Option | undefined;
  filterValues: Option[] | undefined;
};

export interface SieveProps {
  searchPlaceholder: string;
  sortOptions?: Option[];
  filterOptions?: FilterOption[];
  onUpdate: (value: SieveValue) => void;
}

const Sieve: FC<SieveProps> = ({
  searchPlaceholder,
  sortOptions,
  filterOptions,
  onUpdate,
}) => {
  const sieveValue = useRef<SieveValue>({
    searchValue: undefined,
    sortValue: sortOptions?.at(0),
    filterValues: undefined,
  });
  const [filterValues, setFilterValues] = useState<Option[]>([]);
  const [sortValue, setSortValue] = useState<Option | undefined>(
    sortOptions?.at(0)
  );

  const handleOnSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== '') {
      sieveValue.current.searchValue = event.currentTarget.value;
    } else {
      sieveValue.current.searchValue = undefined;
    }

    onUpdate(sieveValue.current);
  };

  const handleSetFilterValues = (values: Option[]) => {
    setFilterValues(values);
  };

  const handleSetSortValue = (value: Option) => {
    setSortValue(value);
  };

  const handleRemoveFilter = (option: Option) => {
    setFilterValues(filterValues.filter((item) => item.value !== option.value));
  };

  const handleRemoveAll = () => {
    setFilterValues([]);
  };

  const initialRender = useRef<boolean>(false);
  useEffect(() => {
    if (initialRender.current) {
      sieveValue.current.filterValues =
        filterValues.length > 0 ? filterValues : undefined;
      sieveValue.current.sortValue = sortValue;
      onUpdate(sieveValue.current);
    } else {
      initialRender.current = true;
    }
  }, [filterValues, onUpdate, sortValue]);

  return (
    <Wrapper>
      <Container>
        <Search
          placeholder={searchPlaceholder}
          onChange={handleOnSearchInput}
        />
        {sortOptions !== undefined && (
          <Sort
            options={sortOptions}
            selectedOption={sortValue}
            setSelectedOption={handleSetSortValue}
          />
        )}
        {filterOptions !== undefined && (
          <Filter
            options={filterOptions}
            selectedOptions={filterValues}
            setSelectedOptions={handleSetFilterValues}
          />
        )}
      </Container>
      <Container>
        {filterValues?.map((filter) => (
          <FilterChip
            key={`filter-chip-${filter.value}`}
            onDelete={() => handleRemoveFilter(filter)}
          >
            {filter.label}
          </FilterChip>
        ))}
        {filterValues.length > 1 && (
          <FilterChip onDelete={handleRemoveAll}>Remove all</FilterChip>
        )}
      </Container>
    </Wrapper>
  );
};

export default Sieve;
