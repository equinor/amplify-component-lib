import { type FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { useSearch } from '@tanstack/react-router';

import { Status } from '../Status';
import { TableOfContents } from '../TableOfContents/TableOfContents';
import { Category } from './Category/Category';
import { CategorySkeleton } from './Category/CategorySkeleton';
import { AppPageWrapper } from './AppPageWrapper';
import {
  categoryHasFaqs,
  filterCategory,
  HEADER_HEIGHT,
  mapCategoryToSearch,
} from './Faq.utils';
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
    .map((category) => mapCategoryToSearch(category, search))
    .filter(filterCategory);

  // Since we already filter the categories etc, this doesn't have to be covered by a test
  /* v8 ignore start */
  const tableOfContentsItems: TableOfContentsItemType[] =
    filteredCategories.map((category) => {
      return {
        label: category.categoryName ?? '',
        value: `category-${category.id}`,
        count:
          (category.faqs ?? []).length +
          (category.subCategories
            ? category.subCategories.reduce((sum, subcategory) => {
                return sum + (subcategory.faqs ?? []).length;
              }, 0)
            : 0),
        children: [
          ...(category.faqs ?? []).map((faq) => ({
            label: faq.question ?? '',
            value: `faq-${faq.id}`,
          })),
          ...(category.subCategories ?? []).map((subcategory) => ({
            label: subcategory.categoryName ?? '',
            value: `subcategory-${subcategory.id}`,
            count: (subcategory.faqs ?? []).length,
          })),
        ],
      };
    });
  /* v8 ignore end */

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
