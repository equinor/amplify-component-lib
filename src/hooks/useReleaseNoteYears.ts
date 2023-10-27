import { useMemo } from 'react';

import { useReleaseNotes } from './useReleaseNotes';
import { extractYearsData } from 'src/utils/releaseNotes';

export function useReleaseNoteYears() {
  const { data } = useReleaseNotes();

  return useMemo(() => extractYearsData(data), [data]);
}
