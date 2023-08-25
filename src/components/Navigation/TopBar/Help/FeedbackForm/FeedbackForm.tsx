import { FC, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { useMutation } from '@tanstack/react-query';

import { createSlackMessage } from './FeedbackForm.utils';
import FeedbackFormInner, { SeverityOption } from './FeedbackFormInner';
import { ServiceNowIncidentRequestDto } from 'src/api';
import { PortalService } from 'src/api/services/PortalService';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

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
  selectedType?: FeedbackEnum;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ onClose, selectedType }) => {
  const { account } = useAuth();
  const userEmail = account?.username;

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

  if (!selectedType) return null;

  return (
    <FeedbackFormInner
      selectedType={selectedType}
      feedbackContent={feedbackContent}
      updateFeedback={updateFeedback}
      handleSave={handleSave}
      onClose={onClose}
    />
  );
};

export default FeedbackForm;
