import { FC, ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spacings.comfortable.medium_small};
`;

interface ItemProps {
  title: string;
  children: ReactNode;
}

const Item: FC<ItemProps> = ({ title, children }) => (
  <Container>
    {children}
    <Typography variant="caption">{title}</Typography>
  </Container>
);

export default Item;
