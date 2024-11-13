import { FC, useEffect, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { Icon, Typography } from '@equinor/eds-core-react';
import { clear, error_outlined } from '@equinor/eds-icons';

import {
  AdditionalText,
  CircularProgress,
  CloseButton,
  CompactFileProgressContainer,
  DoneWrapper,
  FileTooltip,
  LoadingWrapper,
  Rejection,
} from './CompactFileProgress.styles';
import {
  CompactFileProgressBaseProps,
  FileProgressPropsExtension,
} from './FileProgress';
import {
  getFileIcon,
  isFileImage,
  readUploadedFileAsText,
} from './FileProgress.utils';
import { colors } from 'src/atoms/style';
import { OptionalTooltip } from 'src/molecules';

interface CompactFileProgressProps
  extends CompactFileProgressBaseProps,
    FileProgressPropsExtension {}

const CompactFileProgress: FC<CompactFileProgressProps> = ({
  file,
  progressPercent,
  isError,
  shortErrorText,
  showCompleteState,
  fullErrorText,
  handleOnClick,
  isDeleting,
}) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const getSrc = async (file: FileWithPath) => {
      const src = await readUploadedFileAsText(file);
      setSrc(src);
    };
    if (!isError) {
      getSrc(file);
    }
  }, [isError, file]);

  const errorText = useMemo(() => {
    if (!isError) return '';
    if (fullErrorText && fullErrorText.length > 0) {
      return fullErrorText;
    }
    return 'An error has occurred with the file';
  }, [fullErrorText, isError]);

  const content = useMemo(() => {
    if (isError) {
      return (
        <Rejection>
          <Icon
            data={error_outlined}
            color={colors.interactive.warning__text.rgba}
          />
          <div>
            {shortErrorText && shortErrorText.length > 0
              ? shortErrorText
              : 'Invalid file type'}
          </div>
        </Rejection>
      );
    }

    if (showCompleteState && !isDeleting && isFileImage(file.name)) {
      return (
        <DoneWrapper>
          <img src={src} alt={' ' + `${file.name}`} />
        </DoneWrapper>
      );
    }

    if (showCompleteState && !isDeleting) {
      return (
        <DoneWrapper>
          <Icon data={getFileIcon(file.name)} />
        </DoneWrapper>
      );
    }

    return (
      <LoadingWrapper>
        <CircularProgress
          variant={
            progressPercent === undefined || isDeleting
              ? 'indeterminate'
              : 'determinate'
          }
          value={progressPercent}
          size={24}
        />
        <Typography variant="meta">Uploading...</Typography>
      </LoadingWrapper>
    );
  }, [
    isError,
    showCompleteState,
    isDeleting,
    progressPercent,
    shortErrorText,
    src,
    file.name,
  ]);

  return (
    <CompactFileProgressContainer $isError={isError}>
      <FileTooltip title={errorText}>{content}</FileTooltip>
      <OptionalTooltip title={file.name}>
        <AdditionalText group="paragraph" variant="meta">
          {file.name}
        </AdditionalText>
      </OptionalTooltip>
      {!isDeleting && (
        <CloseButton
          data-testid="attachment-delete-button"
          onClick={handleOnClick}
        >
          <Icon color={colors.text.static_icons__tertiary.rgba} data={clear} />
        </CloseButton>
      )}
    </CompactFileProgressContainer>
  );
};

export default CompactFileProgress;
