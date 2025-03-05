import { FileWithPath } from 'react-dropzone';

interface FileProgressBaseProps {
  onDelete?: () => Promise<void> | void;
  file: FileWithPath | File;
  onCancel?: () => void;
  isError?: boolean;
  isDone?: boolean;
}

type DoneFileProgress = FileProgressBaseProps & {
  isDone: true;
  indeterminate?: undefined;
  progressPercent?: undefined;
};

type ProgressPercentFileProgress = FileProgressBaseProps & {
  progressPercent: number;
  indeterminate?: false;
};

type IndeterminateFileProgress = FileProgressBaseProps & {
  progressPercent?: undefined;
  indeterminate: true;
};

type FileProgressBase =
  | ProgressPercentFileProgress
  | IndeterminateFileProgress
  | DoneFileProgress;

export type RegularFileProgressBaseProps = FileProgressBase & {
  compact?: false;
  fullErrorText?: string;
  customLoadingText?: string;
  customCompleteText?: string;
  onRetry?: () => void;
};

export type CompactFileProgressBaseProps = FileProgressBase & {
  compact: true;
  shortErrorText?: string;
  fullErrorText?: string;
};

export interface FileProgressPropsExtension {
  showCompleteState: boolean;
  handleOnClick: () => void;
  isDeleting: boolean;
}

export type FileProgressProps =
  | RegularFileProgressBaseProps
  | CompactFileProgressBaseProps;
