import { FC, useEffect, useMemo, useState } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ContentWrapper } from '../Feedback.styles';
import { FeedbackType, StatusEnum } from '../Feedback.types';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
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

const ResponsePage: FC = () => {
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const {
    serviceNowRequestResponse,
    slackRequestResponse,
    slackAttachmentsRequestResponse,
    selectedType,
    handleResponsePageOnClose,
    requestIsLoading,
    resetForm,
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
    return StatusEnum.idle;
  }, [slackAttachmentsRequestResponse, slackRequestResponse.status]);

  const showAllSlackRequests = useMemo(() => {
    return (
      allSlackRequestStatus === StatusEnum.error ||
      allSlackRequestStatus === StatusEnum.partial
    );
  }, [allSlackRequestStatus]);

  const requestHasError = useMemo(() => {
    return (
      showAllSlackRequests ||
      serviceNowRequestResponse.status === StatusEnum.error
    );
  }, [serviceNowRequestResponse.status, showAllSlackRequests]);

  const allRequestsHaveBeenSuccess: boolean = useMemo(() => {
    const allStatuses = [
      allSlackRequestStatus,
      serviceNowRequestResponse.status,
    ];
    console.log('allStat', allStatuses);
    return allStatuses.every((status) => {
      return status === StatusEnum.success;
    });
  }, [allSlackRequestStatus, serviceNowRequestResponse]);
  console.log(allRequestsHaveBeenSuccess);

  useEffect(() => {
    console.log('in useEffect');
    if (!showSuccessPage && allRequestsHaveBeenSuccess) {
      console.log('in UE if');
      setTimeout(() => {
        setShowSuccessPage(true);
        resetForm();
      }, 1000);
    }
  }, [allRequestsHaveBeenSuccess, resetForm, showSuccessPage]);

  if (showSuccessPage) return <div>truth</div>;

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
        <Button disabled={requestIsLoading} onClick={handleResponsePageOnClose}>
          {requestHasError ? 'Retry' : 'Close'}
        </Button>
      </Container>
    </ContentWrapper>
  );
};

export default ResponsePage;
