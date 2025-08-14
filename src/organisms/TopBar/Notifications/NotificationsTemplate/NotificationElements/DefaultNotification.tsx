import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import {
  DefaultNotificationTypes,
  NotificationsTypes,
} from '../Notifications.types';
import { spacings } from 'src/atoms';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  padding-top: ${spacings.medium_small};
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
