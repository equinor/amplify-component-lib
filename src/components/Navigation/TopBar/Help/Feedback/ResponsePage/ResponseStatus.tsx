import { FC } from 'react';

import { FeedbackType } from '../Feedback.types';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import FullSlackResponse from './FullSlackResponse';
import RequestStatus from './RequestStatus';

interface ResponseStatusProps {}

const ResponseStatus: FC<ResponseStatusProps> = () => {
  const {
    serviceNowRequestResponse,
    selectedType,
    showAllSlackRequests,
    allSlackRequestStatus,
  } = useFeedbackContext();
  return (
    <>
      {selectedType === FeedbackType.BUG && (
        <RequestStatus
          title="Service Now"
          requestStatus={{ status: serviceNowRequestResponse.status }}
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
    </>
  );
};

export default ResponseStatus;
