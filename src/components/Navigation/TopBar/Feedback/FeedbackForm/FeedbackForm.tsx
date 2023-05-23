import { FC, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { useMutation, useQuery } from '@tanstack/react-query';

import { TokenService } from '../../../../../api/index';
import { environment } from '../../../../../utils';
import { createSlackMessage } from '../Feedback.utils';
import FeedbackDetails, { SeverityOption } from './FeedbackDetails';
import SelectType from './SelectType';

const { getEnvironmentName } = environment;

export enum FeedbackEnum {
  ERROR = 'error',
  INQUIRY = 'inquiry',
}

export type FeedbackContentType = {
  title: string;
  description: string;
  severity?: string;
  url?: string;
  attachments?: FileWithPath[];
};

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState<FeedbackEnum | undefined>(
    undefined
  );
  const [feedbackContent, setFeedbackContent] = useState<FeedbackContentType>({
    title: '',
    description: '',
  });

  const { data: portalToken } = useQuery<string>(
    ['getPortalToken'],
    TokenService.getAmplifyPortalToken
  );
  console.log(portalToken);

  const { mutate: slackFileUpload } = useMutation(
    ['slackFileUpload'],
    async () => {
      const formData = new FormData();
      if (feedbackContent.attachments && feedbackContent.attachments[0]) {
        await formData.append('file', feedbackContent.attachments[0]);
      }
      await formData.append(
        'comment',
        createSlackMessage(feedbackContent, selectedType)
      );

      await fetch(
        `https://api-amplify-portal-${getEnvironmentName(
          import.meta.env.VITE_ENVIRONMENT_NAME
        )}.radix.equinor.com/api/v1/Slack/fileUpload`,
        {
          method: 'POST',
          body: formData,
        }
      );
    }
  );

  const updateFeedback = (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[]
  ) => {
    setFeedbackContent({ ...feedbackContent, [key]: newValue });
  };

  const handleSave = () => {
    slackFileUpload();
    onClose();
  };

  if (selectedType) {
    return (
      <FeedbackDetails
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
        handleSave={handleSave}
      />
    );
  }
  return <SelectType setSelectedType={setSelectedType} />;
};

export default FeedbackForm;
