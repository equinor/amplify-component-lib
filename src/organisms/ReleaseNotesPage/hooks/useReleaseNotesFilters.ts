import { useNavigate, useSearch } from '@tanstack/react-router';

import { ReleaseNotesPageSearchParams } from '../ReleaseNotesPage.types';
import { capitalize } from 'src/atoms/utils/string';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';

export function useReleaseNotesFilters() {
  const search = useSearch({
    strict: false,
  }) as ReleaseNotesPageSearchParams;
  const navigate = useNavigate();

  const selected: Record<
    keyof ReleaseNotesPageSearchParams,
    SelectOptionRequired[]
  > = {
    search: (search.search ?? []).map((val) => ({ value: val, label: val })),
    releaseNoteTypes: (search.releaseNoteTypes ?? []).map((item) => ({
      value: item,
      label: capitalize(item),
    })),
  };

  const setSearchParam = <T extends keyof ReleaseNotesPageSearchParams>(
    key: T,
    value: ReleaseNotesPageSearchParams[T]
  ) => {
    navigate({
      to: '.',
      search: (prev: ReleaseNotesPageSearchParams) => ({
        ...prev,
        [key]: Array.isArray(value) && value.length === 0 ? undefined : value,
      }),
    });
  };

  const clearAll = () => {
    navigate({
      to: '.',
      search: undefined,
    });
  };

  return {
    search,
    selected,
    setSearchParam,
    clearAll,
    isFiltering:
      search.search !== undefined || search.releaseNoteTypes !== undefined,
  };
}
