import { FC, useMemo } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FullSlackResponse from './FullSlackResponse';
import RequestStatus from './RequestStatus';
import {
  FeedbackEnum,
  FeedbackRequestStatus,
  StatusEnum,
} from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.large};
  flex-direction: column;
  button {
    align-self: flex-end;
  }
`;

interface ResponsePageProps {
  feedbackType: FeedbackEnum;
  feedbackLocalStorage: FeedbackRequestStatus;
  onClose: () => void;
}

const ResponsePage: FC<ResponsePageProps> = ({
  feedbackType,
  feedbackLocalStorage,
  onClose,
}) => {
  const {
    slackRequestResponse,
    slackAttachmentsResponse,
    serviceNowRequestResponse,
  } = feedbackLocalStorage;

  const allSlackRequestStatus = useMemo<StatusEnum>(() => {
    const allStatuses: StatusEnum[] = [
      slackRequestResponse.status,
      ...slackAttachmentsResponse.map((attachment) => attachment.status),
    ];
    console.log('allstatuses ', allStatuses);
    if (allStatuses.every((status) => status === StatusEnum.success)) {
      return StatusEnum.success;
    }
    if (allStatuses.includes(StatusEnum.error)) {
      return StatusEnum.partial;
    }
    if (allStatuses.includes(StatusEnum.pending)) {
      return StatusEnum.pending;
    }
    return StatusEnum.idle;
  }, [slackAttachmentsResponse, slackRequestResponse.status]);

  const showAllSlackRequests = useMemo(() => {
    return (
      allSlackRequestStatus === StatusEnum.error ||
      allSlackRequestStatus === StatusEnum.partial
    );
  }, [allSlackRequestStatus]);
  console.log('show all slack', showAllSlackRequests);
  return (
    <Container>
      {feedbackType === FeedbackEnum.BUG && (
        <RequestStatus
          title="Service Now"
          requestStatus={serviceNowRequestResponse}
        />
      )}
      {showAllSlackRequests ? (
        <FullSlackResponse
          attachments={slackAttachmentsResponse}
          slackRequest={slackRequestResponse}
          allSlackRequestStatus={{ status: allSlackRequestStatus }}
        />
      ) : (
        <RequestStatus
          title="Development team"
          requestStatus={{ status: allSlackRequestStatus }}
        />
      )}
      <Button onClick={onClose}>Close</Button>
    </Container>
  );
};

export default ResponsePage;
