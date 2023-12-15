import { FeedbackLocalStorage, StatusEnum } from './Feedback.types';

export const MAX_FILE_SIZE_BYTES = 1048575;

export const SERVICE_NOW_QUERY_KEY = 'serviceNowIncident';
export const SLACK_POST_QUERY_KEY = 'slackPostMessage';
export const SLACK_FILE_QUERY_KEY = 'slackFileUpload';

export const EQUINOR_EMAIL_SUFFIX = '.equinor.com';

export const DEFAULT_REQUEST_ERROR_MESSAGE =
  'There was an error with the request';

export const ONE_HOUR_IN_MS: number = 1000 * 60 * 60;

export const DEFAULT_FEEDBACK_LOCAL_STORAGE: FeedbackLocalStorage = {
  feedbackContent: {
    title: '',
    description: '',
    url: '',
    urgency: '',
  },
  serviceNowRequestResponse: {
    status: StatusEnum.idle,
  },
};
