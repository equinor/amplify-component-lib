import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Question } from './Question';
import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  width: 100%;
`;

export const Category: FC = () => {
  return (
    <Container>
      <Typography variant="h4">Category title</Typography>
      <Question />
      <Question />
      <Question />
      <Question />
    </Container>
  );
};
