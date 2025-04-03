import { ChangeEvent, FC } from 'react';

import { Search } from '@equinor/eds-core-react';

import { useSearchParameter } from 'src/atoms/hooks/useSearchParameter';
import { colors, spacings } from 'src/atoms/style';

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
  const [search, setSearch] = useSearchParameter<string>({
    key: 'search',
  });

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Container>
      Tabs tabs
      <Search
        value={search}
        onChange={handleOnSearchChange}
        placeholder="Search for answer by keyword"
      />
    </Container>
  );
};
