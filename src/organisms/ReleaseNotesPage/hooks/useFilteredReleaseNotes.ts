import { useMemo } from 'react';

import { useReleaseNotesQuery } from '@equinor/subsurface-app-management';

import { useReleaseNotesFilters } from './useReleaseNotesFilters';
import { sortByDate } from 'src/atoms/utils/sort';

export function useFilteredReleaseNotes() {
  const { search, isFiltering } = useReleaseNotesFilters();
  const { data, isLoading } = useReleaseNotesQuery();
  const filteredData = useMemo(() => {
    let filteredList = data ?? [];

    if (search.releaseNoteTypes) {
      filteredList = filteredList.filter((item) =>
        search.releaseNoteTypes?.every((tag) => !!item.tags?.includes(tag))
      );
    }

    if (search.search) {
      filteredList = filteredList.filter((item) => {
        return search.search?.some((searchTerm) => {
          const lowerCased = searchTerm.toLowerCase();

          return (
            item.title.toLowerCase().includes(lowerCased) ||
            item.body.toLowerCase().includes(lowerCased)
          );
        });
      });
    }

    filteredList.sort((a, b) => {
      const usingDataA = a.releaseDate ?? a.createdDate;
      const usingDataB = b.releaseDate ?? b.createdDate;
      return sortByDate(usingDataA, usingDataB);
    });

    return filteredList;
  }, [data, search]);

  return {
    data: filteredData,
    isLoading,
    isSearchingOrFiltering: isFiltering,
  };
}
