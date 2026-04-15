import { type ChangeEvent, type FC, useMemo, useState } from 'react';

import { ReleaseNoteType } from '@equinor/subsurface-app-management';

import { useReleaseNotesFilters } from './hooks/useReleaseNotesFilters';
import { ReleaseNotesPageSearchParams } from './ReleaseNotesPage.types';
import { removeFromPreviousByIndex } from './ReleaseNotesPage.utils';
import { colors, spacings } from 'src/atoms/style';
import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { Filter } from 'src/organisms/Filter/Filter';

import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: ${spacings.medium};
  margin: 0 calc(${spacings.medium} * -1);
  background: ${colors.ui.background__light.rgba};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.medium};
`;

const RELEASE_NOTE_TYPES: SelectOptionRequired[] = Object.values(
  ReleaseNoteType
).map((type) => ({
  value: type,
  label: type,
}));

export const ReleaseNoteFilter: FC = () => {
  const { search, selected, setSearchParam, clearAll } =
    useReleaseNotesFilters();
  const [searchValue, setSearchValue] = useState('');

  const options: Record<
    keyof Omit<ReleaseNotesPageSearchParams, 'search'>,
    SelectOptionRequired[]
  > = useMemo(
    () => ({
      releaseNoteTypes: RELEASE_NOTE_TYPES,
    }),
    []
  );

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOnSearchValueEnter = (value: string) => {
    setSearchValue('');
    setSearchParam('search', [...(search.search ?? []), value]);
  };

  const handleOnReleaseNoteTypesChange = (
    selectedValues: SelectOptionRequired[]
  ) => {
    setSearchParam(
      'releaseNoteTypes',
      selectedValues.map((item) => item.value)
    );
  };

  const handleOnClearFilter = (key: keyof typeof selected, index: number) => {
    setSearchParam(key, removeFromPreviousByIndex(search[key], index));
  };

  return (
    <Container>
      <Filter
        values={selected}
        onClearFilter={handleOnClearFilter}
        onClearAllFilters={clearAll}
        search={searchValue}
        onSearchChange={handleOnSearchChange}
        onSearchEnter={handleOnSearchValueEnter}
      >
        <Content>
          <ComboBox
            label="Type"
            placeholder="Select type of release note"
            values={selected.releaseNoteTypes}
            items={options.releaseNoteTypes}
            onSelect={handleOnReleaseNoteTypesChange}
          />
        </Content>
      </Filter>
    </Container>
  );
};
