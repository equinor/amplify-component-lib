import { FaqService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { environment } from 'src/atoms/utils/auth_environment';

function faqOrderBy<T extends { orderBy?: number | null }>(a: T, b: T): number {
  const first = a.orderBy ?? Number.MAX_SAFE_INTEGER;
  const second = b.orderBy ?? Number.MAX_SAFE_INTEGER;

  return first - second;
}
export function useFaqsInApplication() {
  return useQuery({
    queryKey: ['GET_FAQ_IN_APP'], // This is hard-coded on purpose, assuming we never have to update cache manually
    queryFn: async () =>
      FaqService.getCategoriesWithFaqsFromApplicationName(
        environment.getAppName(import.meta.env.VITE_NAME)
      ),
    select: (data) => {
      return data.toSorted(faqOrderBy).map((category) => ({
        ...category,
        faqs: (category.faqs ?? []).toSorted(faqOrderBy),
        subCategories: (category.subCategories ?? [])
          .toSorted(faqOrderBy)
          .map((subCategory) => ({
            ...subCategory,
            faqs: (subCategory.faqs ?? []).toSorted(faqOrderBy),
          })),
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
}
