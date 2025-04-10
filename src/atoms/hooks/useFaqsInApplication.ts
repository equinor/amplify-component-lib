import { FaqService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { environment } from 'src/atoms/utils/auth_environment';

export function useFaqsInApplication() {
  return useQuery({
    queryKey: ['GET_FAQ_IN_APP'], // This is hard-coded on purpose, assuming we never have to update cache manually
    queryFn: async () => {
      const data = await FaqService.getCategoriesWithFaqsFromApplicationName(
        environment.getAppName(import.meta.env.VITE_NAME)
      );

      return data.toSorted((a, b) => {
        const usingA = a.orderBy ?? 0;
        const usingB = b.orderBy ?? 0;
        return usingA - usingB;
      });
    },
    staleTime: 1000 * 60 * 5,
  });
}
