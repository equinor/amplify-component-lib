import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { RequestStatusType } from '../Feedback.types';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import RequestStatus from './RequestStatus';
import { spacings } from 'src/atoms/style';
import { SlackRequestsWrapper } from 'src/organisms/TopBar/Resources/Feedback/ResponsePage/ResponsePage.styles';

import styled from 'styled-components';

const { colors } = tokens;

const Container = styled.div`
  padding: ${spacings.small};
  background-color: ${colors.ui.background__light.rgba};
`;

interface SlackResponseProps {
  allSlackRequestStatus: RequestStatusType;
}

export const FullSlackResponse: FC<SlackResponseProps> = ({
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
