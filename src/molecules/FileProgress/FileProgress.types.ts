import { FileWithPath } from 'react-dropzone';

interface FileProgressBaseProps {
  onDelete: () => Promise<void> | void;
  file: FileWithPath | File;
  onCancel?: () => void;
  isError?: boolean;
}

type DoneFileProgress = FileProgressBaseProps & {
  isDone: true;
  indeterminate?: undefined;
};

type ProgressPercentFileProgress = FileProgressBaseProps & {
  progressPercent: number;
  isDone?: false;
  indeterminate?: false;
};

type IndeterminateFileProgress = FileProgressBaseProps & {
  progressPercent?: undefined;
  isDone?: false;
  indeterminate?: true;
};

type FileProgressBase =
  | DoneFileProgress
  | ProgressPercentFileProgress
  | IndeterminateFileProgress;

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
