import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { RequestStatusType } from '../../Feedback.types';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import RequestStatus from './RequestStatus';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Container = styled.div`
  padding: ${spacings.comfortable.small};
  background-color: ${colors.ui.background__light.hex};
`;

const SlackRequestsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${spacings.comfortable.medium};
  gap: ${spacings.comfortable.large};
  margin-left: ${spacings.comfortable.large};
`;

interface SlackResponseProps {
  allSlackRequestStatus: RequestStatusType;
}

const FullSlackResponse: FC<SlackResponseProps> = ({
  allSlackRequestStatus,
}) => {
  const { slackRequestResponse, slackAttachmentsRequestResponse } =
    useFeedbackContext();

  return (
    <Container>
      <RequestStatus
        title="Sending to development team"
        requestStatus={allSlackRequestStatus}
      />
      <SlackRequestsWrapper>
        <RequestStatus
          title="Posting text "
          requestStatus={slackRequestResponse}
        />
        {slackAttachmentsRequestResponse.map((attachment) => {
          return (
            <RequestStatus
              key={attachment.fileName}
              title={`Posting ${attachment.fileName}`}
              requestStatus={attachment}
            />
          );
        })}
      </SlackRequestsWrapper>
    </Container>
  );
};

export default FullSlackResponse;
