import { FC, useMemo } from 'react';
import { FileWithPath } from 'react-dropzone';

import CompactFileProgress from 'src/molecules/FileProgress/CompactFileProgress';
import RegularFileProgress from 'src/molecules/FileProgress/RegularFileProgress';

interface FileProgressBaseProps {
  onDelete: () => void;
  file: FileWithPath | File;
  isDone?: boolean;
  progressPercent?: number;
  onCancel?: () => void;
  isError?: boolean;
}

export interface RegularFileProgressBaseProps extends FileProgressBaseProps {
  compact?: false;
  fullErrorText?: string;
  customLoadingText?: string;
  customCompleteText?: string;
  onRetry?: () => void;
}
export interface CompactFileProgressBaseProps extends FileProgressBaseProps {
  compact: true;
  shortErrorText?: string;
  fullErrorText?: string;
}

export interface FileProgressPropsExtension {
  showCompleteState: boolean;
  handleOnClick: () => void;
}

export const FileProgress: FC<
  RegularFileProgressBaseProps | CompactFileProgressBaseProps
> = (props) => {
  const showCompleteState = useMemo(() => {
    if (props.isError ?? props.isDone === undefined) return true;
    return props.isDone;
  }, [props.isError, props.isDone]);

  const handleOnClick = () => {
    if (!showCompleteState && props.onCancel) {
      props.onCancel();
    } else {
      props.onDelete();
    }
  };

  if (props.compact) {
    return (
      <CompactFileProgress
        {...props}
        showCompleteState={showCompleteState}
        handleOnClick={handleOnClick}
      />
    );
  }

  return (
    <RegularFileProgress
      {...props}
      showCompleteState={showCompleteState}
      handleOnClick={handleOnClick}
    />
  );
};
