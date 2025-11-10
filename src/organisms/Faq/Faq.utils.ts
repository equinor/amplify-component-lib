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

  return (
    faq.answer.toLowerCase().includes(lowerCase) ||
    faq.question.toLowerCase().includes(lowerCase)
  );
}
