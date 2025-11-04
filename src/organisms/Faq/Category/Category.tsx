import type { FC } from 'react';

import { useSearch } from '@tanstack/react-router';

import { FaqCategoriesWithFaqDto, faqInSearch } from '../Faq.utils';
import { Question } from './Question/Question';
import { Container, Content, Header } from './Category.styles';
import { Subcategory } from './Subcategory';
import { Typography } from 'src/molecules';

export const Category: FC<FaqCategoriesWithFaqDto> = ({
  faqs,
  id,
  categoryName,
  subCategories,
}) => {
  const { search } = useSearch({ strict: false });

  const filteredFaqs = faqs?.filter(
    (faq) => !search || faqInSearch(faq, search)
  );

  const filteredSubcategories = subCategories?.filter(
    (subcategory) =>
      (!search || subcategory.faqs?.some((faq) => faqInSearch(faq, search))) &&
      subcategory.faqs &&
      subcategory.faqs.length > 0
  );

  if (
    filteredFaqs?.length === 0 &&
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
        {filteredFaqs?.map((question) => (
          <Question key={question.id} {...question} />
        ))}
        {filteredSubcategories?.map((subcategory) => (
          <Subcategory key={subcategory.id} {...subcategory} />
        ))}
      </Content>
    </Container>
  );
};
