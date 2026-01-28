import { FC, useMemo, useState } from 'react';

import { FileProgressProps } from './FileProgress.types';
import CompactFileProgress from 'src/molecules/FileProgress/CompactFileProgress';
import RegularFileProgress from 'src/molecules/FileProgress/RegularFileProgress';

export interface FileProgressPropsExtension {
  showCompleteState: boolean;
  handleOnClick: () => void;
  isDeleting: boolean;
}

/**
 * @param onDelete - call back when clicking delete
 * @param file - file to show progress for (FileWithPath or File)
 * @param onCancel - call back when clicking cancel
 * @param isError - if the file upload has an error
 * @param isDone - if the file upload is done
 * @param progressPercent - the percentage of the file that has been uploaded
 * @param indeterminate - if the file upload progress is indeterminate
 * @param compact - if the file progress should use compact mode
 * @param fullErrorText - the full error text to show when hovering over the error icon
 * @param customLoadingText - custom loading text to show
 * @param customCompleteText - custom complete text to show
 * @param onRetry - call back when clicking retry on a failed upload
 * @param shortErrorText - short error text to show (in compact mode)
 */
/* v8 ignore next */
export const FileProgress: FC<FileProgressProps> = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const showCompleteState = useMemo(() => {
    return !!props.isError || !!props.isDone;
  }, [props.isError, props.isDone]);

  const handleOnClick = async () => {
    if (!showCompleteState && props.onCancel) {
      props.onCancel();
    } else if (props.onDelete) {
      setIsDeleting(true);
      await props.onDelete();
      setIsDeleting(false);
      // Unable to test since we never call onClick when onDelete and onCancel are not provided
      /* v8 ignore next */
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
