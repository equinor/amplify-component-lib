import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ReleaseNote } from 'src/api/models/ReleaseNote';
import { ReleaseNotesService } from 'src/api/services/ReleaseNotesService';
import { environment } from 'src/utils';

const { getAppName } = environment;

export function useReleaseNotes() {
  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const [search, setSearch] = useState('');


  const selectedReleaseNoteTypes = JSON.parse('[]');
  const { data, isLoading } = useQuery<ReleaseNote[]>(
    { queryKey: ['get-all-release-notes'], queryFn: () => ReleaseNotesService.getReleasenoteList(applicationName)},
  );

  const filteredData = useMemo(() => {
    let filteredList = data || [];

    if (selectedReleaseNoteTypes && selectedReleaseNoteTypes.length > 0) {
      filteredList = filteredList.filter(
        (item) =>
          item.tags?.some((tag) => selectedReleaseNoteTypes.includes(tag))
      );
    }

    if (search.trim() !== '') {
      const searchTerms = search.trim().toLowerCase().split(' ');
      filteredList = filteredList.filter((item) => {
        return Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerms.join(' '));
      });
    }
    filteredList.sort((a, b) => {
      const dateA = new Date(a.createdDate ?? '');
      const dateB = new Date(b.createdDate ?? '');
      return dateB.getTime() - dateA.getTime();
    });

    return filteredList;
  }, [data, search, selectedReleaseNoteTypes]);

  return {
    data: filteredData,
    isLoading,
    search,
    setSearch,
    selectedReleaseNoteTypes,
  };
}
