import { FC, useMemo, useState } from 'react';

import { tokens } from '@equinor/eds-tokens';

import ReleaseNotesTypes, {
  RELEASENOTETYPES_INFORMATION,
} from '../ReleaseNotesTypes/ReleaseNotesTypes';
import { FilterOption } from 'src/components/Inputs/Sieve/Filter';
import Sieve, { FilterValues,SieveValue } from 'src/components/Inputs/Sieve/Sieve';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  flex-wrap: wrap;
  > section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 1060px) {
      flex-wrap: nowrap;
    }
  }
`;

const ChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Equionor', sans-serif;
  font-size: 12px;
  align-items: center;
  grid-gap: ${spacings.comfortable.small};
  justify-items: start;
  flex-wrap: wrap;
  width: 77%;
  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

export type ActiveFilter = {
  value: string;
  parent: string;
};

const FilterHeader: FC = () => {
  const [sieveValue, setSieveValue] = useState<SieveValue>({
    searchValue: undefined,
    filterValues: undefined,
    sortValue: undefined,
  });

  const filterOptions = useMemo(() => {
    const filterOptions: FilterOption[] = [];

    filterOptions.push({
      label: 'Type',
      options: Object.keys(RELEASENOTETYPES_INFORMATION).map((tag) => ({
        label: tag,
        value: tag,
      })),
    });

    return filterOptions;
  }, []);

  const handleOnUpdate = (value: SieveValue) => {
    setSieveValue(value);
  };

  const onHandleActiveFiltersRemove = (parent: string, value: string) => {
    let newValues: FilterValues | undefined = { ...sieveValue.filterValues };

    const index = newValues[parent].findIndex((item) => item.value === value);
    newValues[parent].splice(index, 1);

    if (
      Object.keys(newValues).flatMap((parent) => newValues?.[parent]).length ===
      0
    ) {
      newValues = undefined;
    }
    setSieveValue((prev) => ({ ...prev, filterValues: newValues }));
  };

  return (
    <Container>
      <Sieve
        searchPlaceholder="Search for specific bugs or features, e.g. ´Recall´"
        sieveValue={sieveValue}
        onUpdate={handleOnUpdate}
        filterOptions={filterOptions}
        showChips={false}
        minSearchWidth="70%"
        syncWithSearchParams
      />

      <section>
        <ChipContainer>
          {Object.keys(sieveValue.filterValues ?? {}).map((parent: string) => {
            return sieveValue.filterValues?.[parent].map(
              (releaseNoteType) => (
                <ReleaseNotesTypes
                  key={releaseNoteType.label}
                  name={releaseNoteType.label}
                  showIcon={true}
                  onClick={() =>
                    onHandleActiveFiltersRemove(parent, releaseNoteType.value)
                  }
                />
              )
            );
          })}
        </ChipContainer>
      </section>
    </Container>
  );
};

export default FilterHeader;
