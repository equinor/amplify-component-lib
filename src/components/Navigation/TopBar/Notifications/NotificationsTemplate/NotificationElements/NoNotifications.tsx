import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedBackIcon } from 'src/index';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  align-items: center;
  padding: ${spacings.comfortable.large};
`;

const NoNotifications: FC = () => {
  return (
    <Container>
      <FeedBackIcon name="positive" variant="filled" />
      <Typography> No notifications </Typography>
    </Container>
  );
};

export default NoNotifications;
