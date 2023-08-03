import { FC, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { useMutation } from '@tanstack/react-query';

import {
  PortalService,
  ServiceNowIncidentRequestDto,
} from '../../../../../api';
import { useAuth } from '../../../../../providers/AuthProvider/AuthProvider';
import { createSlackMessage } from '../Feedback.utils';
import FeedbackFormInner, { SeverityOption } from './FeedbackFormInner';
import SelectType from './SelectType';

export enum FeedbackEnum {
  ERROR = 'error',
  INQUIRY = 'inquiry',
}

export type FeedbackContentType = {
  title: string;
  description: string;
  severity?: string;
  url?: string;
  consent?: boolean;
  attachments?: FileWithPath[];
};

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ onClose }) => {
  const { account } = useAuth();
  const userEmail = account?.username;

  const [selectedType, setSelectedType] = useState<FeedbackEnum | undefined>(
    undefined
  );
  const [feedbackContent, setFeedbackContent] = useState<FeedbackContentType>({
    title: '',
    description: '',
    consent: false,
  });

  const { mutateAsync: slackFileUpload } = useMutation(
    ['slackFileUpload', feedbackContent],
    (formData: FormData) => PortalService.fileUpload(formData)
  );

  const { mutateAsync: serviceNowIncident } = useMutation(
    ['serviceNowIncident', feedbackContent],
    async (serviceNowDto: ServiceNowIncidentRequestDto) =>
      PortalService.createIncident(serviceNowDto)
  );

  const updateFeedback = (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => {
    setFeedbackContent({ ...feedbackContent, [key]: newValue });
  };

  const handleSave = async () => {
    if (selectedType === FeedbackEnum.ERROR && userEmail) {
      const serviceNowObject: ServiceNowIncidentRequestDto = {
        configurationItem: '117499', // TODO: use individual IDs for all apps with this as a fallback for "Amplify Applications"
        title: feedbackContent.title,
        description: feedbackContent.description,
        callerEmail: userEmail,
      };
      await serviceNowIncident(serviceNowObject);
    }

    const formData = new FormData();
    if (feedbackContent.attachments && feedbackContent.attachments[0]) {
      formData.append('file', feedbackContent.attachments[0]);
    }
    formData.append(
      'comment',
      createSlackMessage(feedbackContent, selectedType, userEmail)
    );
    await slackFileUpload(formData);
    onClose();
  };

  if (!selectedType) return <SelectType setSelectedType={setSelectedType} />;
  return (
    <FeedbackFormInner
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      feedbackContent={feedbackContent}
      updateFeedback={updateFeedback}
      handleSave={handleSave}
    />
  );
};

export default FeedbackForm;
