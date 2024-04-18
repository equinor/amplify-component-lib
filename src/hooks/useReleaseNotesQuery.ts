import { useQuery } from '@tanstack/react-query';

import { ReleaseNote } from 'src/api/models/ReleaseNote';
import { ReleaseNotesService } from 'src/api/services/ReleaseNotesService';
import { environment } from 'src/utils';

const { getAppName } = environment;

interface ReleaseNotesQueryProps {
  enabled?: boolean;
}

export function useReleaseNotesQuery(options?: ReleaseNotesQueryProps) {
  const applicationName = getAppName(import.meta.env.VITE_NAME);

  return useQuery<ReleaseNote[]>({
    queryKey: ['get-all-release-notes'],
    queryFn: () => ReleaseNotesService.getReleasenoteList(applicationName),
    enabled: options?.enabled ?? true,
  });
}
