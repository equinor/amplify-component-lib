import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { Typography } from 'src/molecules';
import { FeedBackIcon } from 'src/molecules/FeedBackIcon/FeedBackIcon';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  align-items: center;
  padding: ${spacings.comfortable.large};
`;

export const NoNotifications: FC = () => {
  return (
    <Container>
      <FeedBackIcon name="positive" variant="filled" />
      <Typography> No notifications </Typography>
    </Container>
  );
};
