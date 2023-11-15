import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { ServiceNowIncidentResponse } from '../../../../../api';
import { useLocalStorage } from '../../../../../hooks';
import { useAuth } from '../../../../../providers/AuthProvider/AuthProvider';
import ResponsePage from './components/ResponsePage/ResponsePage';
import {
  DEFAULT_FEEDBACK_LOCAL_STORAGE,
  DEFAULT_SLACK_STATUS,
} from './FeedbackForm.const';
import {
  useServiceNowIncidentMutation,
  useSlackFileUploadMutation,
  useSlackPostMessageMutation,
} from './FeedbackForm.hooks';
import { Container } from './FeedbackForm.styles';
import {
  FeedbackContentType,
  FeedbackEnum,
  FeedbackLocalStorage,
  SlackStatus,
  StatusEnum,
  UrgencyOption,
} from './FeedbackForm.types';
import {
  createServiceNowDescription,
  createSlackMessage,
  getUrgencyNumber,
} from './FeedbackForm.utils';
import FeedbackFormInner from './FeedbackFormInner';

interface FeedbackFormProps {
  onClose: () => void;
  selectedType: FeedbackEnum;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ onClose, selectedType }) => {
  const { account } = useAuth();
  const userEmail = account?.username;

  const [feedbackLocalStorage, setFeedbackLocalStorage] =
    useLocalStorage<FeedbackLocalStorage>(
      selectedType + '-feedbackContentAndRequestStatus',
      { ...DEFAULT_FEEDBACK_LOCAL_STORAGE },
      3600000 // One hour
    );

  const { feedbackContent } = feedbackLocalStorage;

  const [feedbackAttachments, setFeedbackAttachments] = useState<
    FileWithPath[]
  >([]);

  const [slackStatus, setSlackStatus] =
    useState<SlackStatus>(DEFAULT_SLACK_STATUS);

  const [showResponsePage, setShowResponsePage] = useState(false);

  const { mutateAsync: slackFileUpload, isPending: isFileUploadLoading } =
    useSlackFileUploadMutation(feedbackContent);

  const {
    mutateAsync: slackPostMessage,
    status: postMessageStatus,
    error: postMessageError,
  } = useSlackPostMessageMutation(feedbackContent);

  const {
    mutateAsync: serviceNowIncident,
    status: serviceNowStatus,
    error: serviceNowError,
  } = useServiceNowIncidentMutation(feedbackContent);

  const toggleShowResponsePage = () => {
    setShowResponsePage((prev) => !prev);
  };

  const updateFeedback = (
    key: keyof FeedbackContentType | 'attachments',
    newValue: string | UrgencyOption | FileWithPath[] | boolean
  ) => {
    if (key === 'attachments') {
      setFeedbackAttachments([
        ...feedbackAttachments,
        ...(newValue as FileWithPath[]),
      ]);
    } else {
      setFeedbackLocalStorage({
        ...feedbackLocalStorage,
        feedbackContent: { ...feedbackContent, [key]: newValue },
      });
    }
  };

  const updateServiceNowStatus = (
    status: StatusEnum,
    response?: ServiceNowIncidentResponse
  ) => {
    console.log('in updSNS', response);
    setFeedbackLocalStorage({
      ...feedbackLocalStorage,
      serviceNowRequestResponse: {
        status: status,
        errorText: serviceNowError?.message ?? undefined,
        serviceNowId: response?.sysId ?? undefined,
      },
    });
  };

  const updateSlackAttachmentStatus = (
    status: StatusEnum,
    filename: string
  ) => {
    const index = slackStatus.slackAttachmentsResponse.findIndex(
      (attachment) => attachment.fileName === filename
    );
    if (index === -1) return;
    setSlackStatus({
      ...slackStatus,
      slackAttachmentsResponse: [
        ...slackStatus.slackAttachmentsResponse.slice(0, index),
        { ...slackStatus.slackAttachmentsResponse[index], status: status },
        ...slackStatus.slackAttachmentsResponse.slice(
          index + 1,
          slackStatus.slackAttachmentsResponse.length
        ),
      ],
    });
  };

  const updatePostMessageStatus = (status: StatusEnum) => {
    setSlackStatus({
      ...slackStatus,
      slackRequestResponse: {
        status: status,
        errorText: postMessageError?.message ?? undefined,
      },
    });
  };

  const handleSave = async () => {
    // Service now request
    toggleShowResponsePage();
    if (selectedType === FeedbackEnum.BUG && userEmail) {
      const serviceNowFormData = new FormData();
      serviceNowFormData.append('ConfigurationItem', '117499');
      serviceNowFormData.append('Title', feedbackContent.title);
      serviceNowFormData.append(
        'Description',
        createServiceNowDescription(feedbackContent)
      );
      serviceNowFormData.append('CallerEmail', userEmail);
      if (feedbackContent.urgency) {
        serviceNowFormData.append(
          'urgency',
          getUrgencyNumber(feedbackContent.urgency as UrgencyOption).toString()
        );
      }
      if (feedbackAttachments && feedbackAttachments.length > 0) {
        feedbackAttachments.forEach((attachment) =>
          serviceNowFormData.append('Images', attachment)
        );
      }
      try {
        console.log('in serviceNow try');
        const response = await serviceNowIncident(serviceNowFormData);
        updateServiceNowStatus(StatusEnum.success, response);
      } catch (e) {
        updateServiceNowStatus(StatusEnum.error);
      }
    }

    // Slack message request

    const contentFormData = new FormData();
    contentFormData.append(
      'comment',
      createSlackMessage(feedbackContent, selectedType, userEmail)
    );
    try {
      console.log('in postMessage try');
      await slackPostMessage(contentFormData);
      updatePostMessageStatus(StatusEnum.success);
    } catch (e) {
      updatePostMessageStatus(StatusEnum.error);
    }

    // Slack attachments requests
    if (feedbackAttachments && feedbackAttachments.length > 0) {
      for (const attachment of feedbackAttachments) {
        const fileFormData = new FormData();
        fileFormData.append('comment', `Title: ${feedbackContent.title}`);
        fileFormData.append('file', attachment);
        try {
          console.log('in fileUpload try');
          await slackFileUpload(fileFormData);
          updateSlackAttachmentStatus(StatusEnum.success, attachment.name);
        } catch (e) {
          updateSlackAttachmentStatus(StatusEnum.error, attachment.name);
        }
      }
    }
  };

  const requestIsLoading = useMemo(() => {
    return (
      postMessageStatus === 'pending' ||
      serviceNowStatus === 'pending' ||
      isFileUploadLoading
    );
  }, [isFileUploadLoading, postMessageStatus, serviceNowStatus]);

  const allRequestsSuccess = useMemo(() => {
    const allStatuses = [
      slackStatus.slackRequestResponse.status,
      ...slackStatus.slackAttachmentsResponse.map(
        (response) => response.status
      ),
    ];
    if (selectedType === FeedbackEnum.BUG) {
      allStatuses.push(feedbackLocalStorage.serviceNowRequestResponse.status);
    }
    return allStatuses.every((status) => status === StatusEnum.success);
  }, [
    feedbackLocalStorage.serviceNowRequestResponse.status,
    selectedType,
    slackStatus,
  ]);

  const resetForm = useCallback(() => {
    console.log('in reset form');
    setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
    setFeedbackAttachments([]);
    setSlackStatus(DEFAULT_SLACK_STATUS);
  }, [setFeedbackLocalStorage]);

  useEffect(() => {
    return () => {
      if (allRequestsSuccess) {
        resetForm();
      }
    };
  }, [allRequestsSuccess, resetForm]);

  useEffect(() => {
    if (
      slackStatus.slackAttachmentsResponse.length !== feedbackAttachments.length
    ) {
      setSlackStatus((prev) => {
        return {
          ...prev,
          slackAttachmentsResponse: feedbackAttachments.map((attachment) => {
            return { status: StatusEnum.idle, fileName: attachment.name };
          }),
        };
      });
    }
  }, [feedbackAttachments, slackStatus.slackAttachmentsResponse.length]);

  const handleResponsePageOnClose = () => {
    if (allRequestsSuccess) {
      onClose();
    } else {
      toggleShowResponsePage();
    }
  };

  if (showResponsePage)
    return (
      <Container>
        <ResponsePage
          feedbackType={selectedType}
          feedbackLocalStorage={{
            ...feedbackLocalStorage,
            ...slackStatus,
          }}
          onClose={handleResponsePageOnClose}
        />
      </Container>
    );
  console.log('feedbackLS', feedbackLocalStorage);
  return (
    <Container>
      <FeedbackFormInner
        selectedType={selectedType}
        feedbackContent={{
          ...feedbackContent,
          attachments: feedbackAttachments,
        }}
        serviceNowSuccess={serviceNowStatus === StatusEnum.success}
        resetForm={resetForm}
        updateFeedback={updateFeedback}
        handleSave={handleSave}
        onClose={onClose}
        requestIsLoading={requestIsLoading}
      />
    </Container>
  );
};

export default FeedbackForm;
