import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FileWithPath } from 'react-dropzone';

import { ServiceNowIncidentResponse } from '../../../../../../api';
import { useLocalStorage } from '../../../../../../hooks';
import { useAuth } from '../../../../../../providers/AuthProvider/AuthProvider';
import { DEFAULT_FEEDBACK_LOCAL_STORAGE } from '../Feedback.const';
import {
  AttachmentStatus,
  FeedbackContentType,
  FeedbackLocalStorage,
  FeedbackType,
  RequestStatusType,
  StatusEnum,
  UrgencyOption,
} from '../Feedback.types';
import {
  createServiceNowDescription,
  createSlackMessage,
  getUrgencyNumber,
} from '../Feedback.utils';
import { useServiceNowIncident } from '../hooks/useServiceNowIncident';
import { useSlackFileUpload } from '../hooks/useSlackFileUpload';
import { useSlackPostMessage } from '../hooks/useSlackPostMessage';

interface FeedbackContext {
  feedbackContent: FeedbackContentType;
  serviceNowRequestResponse: RequestStatusType;
  slackRequestResponse: RequestStatusType;
  slackAttachmentsRequestResponse: AttachmentStatus[];
  feedbackAttachments: FileWithPath[];
  showResponsePage: boolean;
  toggleShowResponsePage: () => void;
  handleSave: () => void;
  updateFeedback: (
    key: keyof FeedbackContentType | 'attachments',
    newValue: string | UrgencyOption | FileWithPath[] | boolean
  ) => void;
  handleResponsePageOnClose: () => void;
  selectedType: FeedbackType;
  onDialogClose: () => void;
  resetForm: () => void;
  requestIsLoading: boolean;
}

export const FeedbackContext = createContext<FeedbackContext | undefined>(
  undefined
);

interface FeedbackContextProviderProps {
  selectedType: FeedbackType;
  onClose: () => void;
  children: ReactNode;
}

const AdminWellboresContextProvider: FC<FeedbackContextProviderProps> = ({
  children,
  selectedType,
  onClose,
}) => {
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

  const [slackRequestResponse, setSlackRequestResponse] =
    useState<RequestStatusType>({ status: StatusEnum.idle });
  const [slackAttachmentsRequestResponse, setSlackAttachmentRequestResponse] =
    useState<AttachmentStatus[]>([]);

  const [showResponsePage, setShowResponsePage] = useState(false);

  const { mutateAsync: slackFileUpload, isPending: isFileUploadLoading } =
    useSlackFileUpload(feedbackContent);

  const {
    mutateAsync: slackPostMessage,
    status: postMessageStatus,
    error: postMessageError,
  } = useSlackPostMessage(feedbackContent);

  const {
    mutateAsync: serviceNowIncident,
    status: serviceNowStatus,
    error: serviceNowError,
  } = useServiceNowIncident(feedbackContent);

  const requestIsLoading = useMemo(() => {
    return (
      postMessageStatus === 'pending' ||
      serviceNowStatus === 'pending' ||
      isFileUploadLoading
    );
  }, [isFileUploadLoading, postMessageStatus, serviceNowStatus]);

  const allRequestsSuccess = useMemo(() => {
    const allStatuses = [
      slackRequestResponse.status,
      ...slackAttachmentsRequestResponse.map((response) => response.status),
    ];
    if (selectedType === FeedbackType.BUG) {
      allStatuses.push(feedbackLocalStorage.serviceNowRequestResponse.status);
    }
    return allStatuses.every((status) => status === StatusEnum.success);
  }, [
    feedbackLocalStorage.serviceNowRequestResponse.status,
    selectedType,
    slackAttachmentsRequestResponse,
    slackRequestResponse.status,
  ]);

  const toggleShowResponsePage = () => {
    setShowResponsePage((prev) => !prev);
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
    const index = slackAttachmentsRequestResponse.findIndex(
      (attachment) => attachment.fileName === filename
    );
    if (index === -1) return;
    setSlackAttachmentRequestResponse((prev) => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], status: status },
        ...prev.slice(index + 1, prev.length),
      ];
    });
  };

  const updatePostMessageStatus = (status: StatusEnum) => {
    setSlackRequestResponse({
      status: status,
      errorText: postMessageError?.message ?? undefined,
    });
  };

  const handleResponsePageOnClose = () => {
    if (allRequestsSuccess) {
      onClose();
    } else {
      toggleShowResponsePage();
    }
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

  const handleSave = async () => {
    // Service now request
    toggleShowResponsePage();
    if (selectedType === FeedbackType.BUG && userEmail) {
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

  const resetForm = useCallback(() => {
    console.log('in reset form');
    setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
    setFeedbackAttachments([]);
    setSlackRequestResponse({ status: StatusEnum.idle });
    setSlackAttachmentRequestResponse([]);
  }, [setFeedbackLocalStorage]);

  useEffect(() => {
    return () => {
      console.log('in cleaning useEffect - before if');
      if (allRequestsSuccess) {
        console.log('in cleaning useEffect - in if');
        setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
      }
    };
  }, [allRequestsSuccess, setFeedbackLocalStorage]);

  useEffect(() => {
    if (slackAttachmentsRequestResponse.length !== feedbackAttachments.length) {
      setSlackAttachmentRequestResponse(
        feedbackAttachments.map((attachment) => {
          return { status: StatusEnum.idle, fileName: attachment.name };
        })
      );
    }
  }, [feedbackAttachments, slackAttachmentsRequestResponse.length]);

  return (
    <FeedbackContext.Provider
      value={{
        selectedType,
        showResponsePage,
        feedbackAttachments,
        slackAttachmentsRequestResponse,
        slackRequestResponse,
        updateFeedback,
        feedbackContent: feedbackLocalStorage.feedbackContent,
        serviceNowRequestResponse:
          feedbackLocalStorage.serviceNowRequestResponse,
        handleResponsePageOnClose,
        toggleShowResponsePage,
        onDialogClose: onClose,
        handleSave,
        resetForm,
        requestIsLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default AdminWellboresContextProvider;
