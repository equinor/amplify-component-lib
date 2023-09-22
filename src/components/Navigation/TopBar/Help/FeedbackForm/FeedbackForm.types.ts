import { FileWithPath } from 'react-dropzone';

export enum SeverityOption {
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
  severity?: string;
  url?: string;
  anonymous?: boolean;
  attachments?: FileWithPath[];
};
