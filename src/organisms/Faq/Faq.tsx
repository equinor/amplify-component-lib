import { FC, useMemo, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Container } from './Faq.styles';
import { Header } from './Header';
import { useFaqsInApplication } from 'src/atoms/hooks/useFaqsInApplication';
import { Category } from 'src/organisms/Faq/Category/Category';
import { CategorySkeleton } from 'src/organisms/Faq/CategorySkeleton';
import { Status } from 'src/organisms/Status';

// TODO: Before @tanstack/react-router switch can be released, these components need to be updated
export const Faq: FC = () => {
  const { data, isLoading } = useFaqsInApplication();
  const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);

  const filteredCategories = useMemo(() => {
    if (!data) return;

    if (!selectedTab) {
      return data;
    }
    const category = data.find(
      (category) => category.id == Number(selectedTab)
    )!;

    return [category];
  }, [data, selectedTab]);

  return (
    <Container>
      <Typography variant="h1" bold>
        FAQ
      </Typography>
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {filteredCategories && filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <Category key={category.id} {...category} selectedTab={selectedTab} />
        ))
      ) : isLoading ? (
        <>
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </>
      ) : (
        <Status center={false}>
          <Status.Title title="No FAQs available yet" />
        </Status>
      )}
    </Container>
  );
};
