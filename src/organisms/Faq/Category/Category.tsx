import type { FC } from 'react';

import { visibility_off } from '@equinor/eds-icons';
import { useSearch } from '@tanstack/react-router';

import {
  FaqCategoriesWithFaqDto,
  faqInSearch,
} from '../useFaqCategoriesWithFaqs';
import { Question } from './Question/Question';
import { Container, Content, Header } from './Category.styles';
import { Subcategory } from './Subcategory';
import { colors } from 'src/atoms';
import { Icon, Typography } from 'src/molecules';

interface CategoryProps extends FaqCategoriesWithFaqDto {
  dataUpdatedAt: number;
}

export const Category: FC<CategoryProps> = ({
  faqs,
  id,
  categoryName,
  subCategories,
  dataUpdatedAt,
  visible,
}) => {
  // const { search } = useSearch({
  //   from: '/app-management/$appId/faq/',
  // });

  const search = '';

  const data = faqs ?? [];

  const filteredFaqs = data.filter(
    (faq) => !search || faqInSearch(faq, search)
  );

  const filteredSubcategories = subCategories?.filter(
    (subcategory) =>
      (!search || subcategory.faqs?.some((faq) => faqInSearch(faq, search))) &&
      subcategory.faqs &&
      subcategory.faqs.length > 0
  );

  if (
    filteredFaqs.length === 0 &&
    (!filteredSubcategories || filteredSubcategories.length === 0)
  )
    return null;

  return (
    <Container>
      <Header>
        <Typography variant="h4" id={`category-${id}`}>
          {categoryName}
        </Typography>
        {!visible && (
          <>
            <Icon
              data={visibility_off}
              color={colors.text.static_icons__tertiary.rgba}
            />
            <Typography
              variant="body_short"
              color={colors.text.static_icons__tertiary.rgba}
            >
              Not Visible
            </Typography>
          </>
        )}
      </Header>
      <Content>
        <Content>
          {filteredFaqs.map((question) => (
            <Question key={question.id} {...question} />
          ))}
          {filteredSubcategories?.map((subcategory) => (
            <Subcategory
              key={subcategory.id}
              dataUpdatedAt={dataUpdatedAt}
              {...subcategory}
            />
          ))}
        </Content>
      </Content>
    </Container>
  );
};
