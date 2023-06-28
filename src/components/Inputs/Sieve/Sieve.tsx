import { ChangeEvent, FC } from 'react';

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

/* type FilterValues = {
  [key: string]: Option[];
}
 */
export type SieveValue = {
  searchValue: string | undefined;
  sortValue: Option | undefined;
  filterValues: Option[] | undefined;
};

export interface SieveProps {
  searchPlaceholder: string;
  sortOptions?: Option[];
  filterOptions?: FilterOption[];
  sieveValue: SieveValue;
  onUpdate: (value: SieveValue) => void;
  showChips?: boolean;
  minSearchWidth?: string;
}

const Sieve: FC<SieveProps> = ({
  searchPlaceholder,
  sortOptions,
  filterOptions,
  sieveValue,
  onUpdate,
  showChips = true,
  minSearchWidth = '24rem',
}) => {
  const handleUpdateSieveValue = <
    K extends keyof SieveValue,
    V extends SieveValue
  >(
    key: K,
    value: V[K]
  ) => {
    const newSieveValue = {
      ...sieveValue,
      [key]: value,
    };
    onUpdate(newSieveValue);
  };

  const handleRemoveFilter = (option: Option) => {
    const newFilters = sieveValue.filterValues?.filter(
      (item) => item.value !== option.value
    );
    onUpdate({
      ...sieveValue,
      /* filterValues: Object.keys(option).filter((item) => item !== option.value) */
      filterValues:
        newFilters && newFilters.length > 0 ? newFilters : undefined,
    });
  };

  const handleRemoveAll = () => {
    onUpdate({
      ...sieveValue,
      filterValues: undefined,
    });
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
            selectedOptions={sieveValue.filterValues ?? []}
            setSelectedOptions={(value) =>
              handleUpdateSieveValue(
                'filterValues',
                value.length > 0 ? value : undefined
              )
            }
          />
        )}
      </Container>
      {showChips && (
        <Container>
          {sieveValue.filterValues?.map((filter) => (
            <FilterChip
              key={`filter-chip-${filter.value}`}
              onDelete={() => handleRemoveFilter(filter)}
            >
              {filter.label}
            </FilterChip>
          ))}
          {sieveValue.filterValues && sieveValue.filterValues.length > 1 && (
            <FilterChip onDelete={handleRemoveAll}>Remove all</FilterChip>
          )}
        </Container>
      )}
    </Wrapper>
  );
};

export default Sieve;
