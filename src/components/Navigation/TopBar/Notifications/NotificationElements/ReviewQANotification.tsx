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

const ReviewQANotification: FC = () => {
  return (
    <Container>
      <div>
        <Typography bold>Please review my QA comments</Typography>
        <Typography> NO 16/2-D-6</Typography>
        <Typography> Experience title - topic </Typography>
      </div>
      <div>
        <Typography> 2 Comments </Typography>
      </div>
    </Container>
  );
};

export default ReviewQANotification;
