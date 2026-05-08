import { FileWithPath } from 'react-dropzone';

import {
  ApiError,
  BugSeverity,
  ServiceNowIncidentResponse,
} from '@equinor/subsurface-app-management';

export enum StatusEnum {
  error = 'error',
  idle = 'idle',
  pending = 'pending',
  success = 'success',
}

export interface FeedbackContentLocalStorage {
  title: string;
  description: string;
  urgency?: BugSeverity;
  url?: string;
}

export type FeedbackContentType = FeedbackContentLocalStorage & {
  attachments?: FileWithPath[];
};

export interface RequestStatusType {
  status: StatusEnum;
  serviceNowId?: string;
  errorText?: string;
}

export interface FeedbackLocalStorage {
  feedbackContent: FeedbackContentLocalStorage;
  serviceNowRequestResponse: RequestStatusType;
}

export type UpdateRequestStatusHandler = ({
  status,
  response,
  error,
  filename,
}: {
  status: StatusEnum;
  response?: ServiceNowIncidentResponse;
  error?: ApiError;
  filename?: string;
}) => void;

export enum Browsers {
  EDGE = 'Edge',
  EDGE_SHORT = 'Edg',
  FIREFOX = 'Firefox',
  CHROME = 'Chrome',
  SAFARI = 'Safari',
}
