import { FC } from 'react';

import { AttachmentStatus, FeedbackEnum, Status } from '../FeedbackForm.types';

interface RequestStatusProps {
  feedbackType: FeedbackEnum;
  serviceNowRequest: Status;
  slackRequest: Status;
  slackAttachments: AttachmentStatus[];
}

const RequestStatus: FC<RequestStatusProps> = ({
  serviceNowRequest,
  slackRequest,
  slackAttachments,
}) => {
  return (
    <div>
      <p>{`serviceNow: ${serviceNowRequest.status ?? 'loading'}`}</p>
      <p>{`slack: ${slackRequest.status ?? 'loading'}`}</p>
      <ul>
        {slackAttachments.map((attachment) => {
          return (
            <li
              key={attachment.fileName}
            >{`${attachment.fileName}: ${attachment.status}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default RequestStatus;
