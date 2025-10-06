import { FC, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { FaqCategory } from '@equinor/subsurface-app-management';
import { useSearch } from '@tanstack/react-router';

import { Question } from './Question';
import { spacings } from 'src/atoms/style';
import { Status } from 'src/organisms/Status';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  width: 100%;
  &:has(> div > div > svg) {
    transform: translateY(50%);
  }
`;

type CategoryProps = {
  selectedTab: string | undefined;
} & FaqCategory;

export const Category: FC<CategoryProps> = ({
  categoryName,
  faqs,
  selectedTab,
}) => {
  const { search } = useSearch({ strict: false });

  const sortedFaqs = useMemo(() => {
    return faqs.toSorted((a, b) => {
      const usingA = a.orderBy ?? 0;
      const usingB = b.orderBy ?? 0;
      return usingA - usingB;
    });
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    if (!search) return sortedFaqs;

    return sortedFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()) ||
        categoryName.toLowerCase().includes(search.toLowerCase())
    );
  }, [categoryName, search, sortedFaqs]);

  if (selectedTab !== undefined && filteredFaqs.length === 0) {
    return (
      <Container>
        <Status center={false}>
          <Status.Title title="No Questions Found" />
          <Status.Description text="No questions or answers matches your search in this category" />
        </Status>
      </Container>
    );
  }

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
