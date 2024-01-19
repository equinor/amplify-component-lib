import { FC } from 'react';

import PageMenuItem from './PageMenuItem';
import { usePageMenu } from 'src/providers/PageMenuProvider';
import { spacings } from 'src/style';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
`;

interface PageMenuProps {
  onlyShowSelectedChildren?: boolean;
}

const PageMenu: FC<PageMenuProps> = ({ onlyShowSelectedChildren = true }) => {
  const { items } = usePageMenu();

  return (
    <Container className="page-menu">
      {items.map((item) => (
        <PageMenuItem
          key={`page-menu-item-${item.value}`}
          {...item}
          onlyShowSelectedChildren={onlyShowSelectedChildren}
        />
      ))}
    </Container>
  );
};

export default PageMenu;
