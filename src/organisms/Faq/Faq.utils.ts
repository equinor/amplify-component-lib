import type {
  FaqCategoriesWithFaqDto,
  FaqDto,
} from '@equinor/subsurface-app-management';

export const HEADER_HEIGHT = 89;

/* v8 ignore start */
export const categoryHasFaqs = (category: FaqCategoriesWithFaqDto): boolean => {
  const hasMainFaqs = (category.faqs?.length ?? 0) > 0;
  const hasSubcategoryFaqs = category.subCategories?.some(
    (subcategory) => (subcategory.faqs?.length ?? 0) > 0
  );

  return hasMainFaqs || !!hasSubcategoryFaqs;
};
/* v8 ignore end */

export function faqInSearch(
  faq: Pick<FaqDto, 'answer' | 'question'>,
  searchValue: string
) {
  const lowerCase = searchValue.toLowerCase();

  /* v8 ignore start */
  if (!faq.answer || !faq.question) return false;
  /* v8 ignore end */

  if (lowerCase === '') return true;

  return (
    faq.answer.toLowerCase().includes(lowerCase) ||
    faq.question.toLowerCase().includes(lowerCase)
  );
}

export function filterCategory(
  category: FaqCategoriesWithFaqDto,
  search: string | undefined
): boolean {
  if (!search) return true;

  const filteredFaqs = (category.faqs ?? []).filter((faq) =>
    faqInSearch(faq, search)
  );
  const filteredSubCategories = (category.subCategories ?? []).filter(
    (subcategory) => subcategory.faqs?.some((faq) => faqInSearch(faq, search))
  );

  return filteredFaqs.length > 0 || filteredSubCategories.length > 0;
}

export function mapCategoryToSearch(
  category: FaqCategoriesWithFaqDto,
  search: string | undefined
): FaqCategoriesWithFaqDto {
  const filteredFaqs = (category.faqs ?? []).filter(
    (faq) => !search || faqInSearch(faq, search)
  );
  const filteredSubCategories = (category.subCategories ?? [])
    .map((subcategory) => {
      const filteredSubFaqs = (subcategory.faqs ?? []).filter(
        (faq) => !search || faqInSearch(faq, search)
      );
      return filteredSubFaqs.length > 0
        ? {
            ...subcategory,
            faqs: filteredSubFaqs,
          }
        : null;
    })
    .filter(Boolean);

  return {
    ...category,
    faqs: filteredFaqs,
    subCategories:
      filteredSubCategories as FaqCategoriesWithFaqDto['subCategories'],
  };
}
