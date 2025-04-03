import { FaqService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

export function useFaqsInApplication() {
  return useQuery({
    queryKey: ['GET_FAQ_IN_APP'], // This is hard-coded on purpose, assuming we never have to update cache manually
    queryFn: () => {
      return FaqService.getFaqCategoriesFromApplicationId(
        '85e46d17-7a97-44a5-8fbf-f9efd456fbde'
      ); // TODO: Remove
    },
  });
}
