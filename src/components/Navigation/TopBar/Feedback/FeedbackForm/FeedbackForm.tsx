import { FC, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { useMsal } from '@azure/msal-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuth } from '../../../../../providers/AuthProvider/AuthProvider';
import { auth, environment } from '../../../../../utils';
import { createSlackMessage } from '../Feedback.utils';
import FeedbackDetails, { SeverityOption } from './FeedbackDetails';
import SelectType from './SelectType';

const { getEnvironmentName, getApiUrl, getApiScope } = environment;
const { GRAPH_REQUESTS_BACKEND, acquireToken } = auth;

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
  const { instance } = useMsal();
  const { account } = useAuth();
  const userEmail = `${account?.username}@equinor.com`;
  const environment = getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME);
  const apiUrl = getApiUrl(import.meta.env.VITE_API_URL);

  const [selectedType, setSelectedType] = useState<FeedbackEnum | undefined>(
    undefined
  );
  const [feedbackContent, setFeedbackContent] = useState<FeedbackContentType>({
    title: '',
    description: '',
  });

  const { data: portalToken } = useQuery<string>(
    ['getPortalProdToken'],
    async () => {
      const authResult = await acquireToken(
        instance,
        GRAPH_REQUESTS_BACKEND(getApiScope(import.meta.env.VITE_API_SCOPE))
      );
      return await fetch(`${apiUrl}/api/v1/Token/AmplifyPortal}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authResult.accessToken,
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  );

  const { mutate: slackFileUpload } = useMutation(
    ['slackFileUpload', feedbackContent],
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
        `https://api-amplify-portal-${environment}.radix.equinor.com/api/v1/Slack/fileUpload`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + portalToken,
          },
          body: formData,
        }
      );
    }
  );

  const { mutate: serviceNowIncident } = useMutation(
    ['serviceNowIncident', feedbackContent],
    async () => {
      await fetch(
        `https://api-amplify-portal-${environment}.radix.equinor.com/api/v1/ServiceNow/incident`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + portalToken,
          },
          body: JSON.stringify({
            configurationItem: '117499', // TODO: use individual IDs for all apps with this as a fallback for "Amplify Applications"
            title: feedbackContent.title,
            description: feedbackContent.description,
            callerEmail: userEmail,
          }),
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
    if (selectedType === FeedbackEnum.ERROR) {
      serviceNowIncident();
    }
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
