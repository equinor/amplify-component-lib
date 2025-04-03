import { FC, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { FaqCategory } from '@equinor/subsurface-app-management';

import { Question } from './Question';
import { useSearchParameter } from 'src/atoms';
import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  width: 100%;
`;

export const Category: FC<FaqCategory> = ({ categoryName, faqs }) => {
  const [search] = useSearchParameter<string | undefined>({
    key: 'search',
  });
  const sortedFaqs = useMemo(() => {
    return faqs.toSorted((a, b) => {
      const usingA = a.orderBy ?? 0;
      const usingB = b.orderBy ?? 0;
      return usingA - usingB;
    });
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    if (!search) return sortedFaqs;

    return sortedFaqs.filter((faq) =>
      faq.answer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, sortedFaqs]);

  console.log('serach', search);
  if (filteredFaqs.length === 0) return null;

  return (
    <Container>
      <Typography variant="h4">{categoryName}</Typography>
      {filteredFaqs.map((faq) => (
        <Question key={faq.id} {...faq} />
      ))}
    </Container>
  );
};
