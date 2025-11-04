import type { FC } from 'react';

import {
  FaqCategoriesWithFaqDto,
  faqInSearch,
} from '../useFaqCategoriesWithFaqs';
import { Question } from './Question/Question';
import { Container, Content, Header } from './Category.styles';
import { Subcategory } from './Subcategory';
import { Typography } from 'src/molecules';

interface CategoryProps extends FaqCategoriesWithFaqDto {
  dataUpdatedAt: number;
}

export const Category: FC<CategoryProps> = ({
  faqs,
  id,
  categoryName,
  subCategories,
  dataUpdatedAt,
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
