import { FC, useEffect, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { Icon } from '@equinor/eds-core-react';
import { clear, error_outlined } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import {
  AdditionalText,
  CircularProgress,
  CloseButton,
  CompactFileProgressContainer,
  FileTooltip,
  ImageWrapper,
  LoadingWrapper,
  Rejection,
} from 'src/molecules/FileProgress/CompactFileProgress.styles';
import {
  CompactFileProgressBaseProps,
  FileProgressPropsExtension,
} from 'src/molecules/FileProgress/FileProgress';
import { readUploadedFileAsText } from 'src/molecules/FileProgress/FileProgress.utils';

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
              : 'Error occurred'}
          </div>
        </Rejection>
      );
    }

    if (showCompleteState && !isDeleting) {
      return (
        <ImageWrapper>
          <img src={src} alt={' ' + `${file.name}`} />
        </ImageWrapper>
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
      <AdditionalText group="paragraph" variant="meta">
        {file.name}
      </AdditionalText>
      {!showCompleteState && (
        <AdditionalText group="paragraph" variant="meta">
          Loading...
        </AdditionalText>
      )}
      {!isDeleting && (
        <CloseButton
          data-testid="attachment-delete-button"
          onClick={handleOnClick}
        >
          <Icon
            color={colors.text.static_icons__tertiary.rgba}
            data={clear}
            size={24}
          />
        </CloseButton>
      )}
    </CompactFileProgressContainer>
  );
};

export default CompactFileProgress;
