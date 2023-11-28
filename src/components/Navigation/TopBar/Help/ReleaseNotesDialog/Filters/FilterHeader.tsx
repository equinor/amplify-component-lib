import { FC, useMemo, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { close, external_link } from '@equinor/eds-icons';

import ReleaseNotesTypes from '../ReleaseNotesTypes/ReleaseNotesTypes';
import {
  ReleaseNoteType,
  RELEASENOTETYPES_INFORMATION,
} from '../ReleaseNotesTypes/ReleaseNotesTypes.types';
import { ButtonContainer, Wrapper } from './FilterHeader.styles';
import { ChipWrapper, SieveWrapper } from './FilterHeader.styles';
import { FilterOption } from 'src/components/Inputs/Sieve/Filter';
import Sieve from 'src/components/Inputs/Sieve/Sieve';
import {
  FilterValues,
  SieveValue,
} from 'src/components/Inputs/Sieve/Sieve.types';
import { EnvironmentType } from 'src/components/Navigation/TopBar/TopBar';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { environment } from 'src/utils';

const { getEnvironmentName, getAppName } = environment;

const FilterHeader: FC = () => {
  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const environmentName = getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );
  const { setSearch, setOpen } = useReleaseNotes();
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
    setSearch(value);
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
    setSearch((prev) => ({ ...prev, filterValues: newValues }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <SieveWrapper>
        <Sieve
          searchPlaceholder="Search for specific bugs or features, e.g. ´Recall´"
          sieveValue={sieveValue}
          onUpdate={handleOnUpdate}
          filterOptions={filterOptions}
          showChips={false}
          minSearchWidth="70%"
        />
        <ButtonContainer>
          <Button
            variant="ghost_icon"
            href={
              environmentName && environmentName !== EnvironmentType.PRODUCTION
                ? `https://client-amplify-portal-${environmentName}.radix.equinor.com/releasenotes?applications=%5B"${applicationName}"%5D`
                : `https://amplify.equinor.com/releasenotes?applications=%5B"${applicationName}"%5D`
            }
          >
            <Icon data={external_link} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={handleClose}
            aria-label="close modal"
          >
            <Icon data={close} />
          </Button>
        </ButtonContainer>
      </SieveWrapper>
      <section>
        <ChipWrapper>
          {Object.keys(sieveValue.filterValues ?? {}).map((parent: string) => {
            return sieveValue.filterValues?.[parent].map((releaseNoteType) => (
              <ReleaseNotesTypes
                key={releaseNoteType.label}
                name={releaseNoteType.label as ReleaseNoteType}
                showIcon={true}
                onClick={() =>
                  onHandleActiveFiltersRemove(parent, releaseNoteType.value)
                }
              />
            ));
          })}
        </ChipWrapper>
      </section>
    </Wrapper>
  );
};

export default FilterHeader;
