import {
  ReleaseNote,
  ReleaseNotesService,
} from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { environment } from '../utils/auth_environment';

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
