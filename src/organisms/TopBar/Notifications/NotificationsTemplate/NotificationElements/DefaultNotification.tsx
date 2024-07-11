import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import {
  DefaultNotificationTypes,
  NotificationsTypes,
} from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

export const DefaultNotification: FC<DefaultNotificationTypes> = ({
  message,
}) => {
  return (
    <Container data-testid={NotificationsTypes.DEFAULT}>
      <Typography group="table" variant="cell_text">
        {message}
      </Typography>
    </Container>
  );
};
