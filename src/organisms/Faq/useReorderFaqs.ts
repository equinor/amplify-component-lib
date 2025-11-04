import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  FaqCategoriesWithFaqDto,
  FaqCategoryDto,
  FaqDto,
  faqOrderBy,
  GET_FAQ_CATEGORIES_WITH_FAQS,
  useAppIdToAppName,
  useFaqCategoriesWithFaqs,
} from './useFaqCategoriesWithFaqs';

export type ManageFaqDto = {
  id?: number | null;
  question?: string | null;
  answer?: string | null;
  visible?: boolean | null;
  orderBy?: number | null;
  roles?: Array<string> | null;
  categoryId: number;
};

export const GET_FAQ_FROM_ID = 'getFaqQuestion';

export function useReorderFaqs({
  categoryId,
  fkParentCategoryId,
}: {
  categoryId: FaqCategoryDto['id'];
  fkParentCategoryId?: FaqCategoryDto['fkParentCategoryId'];
}) {
  const queryClient = useQueryClient();
  const { data } = useFaqCategoriesWithFaqs();
  const applicationName = useAppIdToAppName();

  return useMutation({
    mutationFn: (faqOrder: FaqDto[]) => {
      const faqs = structuredClone(
        data?.find((category) =>
          fkParentCategoryId
            ? category.id === fkParentCategoryId
            : category.id === categoryId
        )?.faqs
      );
      const requests = [];
      for (const [index, { id }] of faqOrder.entries()) {
        const faq = faqs?.find((item) => item.id === id);
        if (faq && index !== faq.orderBy) {
          requests.push({ ...faq, orderBy: index });
          faq.orderBy = index;
          queryClient.setQueryData<FaqDto>(
            [GET_FAQ_FROM_ID, faq.id],
            (oldData) => {
              if (!oldData) return;
              return { ...oldData, ...faq };
            }
          );
        }
      }
      queryClient.setQueryData<FaqCategoriesWithFaqDto[]>(
        [GET_FAQ_CATEGORIES_WITH_FAQS, applicationName],
        (oldData) => {
          if (!oldData) return;

          const copy = structuredClone(oldData);
          const categoryIndex = copy.findIndex((category) =>
            fkParentCategoryId
              ? category.id === fkParentCategoryId
              : category.id === categoryId
          );

          copy[categoryIndex].faqs = (faqs ?? []).toSorted(faqOrderBy);

          return copy;
        }
      );
      // return FaqService.updateFaqsInCategory(requests);
      return Promise.resolve(requests);
    },
  });
}
