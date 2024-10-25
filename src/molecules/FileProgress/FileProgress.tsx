import { FC, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import CompactFileProgress from 'src/molecules/FileProgress/CompactFileProgress';
import RegularFileProgress from 'src/molecules/FileProgress/RegularFileProgress';

interface FileProgressBaseProps {
  onDelete: () => Promise<void> | void;
  file: FileWithPath | File;
  isDone?: boolean;
  progressPercent?: number;
  indeterminate?: boolean;
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
  isDeleting: boolean;
}

/**
 * @progressPercent - The percentage of the file that has been uploaded, if undefined its considered indeterminate
 */
export const FileProgress: FC<
  RegularFileProgressBaseProps | CompactFileProgressBaseProps
> = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const showCompleteState = useMemo(() => {
    if (props.isError ?? props.isDone === undefined) return true;
    return props.isDone;
  }, [props.isError, props.isDone]);

  const handleOnClick = async () => {
    if (!showCompleteState && props.onCancel) {
      props.onCancel();
    } else {
      setIsDeleting(true);
      await props.onDelete();
      setIsDeleting(false);
    }
  };

  if (props.compact) {
    return (
      <CompactFileProgress
        {...props}
        isDeleting={isDeleting}
        showCompleteState={showCompleteState}
        handleOnClick={handleOnClick}
      />
    );
  }

  return (
    <RegularFileProgress
      {...props}
      isDeleting={isDeleting}
      showCompleteState={showCompleteState}
      handleOnClick={handleOnClick}
    />
  );
};
