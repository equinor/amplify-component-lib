import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ApplicationIcon from '../../../../Icons/ApplicationIcon/ApplicationIcon';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const NoNotifications: FC = () => {
  return (
    <Container>
      <ApplicationIcon name="fallback" />
      <Typography> No notifications </Typography>
    </Container>
  );
};

export default NoNotifications;
