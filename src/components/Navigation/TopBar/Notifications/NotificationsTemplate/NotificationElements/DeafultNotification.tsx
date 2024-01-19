import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { DefaultNotificationProps } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

const DeafultNotification: FC<DefaultNotificationProps> = ({ message }) => {
  return (
    <Container>
      <Typography group="table" variant="cell_text">
        {message}
      </Typography>
    </Container>
  );
};

export default DeafultNotification;
