import { BugSeverity } from '@equinor/subsurface-app-management';

import { FeedbackLocalStorage, StatusEnum } from './Feedback.types';

export const MAX_FILE_SIZE_BYTES = 1048575;

export const SERVICE_NOW_QUERY_KEY = 'serviceNowIncident';
export const SLACK_POST_QUERY_KEY = 'slackPostMessage';

export const EQUINOR_EMAIL_SUFFIX = '.equinor.com';

export const DEFAULT_REQUEST_ERROR_MESSAGE =
  'There was an error with the request';

export const ONE_HOUR_IN_MS: number = 1000 * 60 * 60;

const BUG_SEVERITY_ORDER: BugSeverity[] = [
  BugSeverity.DOES_NOT_AFFECT_ME,
  BugSeverity.IMPEDES_MY_PROGRESS,
  BugSeverity.UNABLE_TO_WORK,
];

export const SORTED_BUG_SEVERITY_OPTIONS = Object.values(BugSeverity).sort(
  (a, b) => {
    const indexA = BUG_SEVERITY_ORDER.indexOf(a);
    const indexB = BUG_SEVERITY_ORDER.indexOf(b);
    // Items not in the order list are sorted last
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  }
);

export const DEFAULT_FEEDBACK_LOCAL_STORAGE: FeedbackLocalStorage = {
  feedbackContent: {
    title: '',
    description: '',
    url: '',
  },
  serviceNowRequestResponse: {
    status: StatusEnum.idle,
  },
};
