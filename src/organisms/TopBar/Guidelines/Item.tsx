import { FC, ReactNode } from 'react';

import { spacings } from 'src/atoms/style';
import { Typography } from 'src/molecules';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spacings.medium_small};
`;

interface ItemProps {
  title: string;
  children: ReactNode;
}

export const Item: FC<ItemProps> = ({ title, children }) => (
  <Container>
    {children}
    <Typography variant="caption">{title}</Typography>
  </Container>
);
