import { FC, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { FaqCategory } from '@equinor/subsurface-app-management';

import { Question } from './Question';
import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  width: 100%;
`;

export const Category: FC<FaqCategory> = ({ categoryName, faqs }) => {
  const sortedFaqs = useMemo(() => {
    return faqs.toSorted((a, b) => {
      const usingA = a.orderBy ?? 0;
      const usingB = b.orderBy ?? 0;
      return usingA - usingB;
    });
  }, [faqs]);

  return (
    <Container>
      <Typography variant="h4">{categoryName}</Typography>
      {sortedFaqs.map((faq) => (
        <Question key={faq.id} {...faq} />
      ))}
    </Container>
  );
};
