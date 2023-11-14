import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import PageMenuItem from './PageMenuItem';
import { usePageMenu } from 'src/providers/PageMenuProvider';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
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
