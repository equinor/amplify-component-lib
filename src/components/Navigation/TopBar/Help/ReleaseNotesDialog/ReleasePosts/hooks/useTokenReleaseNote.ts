import { useQuery } from '@tanstack/react-query';

import { ReleaseNotesService } from 'src/api/services/ReleaseNotesService';




export function useTokenReleaseNote() {
  return useQuery({
    queryKey: ['get-token-release-note'],
    queryFn: async () => {
      const data = await ReleaseNotesService.getContainerSasUri();
      return data.split('?')[1];
    },
    gcTime: 1000 * 60 * 60 * 12, // 12 hours
    staleTime: 1000 * 60 * 60 * 12,
  });
}
