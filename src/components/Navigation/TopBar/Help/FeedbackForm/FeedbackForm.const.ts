import {
  FeedbackLocalStorage,
  SlackStatus,
  StatusEnum,
} from './FeedbackForm.types';

export const MAX_FILE_SIZE_BYTES = 1048575;

export const SERVICE_NOW_QUERY_KEY = 'serviceNowIncident';
export const SLACK_POST_QUERY_KEY = 'slackPostMessage';
export const SLACK_FILE_QUERY_KEY = 'slackFileUpload';

export const DEFAULT_FEEDBACK_LOCAL_STORAGE: FeedbackLocalStorage = {
  feedbackContent: {
    title: '',
    description: '',
    url: '',
    urgency: '',
  },
  serviceNowRequestResponse: { status: StatusEnum.idle },
};

export const DEFAULT_SLACK_STATUS: SlackStatus = {
  slackRequestResponse: { status: StatusEnum.idle },
  slackAttachmentsResponse: [],
};

// [
//   { status: StatusEnum.error, errorText: 'error', fileName: 'filename' },
//   { status: StatusEnum.idle, fileName: 'filename_two' },
// ]
