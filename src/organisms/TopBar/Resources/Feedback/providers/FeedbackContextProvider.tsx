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

import { ApiError } from '@equinor/subsurface-app-management';

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
  createServiceNowUrl,
  createSlackMessage,
  getUrgencyNumber,
} from '../Feedback.utils';
import { useServiceNowIncident } from '../hooks/useServiceNowIncident';
import { useSlackFileUpload } from '../hooks/useSlackFileUpload';
import { useSlackPostMessage } from '../hooks/useSlackPostMessage';
import { useAuth, useLocalStorage } from 'src/atoms/hooks';
import { environment } from 'src/atoms/utils';
import { useTopBarInternalContext } from 'src/organisms/TopBar/TopBarInternalContextProvider';

const { getServiceNowConfigurationItem } = environment;

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
  requestHasError: boolean;
  showAllSlackRequests: boolean;
  allSlackRequestStatus: StatusEnum;
  serviceNowUrl: string;
  relevantRequestsHaveBeenSuccess: boolean;
}

export const FeedbackContext = createContext<FeedbackContext | undefined>(
  undefined
);

interface FeedbackContextProviderProps {
  selectedType: FeedbackType;
  onClose: () => void;
  children: ReactNode;
}

export const FeedbackContextProvider: FC<FeedbackContextProviderProps> = ({
  children,
  selectedType,
  onClose,
}) => {
  const { selectedField } = useTopBarInternalContext();
  const configurationItem =
    getServiceNowConfigurationItem(
      import.meta.env.VITE_SERVICE_NOW_CONFIGURATION_ITEM
    ) || '117499';
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

  const [serviceNowUrl, setServiceNowUrl] = useState('');
  const [relevantRequestsHaveBeenSuccess, setRelevantRequestsHaveBeenSuccess] =
    useState(false);

  const requestIsLoading = useMemo(() => {
    return (
      postMessageStatus === 'pending' ||
      serviceNowStatus === 'pending' ||
      isFileUploadLoading
    );
  }, [isFileUploadLoading, postMessageStatus, serviceNowStatus]);

  const serviceNowSuccess = useMemo(
    () => serviceNowRequestResponse.status === StatusEnum.success,
    [serviceNowRequestResponse.status]
  );

  const allSlackRequestStatus = useMemo<StatusEnum>(() => {
    const allStatuses: StatusEnum[] = [
      slackRequestResponse.status,
      ...slackAttachmentsRequestResponse.map((attachment) => attachment.status),
    ];
    if (allStatuses.every((status) => status === StatusEnum.success)) {
      return StatusEnum.success;
    }
    if (allStatuses.includes(StatusEnum.error)) {
      return StatusEnum.partial;
    }
    return StatusEnum.idle;
  }, [slackAttachmentsRequestResponse, slackRequestResponse.status]);

  const showAllSlackRequests = useMemo(() => {
    return (
      allSlackRequestStatus === StatusEnum.error ||
      allSlackRequestStatus === StatusEnum.partial
    );
  }, [allSlackRequestStatus]);

  const requestHasError = useMemo(() => {
    return (
      showAllSlackRequests ||
      serviceNowRequestResponse.status === StatusEnum.error
    );
  }, [serviceNowRequestResponse.status, showAllSlackRequests]);

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
        // Ignoring this since there is no good way to get an error without an error message
        itemToUpdate.errorText =
          /* v8 ignore next */
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
    if (relevantRequestsHaveBeenSuccess) {
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
      serviceNowFormData.append('ConfigurationItem', configurationItem);
      serviceNowFormData.append('Title', feedbackContent.title);
      serviceNowFormData.append(
        'Description',
        createServiceNowDescription(feedbackContent, selectedField?.name)
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
          error: error as ApiError,
        });
      }
    }

    // Slack message request
    const contentFormData = new FormData();
    contentFormData.append(
      'comment',
      createSlackMessage(
        feedbackContent,
        selectedField?.name,
        selectedType,
        userEmail,
        sysId
      )
    );
    try {
      await slackPostMessage(contentFormData);
      updatePostMessageStatus({ status: StatusEnum.success });
    } catch (error) {
      updatePostMessageStatus({
        status: StatusEnum.error,
        error: error as ApiError,
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
            error: error as ApiError,
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
      if (
        serviceNowRequestResponse.status === StatusEnum.success &&
        allSlackRequestStatus === StatusEnum.success
      ) {
        setTimeout(() => {
          // Wait with resetting until "Thank you" text is shown.
          setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
        }, 1100);
      }
    };
  }, [
    allSlackRequestStatus,
    serviceNowRequestResponse.status,
    setFeedbackLocalStorage,
  ]);

  useEffect(() => {
    if (slackAttachmentsRequestResponse.length !== feedbackAttachments.length) {
      setSlackAttachmentRequestResponse(
        feedbackAttachments.map((attachment) => {
          return { status: StatusEnum.idle, fileName: attachment.name };
        })
      );
    }
  }, [feedbackAttachments, slackAttachmentsRequestResponse.length]);

  useEffect(() => {
    if (
      serviceNowRequestResponse.serviceNowId &&
      serviceNowRequestResponse.serviceNowId.length !== 0
    ) {
      setServiceNowUrl(
        createServiceNowUrl(serviceNowRequestResponse.serviceNowId, true)
      );
    }
  }, [serviceNowRequestResponse.serviceNowId]);

  useEffect(() => {
    if (
      selectedType === FeedbackType.SUGGESTION &&
      allSlackRequestStatus === StatusEnum.success
    ) {
      setRelevantRequestsHaveBeenSuccess(true);
    } else if (
      serviceNowRequestResponse.status === StatusEnum.success &&
      allSlackRequestStatus === StatusEnum.success
    ) {
      setRelevantRequestsHaveBeenSuccess(true);
    }
  }, [allSlackRequestStatus, selectedType, serviceNowRequestResponse.status]);

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
        requestHasError,
        showAllSlackRequests,
        allSlackRequestStatus,
        serviceNowUrl,
        relevantRequestsHaveBeenSuccess: relevantRequestsHaveBeenSuccess,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
