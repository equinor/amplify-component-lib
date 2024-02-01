import { FC } from 'react';

import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import OptionalTooltip from '../../../../../DataDisplay/OptionalTooltip';
import {
  NotificationsTypes,
  RequestReviewOrcaTypes,
} from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
  cursor: pointer;
`;

interface RequestReviewProps extends RequestReviewOrcaTypes {
  onClick?: () => void;
}

const RequestReviewOrca: FC<RequestReviewProps> = ({
  fromUser,
  branchName,
  onClick,
}) => {
  return (
    <Tooltip title={`Go to ${branchName}`}>
      <Container
        onClick={onClick}
        data-testid={NotificationsTypes.REQUESTED_REVIEW}
      >
        <OptionalTooltip title={`Go to ${branchName}`}>
          <Typography group="table" variant="cell_text">
            {fromUser.displayName} has requested review for branch {branchName}
          </Typography>
        </OptionalTooltip>
      </Container>
    </Tooltip>
  );
};

export default RequestReviewOrca;
