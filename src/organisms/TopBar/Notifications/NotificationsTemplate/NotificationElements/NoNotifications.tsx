import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { spacings } from 'src/atoms/style';
import { FeedBackIcon } from 'src/molecules/FeedBackIcon/FeedBackIcon';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  align-items: center;
  padding: ${spacings.large};
`;

export const NoNotifications: FC = () => {
  return (
    <Container>
      <FeedBackIcon name="positive" variant="filled" />
      <Typography> No notifications </Typography>
    </Container>
  );
};
