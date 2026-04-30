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

import {
  ApiError,
  BugSeverity,
  WorkItemType,
} from '@equinor/subsurface-app-management';

import {
  DEFAULT_FEEDBACK_LOCAL_STORAGE,
  ONE_HOUR_IN_MS,
} from '../Feedback.const';
import {
  FeedbackContentType,
  FeedbackLocalStorage,
  RequestStatusType,
  StatusEnum,
  UpdateRequestStatusHandler,
  UrgencyOption,
} from '../Feedback.types';
import {
  createServiceNowDescription,
  createServiceNowUrl,
  createSlackMessage,
  getBrowserInfo,
  getUrgencyNumber,
} from '../Feedback.utils';
import { useServiceNowIncident } from '../hooks/useServiceNowIncident';
import { environment } from 'src/atoms';
import { useAuth, useLocalStorage } from 'src/atoms/hooks';
import { useCreateWorkItemWithAttachment } from 'src/organisms/TopBar/Resources/Feedback/hooks/useCreateWorkItemWithAttachment';
import { useTopBarInternalContext } from 'src/organisms/TopBar/TopBarInternalContextProvider';

const { getServiceNowConfigurationItem, getAppName } = environment;

export interface FeedbackContext {
  feedbackContent: FeedbackContentType;
  serviceNowRequestResponse: RequestStatusType;
  workItemRequestResponse: RequestStatusType;
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
  selectedType: WorkItemType;
  onDialogClose: () => void;
  resetForm: () => void;
  requestIsLoading: boolean;
  serviceNowSuccess: boolean;
  workItemSuccess: boolean;
  requestHasError: boolean;
  serviceNowUrl: string;
  relevantRequestsHaveBeenSuccess: boolean;
}

export const FeedbackContext = createContext<FeedbackContext | undefined>(
  undefined
);

interface FeedbackContextProviderProps {
  selectedType: WorkItemType;
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

  const [workItemRequestResponse, setWorkItemRequestResponse] =
    useState<RequestStatusType>({ status: StatusEnum.idle });

  const [showResponsePage, setShowResponsePage] = useState(false);

  const [isWrongDomain, setIsWrongDomain] = useState(false);

  const {
    mutateAsync: createWorkItemWithAttachment,
    status: postMessageStatus,
  } = useCreateWorkItemWithAttachment(feedbackContent);

  const { mutateAsync: serviceNowIncident, status: serviceNowStatus } =
    useServiceNowIncident(feedbackContent);

  const [serviceNowUrl, setServiceNowUrl] = useState('');
  const [relevantRequestsHaveBeenSuccess, setRelevantRequestsHaveBeenSuccess] =
    useState(false);

  const requestIsLoading = useMemo(() => {
    return postMessageStatus === 'pending' || serviceNowStatus === 'pending';
  }, [postMessageStatus, serviceNowStatus]);

  const serviceNowSuccess = useMemo(
    () => serviceNowRequestResponse.status === StatusEnum.success,
    [serviceNowRequestResponse.status]
  );

  const workItemSuccess = useMemo(
    () => workItemRequestResponse.status === StatusEnum.success,
    [workItemRequestResponse.status]
  );

  const requestHasError = useMemo(() => {
    return (
      workItemRequestResponse.status === StatusEnum.error ||
      serviceNowRequestResponse.status === StatusEnum.error
    );
  }, [serviceNowRequestResponse.status, workItemRequestResponse.status]);

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

  const updatePostMessageStatus: UpdateRequestStatusHandler = ({
    status,
    error,
  }) => {
    setWorkItemRequestResponse({
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
      selectedType === WorkItemType.BUG &&
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
          getUrgencyNumber(feedbackContent.urgency as BugSeverity).toString()
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

    // Slack message / WorkItem request

    try {
      await createWorkItemWithAttachment({
        slackMessage: createSlackMessage(
          feedbackContent,
          selectedField?.name,
          selectedType,
          userEmail,
          sysId
        ),
        attachmentMessage: feedbackContent.title,
        formData: {
          fileList: feedbackAttachments ?? [],
          Title: feedbackContent.title,
          Description: feedbackContent.description,
          ApplicationName: getAppName(import.meta.env.VITE_NAME),
          Browser: getBrowserInfo(),
          Field: selectedField?.name ?? 'Not found',
          IssueUrl: sysId ? createServiceNowUrl(sysId, false) : undefined,
          Severity: feedbackContent.urgency,
          WorkItemType: selectedType,
        },
      });
      updatePostMessageStatus({ status: StatusEnum.success });
    } catch (error) {
      updatePostMessageStatus({
        status: StatusEnum.error,
        error: error as ApiError,
      });
    }

    // // Slack attachments requests
    // if (feedbackAttachments && feedbackAttachments.length > 0) {
    //   for (const attachment of feedbackAttachments) {
    //     const fileFormData = new FormData();
    //     fileFormData.append('comment', `Title: ${feedbackContent.title}`);
    //     fileFormData.append('file', attachment);
    //     try {
    //       await slackFileUpload(fileFormData);
    //       updateSlackAttachmentStatus({
    //         status: Statusenum.success,
    //         filename: attachment.name,
    //       });
    //     } catch (error) {
    //       updateSlackAttachmentStatus({
    //         status: StatusEnum.error,
    //         filename: attachment.name,
    //         error: error as ApiError,
    //       });
    //     }
    //   }
    // }
  };

  const resetForm = useCallback(() => {
    setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
    setFeedbackAttachments([]);
    setWorkItemRequestResponse({ status: StatusEnum.idle });
  }, [setFeedbackLocalStorage]);

  useEffect(() => {
    return () => {
      if (
        serviceNowRequestResponse.status === StatusEnum.success &&
        workItemRequestResponse.status === StatusEnum.success
      ) {
        setTimeout(() => {
          // Wait with resetting until "Thank you" text is shown.
          setFeedbackLocalStorage(DEFAULT_FEEDBACK_LOCAL_STORAGE);
        }, 1100);
      }
    };
  }, [
    workItemRequestResponse,
    serviceNowRequestResponse.status,
    setFeedbackLocalStorage,
  ]);

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
    if (selectedType === WorkItemType.SUGGESTION && workItemSuccess) {
      setRelevantRequestsHaveBeenSuccess(true);
    } else if (serviceNowSuccess && workItemSuccess) {
      setRelevantRequestsHaveBeenSuccess(true);
    }
  }, [
    selectedType,
    serviceNowRequestResponse.status,
    serviceNowSuccess,
    workItemSuccess,
  ]);

  return (
    <FeedbackContext.Provider
      value={{
        selectedType,
        showResponsePage,
        feedbackAttachments,
        workItemRequestResponse,
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
        workItemSuccess,
        serviceNowUrl,
        relevantRequestsHaveBeenSuccess,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
