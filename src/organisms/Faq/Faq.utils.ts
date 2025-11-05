import { environment, FaqService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

export type FaqDto = {
  id: number;
  question?: string | null;
  answer?: string | null;
  visible?: boolean | null;
  orderBy?: number | null;
  roles?: Array<string> | null;
  categoryId: number;
  updatedDate?: string | null;
  createdDate?: string | null;
};

type FaqCategoryDto = {
  id: number;
  fkParentCategoryId?: number | null;
  visible: boolean;
  categoryName: string;
  orderBy: number;
  applicationId: string;
  updatedDate?: string | null;
  createdDate?: string | null;
  subCategories?: Array<FaqCategoryDto> | null;
};

export type FaqCategoriesWithFaqDto = {
  id: number;
  fkParentCategoryId: number;
  categoryName: string;
  orderBy?: number | null;
  visible: boolean;
  applicationId: string;
  faqs?: Array<FaqDto> | null;
  updatedDate?: string | null;
  createdDate?: string | null;
  subCategories?: Array<FaqCategoriesWithFaqDto> | null;
};

export function faqInSearch(
  faq: Pick<FaqDto, 'answer' | 'question'>,
  searchValue: string
) {
  const lowerCase = searchValue.toLowerCase();

  if (!faq.answer || !faq.question) return false;

  return (
    faq.answer.toLowerCase().includes(lowerCase) ||
    faq.question.toLowerCase().includes(lowerCase)
  );
}

function faqOrderBy(
  a: FaqDto | FaqCategoryDto | FaqCategoriesWithFaqDto,
  b: FaqDto | FaqCategoryDto | FaqCategoriesWithFaqDto
) {
  const aOrder = a.orderBy ?? -1;
  const bOrder = b.orderBy ?? -1;

  return aOrder - bOrder;
}

export function useFaqCategoriesWithFaqs() {
  return useQuery({
    queryKey: ['GET_FAQ_IN_APP'], // This is hard-coded on purpose, assuming we never have to update cache manually
    queryFn: async () => {
      // TODO: Update with real endpoint once ready
      const data = (await FaqService.getCategoriesWithFaqsFromApplicationName(
        environment.getAppName(import.meta.env.VITE_NAME)
      )) as unknown as FaqCategoriesWithFaqDto[];

      for (const category of data) {
        category.faqs?.sort(faqOrderBy);
      }

      return data.toSorted(faqOrderBy);
    },
  });
}
