import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

const ExperienceDue3Weeks: FC = () => {
  return (
    <Container>
      <div>
        <Typography bold> Experience report are due in 3 weeks </Typography>
        <Typography> NO 16/2-D-6 </Typography>
      </div>
      <div>
        <Typography> 0 experiences </Typography>
      </div>
    </Container>
  );
};

export default ExperienceDue3Weeks;
