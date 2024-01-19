import { FC } from 'react';

import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ReviewQANotificationsTypes } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

interface ReviewQANotificationProps extends ReviewQANotificationsTypes {
  onClick: () => void;
}

const ReviewQANotification: FC<ReviewQANotificationProps> = ({
  well,
  experienceComments,
  experience,
  onClick,
}) => {
  return (
    <Tooltip title={`Go to ${experience.title}`}>
      <Container onClick={onClick}>
        <div>
          <Typography group="table" variant="cell_text" bold>
            Please review my QA comments
          </Typography>
          <Typography group="table" variant="cell_text">
            {well.displayName}
          </Typography>
          <Typography group="table" variant="cell_text">
            {experience.title} - {experience?.topic?.displayName}
          </Typography>
        </div>
        <div>
          <Typography group="table" variant="cell_text">
            {experienceComments} comments
          </Typography>
        </div>
      </Container>
    </Tooltip>
  );
};

export default ReviewQANotification;
