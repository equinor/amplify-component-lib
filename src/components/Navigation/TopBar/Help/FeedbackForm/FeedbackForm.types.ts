import { FileWithPath } from 'react-dropzone';

export enum UrgencyOption {
  NO_IMPACT = 'I am not impacted',
  IMPEDES = 'It impedes my progress',
  UNABLE = 'I am unable to work',
}

export enum FeedbackEnum {
  BUG = 'bug',
  SUGGESTION = 'suggestion',
}

export type FeedbackContentType = {
  title: string;
  description: string;
  urgency?: string;
  url?: string;
  attachments?: FileWithPath[];
};

export enum StatusEnum {
  ERROR = 'error',
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  PARTIAL = 'partial',
}

export type RequestStatusType = {
  status: StatusEnum;
  errorText?: string;
};

export type AttachmentStatus = RequestStatusType & {
  fileName: string;
};
