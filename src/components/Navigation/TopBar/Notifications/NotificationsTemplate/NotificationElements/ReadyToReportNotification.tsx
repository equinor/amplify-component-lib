import { FC } from 'react';

import { Chip, Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import {
  NotificationsTypes,
  ReadyToReportNotificationTypes,
} from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

const SmallContainers = styled.div`
  display: flex;
  flex-direction: column;
`;

const LastContainer = styled.div`
  grid-column: span 3;
  display: flex;
  gap: 5px;
  align-items: center;
`;

interface ReadyToReportNotificationsProps
  extends ReadyToReportNotificationTypes {
  onClick?: () => void;
}

const ReadyToReportNotification: FC<ReadyToReportNotificationsProps> = ({
  field,
  wellbore,
  dataType,
  onClick,
}) => {
  return (
    <Tooltip title={`Go to ${dataType}`}>
      <Container
        onClick={onClick}
        data-testid={NotificationsTypes.READY_TO_REPORT}
      >
        <SmallContainers>
          <Typography group="paragraph" variant="overline">
            Field
          </Typography>
          <Typography group="table" variant="cell_text">
            {field}
          </Typography>
        </SmallContainers>
        <SmallContainers>
          <Typography group="paragraph" variant="overline">
            WELLBORE
          </Typography>
          <Typography group="table" variant="cell_text">
            {wellbore}
          </Typography>
        </SmallContainers>
        <LastContainer>
          <Chip> {dataType} </Chip>
          <Typography group="navigation" variant="label">
            is ready to report
          </Typography>
        </LastContainer>
      </Container>
    </Tooltip>
  );
};

export default ReadyToReportNotification;
