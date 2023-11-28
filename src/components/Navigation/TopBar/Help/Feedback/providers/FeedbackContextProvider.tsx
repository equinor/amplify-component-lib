import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FileWithPath } from 'react-dropzone';

import { ApiError } from '../../../../../../api';
import { useLocalStorage } from '../../../../../../hooks';
import { useAuth } from '../../../../../../providers/AuthProvider/AuthProvider';
import {
  DEFAULT_FEEDBACK_LOCAL_STORAGE,
  ONE_HOUR_IN_MS,
} from '../Feedback.const';
import {
  AttachmentStatus,
  FeedbackContentType,
  FeedbackLocalStorage,
  FeedbackType,
  RequestStatusType,
  StatusEnum,
  UpdateRequestStatusHandler,
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

export interface FeedbackContext {
  feedbackContent: FeedbackContentType;
  serviceNowRequestResponse: RequestStatusType;
  slackRequestResponse: RequestStatusType;
  slackAttachmentsRequestResponse: AttachmentStatus[];
  feedbackAttachments: FileWithPath[];
  setFeedbackAttachments: Dispatch<SetStateAction<FileWithPath[]>>;
  showResponsePage: boolean;
  toggleShowResponsePage: () => void;
  isWrongDomain: boolean;
  setIsWrongDomain: Dispatch<SetStateAction<boolean>>;
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
  serviceNowSuccess: boolean;
}

export const FeedbackContext = createContext<FeedbackContext | undefined>(
  undefined
);

interface FeedbackContextProviderProps {
  selectedType: FeedbackType;
  onClose: () => void;
  children: ReactNode;
}

const FeedbackContextProvider: FC<FeedbackContextProviderProps> = ({
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
      ONE_HOUR_IN_MS
    );

  const { feedbackContent, serviceNowRequestResponse } = feedbackLocalStorage;

  const [feedbackAttachments, setFeedbackAttachments] = useState<
    FileWithPath[]
  >([]);

  const [slackRequestResponse, setSlackRequestResponse] =
    useState<RequestStatusType>({ status: StatusEnum.idle });
  const [slackAttachmentsRequestResponse, setSlackAttachmentRequestResponse] =
    useState<AttachmentStatus[]>([]);

  const [showResponsePage, setShowResponsePage] = useState(false);

  const [isWrongDomain, setIsWrongDomain] = useState(false);

  const { mutateAsync: slackFileUpload, isPending: isFileUploadLoading } =
    useSlackFileUpload(feedbackContent);

  const { mutateAsync: slackPostMessage, status: postMessageStatus } =
    useSlackPostMessage(feedbackContent);

  const { mutateAsync: serviceNowIncident, status: serviceNowStatus } =
    useServiceNowIncident(feedbackContent);

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

  const serviceNowSuccess = useMemo(
    () => serviceNowRequestResponse.status === StatusEnum.success,
    [serviceNowRequestResponse.status]
  );

  const toggleShowResponsePage = () => {
    setShowResponsePage((prev) => !prev);
  };

  const updateServiceNowStatus: UpdateRequestStatusHandler = ({
    status,
    response,
    error,
  }) => {
    setFeedbackLocalStorage({
      ...feedbackLocalStorage,
      serviceNowRequestResponse: {
        status: status,
        errorText: error?.message ?? undefined,
        serviceNowId: response?.sysId ?? undefined,
      },
    });
  };

  const updateSlackAttachmentStatus: UpdateRequestStatusHandler = ({
    status,
    filename,
    error,
  }) => {
    setSlackAttachmentRequestResponse((prev) => {
      const prevCopy = Array.from(prev);
      const itemToUpdate = prevCopy.find((item) => item.fileName === filename);
      if (itemToUpdate) {
        itemToUpdate.status = status;
        itemToUpdate.errorText =
          status === StatusEnum.error ? error?.message : undefined;
      }
      return prevCopy;
    });
  };

  const updatePostMessageStatus: UpdateRequestStatusHandler = ({
    status,
    error,
  }) => {
    setSlackRequestResponse({
      status: status,
      errorText: error?.message ?? undefined,
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
    key: keyof FeedbackContentType,
    newValue: string | UrgencyOption | FileWithPath[] | boolean
  ) => {
    setFeedbackLocalStorage({
      ...feedbackLocalStorage,
      feedbackContent: { ...feedbackContent, [key]: newValue },
    });
  };

  const handleSave = async () => {
    // Service now request
    toggleShowResponsePage();
    let sysId: string | undefined | null = '';
    if (
      selectedType === FeedbackType.BUG &&
      userEmail &&
      serviceNowRequestResponse.status !== StatusEnum.success
    ) {
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
        const response = await serviceNowIncident(serviceNowFormData);
        sysId = response.sysId;
        updateServiceNowStatus({
          status: StatusEnum.success,
          response: response,
        });
      } catch (error) {
        updateServiceNowStatus({
          status: StatusEnum.error,
          error: error as unknown as ApiError,
        });
      }
    }

    // Slack message request
    const contentFormData = new FormData();
    contentFormData.append(
      'comment',
      createSlackMessage(feedbackContent, selectedType, userEmail, sysId)
    );
    try {
      await slackPostMessage(contentFormData);
      updatePostMessageStatus({ status: StatusEnum.success });
    } catch (error) {
      updatePostMessageStatus({
        status: StatusEnum.error,
        error: error as unknown as ApiError,
      });
    }

    // Slack attachments requests
    if (feedbackAttachments && feedbackAttachments.length > 0) {
      for (const attachment of feedbackAttachments) {
        const fileFormData = new FormData();
        fileFormData.append('comment', `Title: ${feedbackContent.title}`);
        fileFormData.append('file', attachment);
        try {
          await slackFileUpload(fileFormData);
          updateSlackAttachmentStatus({
            status: StatusEnum.success,
            filename: attachment.name,
          });
        } catch (error) {
          updateSlackAttachmentStatus({
            status: StatusEnum.error,
            filename: attachment.name,
            error: error as unknown as ApiError,
          });
        }
      }
    }
  };

  const resetForm = useCallback(() => {
    setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
    setFeedbackAttachments([]);
    setSlackRequestResponse({ status: StatusEnum.idle });
    setSlackAttachmentRequestResponse([]);
  }, [setFeedbackLocalStorage]);

  useEffect(() => {
    return () => {
      if (allRequestsSuccess) {
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
        feedbackContent,
        serviceNowRequestResponse,
        handleResponsePageOnClose,
        toggleShowResponsePage,
        onDialogClose: onClose,
        handleSave,
        resetForm,
        requestIsLoading,
        serviceNowSuccess,
        isWrongDomain,
        setIsWrongDomain,
        setFeedbackAttachments,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContextProvider;
