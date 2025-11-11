import type { FC } from 'react';

import type { FaqCategoriesWithFaqDto } from '@equinor/subsurface-app-management';

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
  return (
    <Container>
      <Header id={`category-${id}`}>
        <Typography variant="h4">{categoryName}</Typography>
      </Header>
      <Content>
        {faqs?.map((question) => (
          <Question key={question.id} {...question} />
        ))}
        {subCategories?.map((subcategory) => (
          <Subcategory key={subcategory.id} {...subcategory} />
        ))}
      </Content>
    </Container>
  );
};
