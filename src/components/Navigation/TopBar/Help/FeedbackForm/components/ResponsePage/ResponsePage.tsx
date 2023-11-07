import { FC, useMemo } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FullSlackResponse from './FullSlackResponse';
import RequestStatus from './RequestStatus';
import {
  AttachmentStatus,
  FeedbackEnum,
  RequestStatusType,
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
  serviceNowRequest: RequestStatusType;
  slackRequest: RequestStatusType;
  slackAttachments: AttachmentStatus[];
  toggleResponsePage: () => void;
}

const ResponsePage: FC<ResponsePageProps> = ({
  feedbackType,
  serviceNowRequest,
  slackRequest,
  slackAttachments,
  toggleResponsePage,
}) => {
  const allSlackRequestStatus = useMemo<StatusEnum>(() => {
    const allStatuses: StatusEnum[] = [
      slackRequest.status,
      ...slackAttachments.map((attachment) => attachment.status),
    ];
    console.log(allStatuses);
    if (allStatuses.every((status) => status === StatusEnum.SUCCESS))
      return StatusEnum.SUCCESS;

    if (allStatuses.includes(StatusEnum.ERROR)) {
      return StatusEnum.PARTIAL;
    }
    if (allStatuses.includes(StatusEnum.PENDING)) {
      return StatusEnum.PENDING;
    }
    return StatusEnum.IDLE;
  }, [slackAttachments, slackRequest.status]);
  console.log(allSlackRequestStatus);
  const showAllSlackRequests = useMemo(() => {
    return (
      allSlackRequestStatus === StatusEnum.ERROR ||
      allSlackRequestStatus === StatusEnum.PARTIAL
    );
  }, [allSlackRequestStatus]);

  return (
    <Container>
      {feedbackType === FeedbackEnum.BUG && (
        <RequestStatus title="Service Now" requestStatus={serviceNowRequest} />
      )}
      {showAllSlackRequests ? (
        <FullSlackResponse
          attachments={slackAttachments}
          slackRequest={slackRequest}
          allSlackRequestStatus={{ status: allSlackRequestStatus }}
        />
      ) : (
        <RequestStatus
          title="Slack"
          requestStatus={{ status: allSlackRequestStatus }}
        />
      )}
      <Button onClick={toggleResponsePage}>Close</Button>
    </Container>
  );
};

export default ResponsePage;
