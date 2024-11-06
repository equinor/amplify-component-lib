import { FC } from 'react';

import { spacings } from 'src/atoms';
import { Illustration } from 'src/organisms/Status/Illustration';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const Status: FC = () => {
  return (
    <Container>
      <Illustration />
    </Container>
  );
};
