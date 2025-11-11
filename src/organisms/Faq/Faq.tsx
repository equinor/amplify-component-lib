import { type FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { useSearch } from '@tanstack/react-router';

import { Status } from '../Status';
import { TableOfContents } from '../TableOfContents/TableOfContents';
import { Category } from './Category/Category';
import { CategorySkeleton } from './Category/CategorySkeleton';
import { AppPageWrapper } from './AppPageWrapper';
import { categoryHasFaqs, faqInSearch, HEADER_HEIGHT } from './Faq.utils';
import { Search } from './Search';
import { useFaqsInApplication } from 'src/atoms';
import { colors, spacings } from 'src/atoms/style';
import {
  TableOfContentsItemType,
  TableOfContentsProvider,
} from 'src/providers/TableOfContentsProvider';

import styled from 'styled-components';

const Container = styled.div<{ $showToc: boolean }>`
  display: grid;
  grid-template-columns: ${({ $showToc }) =>
    $showToc ? '1fr 180px' : '1fr auto'};
  gap: ${spacings.large};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.large};
`;

const TOCWrapper = styled.div`
  height: fit-content;
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  grid-row: span 2;
`;

const AppHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  padding: ${spacings.large} 0;
  background: ${colors.ui.background__light.rgba};
  z-index: 100;
`;

export interface FaqProps {
  searchPlaceholder?: string;
  title?: string;
}

export const Faq: FC<FaqProps> = ({ searchPlaceholder, title }) => {
  const { search } = useSearch({ strict: false });

  const { data: categories, isLoading } = useFaqsInApplication();
  const isSearchingOrFiltering = !!search;

  const filteredCategories = (categories ?? [])
    .filter(categoryHasFaqs)
    .filter(
      (category) =>
        !search ||
        (category.faqs ?? []).some((faq) => faqInSearch(faq, search)) ||
        category.subCategories?.some((subcategory) =>
          subcategory.faqs?.some((faq) => faqInSearch(faq, search))
        )
    );

  const tableOfContentsItems: TableOfContentsItemType[] =
    filteredCategories.map((category) => ({
      label: category.categoryName ?? '',
      value: `category-${category.id}`,
      count:
    filteredCategories.map((category) => {
      // Filter FAQs and subcategories based on search
      const filteredFaqs = !search
        ? category.faqs ?? []
        : (category.faqs ?? []).filter((faq) => faqInSearch(faq, search));
      const filteredSubCategories = (category.subCategories ?? [])
        .map((subcategory) => {
          const filteredSubFaqs = !search
            ? subcategory.faqs ?? []
            : (subcategory.faqs ?? []).filter((faq) => faqInSearch(faq, search));
          return filteredSubFaqs.length > 0
            ? {
                label: subcategory.categoryName ?? '',
                value: `subcategory-${subcategory.id}`,
                count: filteredSubFaqs.length,
              }
            : null;
        })
        .filter(Boolean);
      return {
        label: category.categoryName ?? '',
        value: `category-${category.id}`,
        count:
          filteredFaqs.length +
          (category.subCategories
            ? category.subCategories.reduce((sum, sub) => {
                const subFaqs = !search
                  ? sub.faqs ?? []
                  : (sub.faqs ?? []).filter((faq) => faqInSearch(faq, search));
                return sum + subFaqs.length;
              }, 0)
            : 0),
        /* v8 ignore start */
        children: [
          ...filteredFaqs.map((faq) => ({
            label: faq.question ?? '',
            value: `faq-${faq.id}`,
          })),
          ...filteredSubCategories,
        ],
        /* v8 ignore end */
      };
    });

  const isEmpty =
    !isLoading &&
    (filteredCategories.length === 0 ||
      filteredCategories.every((category) => !categoryHasFaqs(category)));

  const showToc = isLoading || tableOfContentsItems.length > 0;

  return (
    <AppPageWrapper>
      <AppHeaderWrapper>
        <Typography variant="h1" bold>
          {title ?? 'FAQ'}
        </Typography>
      </AppHeaderWrapper>
      <TableOfContentsProvider items={tableOfContentsItems} hashNavigation>
        <Container $showToc={showToc}>
          <Search placeholder={searchPlaceholder} />
          <TOCWrapper>
            <TableOfContents />
          </TOCWrapper>
          <Content>
            {isLoading ? (
              Array.from({ length: 2 })
                .fill(null)
                .map((_, index) => (
                  <CategorySkeleton key={`category-${index.toString()}`} />
                ))
            ) : !isEmpty ? (
              filteredCategories.map((category) => (
                <Category key={category.id} {...category} />
              ))
            ) : (
              <Status center={false}>
                <Status.Title
                  title={`No FAQs ${isSearchingOrFiltering ? 'found' : 'yet'}`}
                />
              </Status>
            )}
          </Content>
        </Container>
      </TableOfContentsProvider>
    </AppPageWrapper>
  );
};
