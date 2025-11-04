import { type FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Status } from '../Status';
import { TableOfContents } from '../TableOfContents/TableOfContents';
import { Category } from './Category/Category';
import { CategorySkeleton } from './Category/CategorySkeleton';
import { AppPageWrapper } from './AppPageWrapper';
import { Search } from './Search';
import {
  faqInSearch,
  useFaqCategoriesWithFaqs,
} from './useFaqCategoriesWithFaqs';
import { colors, spacings } from 'src/atoms/style';
import {
  TableOfContentsItemType,
  TableOfContentsProvider,
} from 'src/providers/TableOfContentsProvider';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 180px;
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
  grid-row: span 2;
`;

const AppHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  padding-top: ${spacings.large};
  padding-bottom: ${spacings.large};
  background: ${colors.ui.background__light.rgba};
  z-index: 100;
`;

interface FaqProps {
  searchPlaceholder?: string;
  title?: string;
}

export const Faq: FC<FaqProps> = ({ searchPlaceholder, title }) => {
  // const navigate = useNavigate({ from: '/app-management/$appId/faq' });
  // const { search } = useSearch({
  //   from: '/app-management/$appId/faq/',
  // });

  const search = '';

  const {
    data: categories,
    isLoading,
    dataUpdatedAt,
  } = useFaqCategoriesWithFaqs();
  const isSearchingOrFiltering = !!search;

  const filteredCategories = (categories ?? []).filter(
    (category) =>
      !search ||
      (category.faqs ?? []).some((faq) => faqInSearch(faq, search)) ||
      category.subCategories?.some((subcategory) =>
        subcategory.faqs?.some((faq) => faqInSearch(faq, search))
      )
  );

  const tableOfContentsItems: TableOfContentsItemType[] =
    filteredCategories.map((category) => ({
      label: category.categoryName,
      value: `category-${category.id}`,
      count: category.faqs?.length,
      children: [
        ...(category.faqs ?? []).map((faq) => ({
          label: faq.question ?? '',
          value: `faq-${faq.id}`,
        })),
        ...(category.subCategories ?? [])
          .filter(
            (subcategory) => subcategory.faqs && subcategory.faqs.length > 0
          )
          .map((subcategory) => ({
            label: subcategory.categoryName,
            value: `subcategory-${subcategory.id}`,
            count: subcategory.faqs?.length,
          })),
      ],
    }));

  console.log('title', title);

  return (
    <AppPageWrapper>
      <AppHeaderWrapper>
        <Typography variant="h1" bold>
          {title ?? 'FAQ'}
        </Typography>
      </AppHeaderWrapper>
      <TableOfContentsProvider items={tableOfContentsItems} hashNavigation>
        <Container>
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
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Category
                  key={category.id}
                  dataUpdatedAt={dataUpdatedAt}
                  {...category}
                />
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
