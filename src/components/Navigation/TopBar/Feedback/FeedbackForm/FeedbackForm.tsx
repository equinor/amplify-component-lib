import { FC, useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { useMutation, useQuery } from '@tanstack/react-query';

import { environment } from '../../../../../utils';
import { createSlackMessage } from '../Feedback.utils';
import FeedbackDetails, { SeverityOption } from './FeedbackDetails';
import SelectType from './SelectType';

const { getSlackWebhookUrl } = environment;

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

  const { mutate: slackMutate } = useMutation(
    ['sendToSlack'],
    async () =>
      await fetch(getSlackWebhookUrl(import.meta.env.VITE_SLACK_WEBHOOK_URL), {
        method: 'POST',
        body: JSON.stringify(createSlackMessage(feedbackContent, selectedType)),
      }),
    {
      onSuccess: () => {
        console.log('success');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data } = useQuery(['getAllChannels'], async () => {
    await fetch('https://slack.com/api/conversations.list', {
      method: 'POST',
      body: `token=xoxb-2632000640-4926453775744-xmxCWvfuKqXJ61RqRAusc7J1`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const updateFeedback = (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[]
  ) => {
    setFeedbackContent({ ...feedbackContent, [key]: newValue });
  };

  const handleSave = () => {
    slackMutate();
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
