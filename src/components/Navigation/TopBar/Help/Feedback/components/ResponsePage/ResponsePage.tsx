import { FC, useMemo } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ContentWrapper } from '../../Feedback.styles';
import { FeedbackType, StatusEnum } from '../../Feedback.types';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import FullSlackResponse from './FullSlackResponse';
import RequestStatus from './RequestStatus';

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

interface ResponsePageProps {}

const ResponsePage: FC<ResponsePageProps> = () => {
  const {
    serviceNowRequestResponse,
    slackRequestResponse,
    slackAttachmentsRequestResponse,
    selectedType,
    onDialogClose,
  } = useFeedbackContext();

  const allSlackRequestStatus = useMemo<StatusEnum>(() => {
    const allStatuses: StatusEnum[] = [
      slackRequestResponse.status,
      ...slackAttachmentsRequestResponse.map((attachment) => attachment.status),
    ];
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
  }, [slackAttachmentsRequestResponse, slackRequestResponse.status]);

  const showAllSlackRequests = useMemo(() => {
    return (
      allSlackRequestStatus === StatusEnum.error ||
      allSlackRequestStatus === StatusEnum.partial
    );
  }, [allSlackRequestStatus]);
  console.log('in ResponsePage.tsx');
  return (
    <ContentWrapper>
      <Container>
        {selectedType === FeedbackType.BUG && (
          <RequestStatus
            title="Service Now"
            requestStatus={serviceNowRequestResponse}
          />
        )}
        {showAllSlackRequests ? (
          <FullSlackResponse
            allSlackRequestStatus={{ status: allSlackRequestStatus }}
          />
        ) : (
          <RequestStatus
            title="Development team"
            requestStatus={{ status: allSlackRequestStatus }}
          />
        )}
        <Button onClick={onDialogClose}>Close</Button>
      </Container>
    </ContentWrapper>
  );
};

export default ResponsePage;
