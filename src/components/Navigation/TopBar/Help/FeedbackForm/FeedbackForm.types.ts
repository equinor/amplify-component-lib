import { FileWithPath } from 'react-dropzone';

export enum FeedbackEnum {
  ERROR = 'error',
  INQUIRY = 'inquiry',
}

export type FeedbackContentType = {
  title: string;
  description: string;
  severity?: string;
  url?: string;
  consent?: boolean;
  attachments?: FileWithPath[];
};
