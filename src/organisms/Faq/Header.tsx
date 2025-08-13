import { ChangeEvent, FC, useMemo } from 'react';

import { Search } from '@equinor/eds-core-react';

import { useFaqsInApplication } from 'src/atoms/hooks/useFaqsInApplication';
import { useSearchParameter } from 'src/atoms/hooks/useSearchParameter';
import { colors, spacings } from 'src/atoms/style';
import { Tabs } from 'src/molecules/Tabs/Tabs';

import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  background: ${colors.ui.background__light.rgba};
  padding: ${spacings.x_large} 0;
  margin: calc(${spacings.x_large} * -1) 0;
  z-index: 400;
  > div[role='search'] > div {
    background: ${colors.ui.background__default.rgba};
  }
`;

export const Header: FC = () => {
  const { data } = useFaqsInApplication();
  const [selectedTab, setSelectedTab] = useSearchParameter<string | undefined>({
    key: 'category',
  });
  const [search, setSearch] = useSearchParameter<string>({
    key: 'search',
  });

  const tabOptions = useMemo(() => {
    if (!data)
      return [
        {
          value: 'all',
          label: 'All categories',
        },
      ];
    return [
      {
        value: 'all',
        label: 'All categories',
      },
      ...data.map((category) => ({
        value: category.id.toString(),
        label: category.categoryName,
      })),
    ];
  }, [data]);

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnTabChange = (value: string) => {
    if (value === 'all') setSelectedTab(undefined);
    else {
      setSelectedTab(value);
    }
  };

  return (
    <Container>
      <Tabs
        style={{ maxWidth: '100%', width: 'fit-content' }}
        selected={selectedTab ?? 'all'}
        onChange={handleOnTabChange}
        options={tabOptions}
      />
      <Search
        value={search}
        onChange={handleOnSearchChange}
        placeholder="Search for answer by keyword"
      />
    </Container>
  );
};
