import { FC, useState } from 'react';

import { tokens } from '@equinor/eds-tokens';

import FeedbackDetails, { SeverityOption } from './FeedbackDetails';
import SelectType from './SelectType';

import styled from 'styled-components';

const { spacings } = tokens;

export enum FeedbackType {
  ERROR = 'error',
  INQUIRY = 'inquiry',
}

export type FeedbackContentType = {
  title?: string;
  description?: string;
  severity?: SeverityOption;
  url?: string;
  attachments?: string;
};

interface FeedbackFormProps {
  test?: string;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ test }) => {
  const [selectedType, setSelectedType] = useState<FeedbackType | undefined>(
    undefined
  );
  const [feedbackContent, setFeedbackContent] = useState<FeedbackContentType>(
    {}
  );

  const updateFeedback = (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption
  ) => {
    setFeedbackContent({ ...feedbackContent, [key]: newValue });
  };

  if (selectedType) {
    return (
      <FeedbackDetails
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
      />
    );
  }
  return <SelectType setSelectedType={setSelectedType} />;
};

export default FeedbackForm;
