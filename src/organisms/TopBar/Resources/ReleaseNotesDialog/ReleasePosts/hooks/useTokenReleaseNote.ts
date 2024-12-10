import { ReleaseNotesService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

/**
 * @deprecated - This will change once SAM's new release note endpoints are implemented
 */
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
