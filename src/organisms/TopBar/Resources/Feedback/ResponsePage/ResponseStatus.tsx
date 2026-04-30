import { FC } from 'react';

import { WorkItemType } from '@equinor/subsurface-app-management';

import { useFeedbackContext } from '../hooks/useFeedbackContext';
import { RequestStatus } from './RequestStatus';

export const ResponseStatus: FC = () => {
  const { serviceNowRequestResponse, workItemRequestResponse, selectedType } =
    useFeedbackContext();
  return (
    <>
      {selectedType === WorkItemType.BUG && (
        <RequestStatus
          title="Service Now"
          requestStatus={serviceNowRequestResponse}
        />
      )}

      <RequestStatus
        title="Development team"
        requestStatus={workItemRequestResponse}
      />
    </>
  );
};

export default ResponseStatus;
