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
} from './FileProgress.types';
import {
  getFileIcon,
  isFileImage,
  readUploadedFileAsText,
} from './FileProgress.utils';
import { colors } from 'src/atoms/style';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

const CompactFileProgress: FC<
  CompactFileProgressBaseProps & FileProgressPropsExtension
> = ({
  file,
  isError,
  shortErrorText,
  showCompleteState,
  fullErrorText,
  handleOnClick,
  isDeleting,
  ...rest
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
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="86"
              height="86"
              rx="7"
              stroke={colors.interactive.warning__text.rgba}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
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
            rest.indeterminate || isDeleting ? 'indeterminate' : 'determinate'
          }
          value={
            !rest.isDone && !rest.indeterminate
              ? rest.progressPercent
              : undefined
          }
          size={24}
        />
        <Typography variant="meta">Uploading...</Typography>
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="86"
            height="86"
            rx="7"
            stroke={colors.ui.background__medium.rgba}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </LoadingWrapper>
    );
  }, [
    isError,
    showCompleteState,
    isDeleting,
    shortErrorText,
    src,
    file.name,
    rest,
  ]);

  return (
    <CompactFileProgressContainer $isError={isError}>
      <FileTooltip title={errorText}>{content}</FileTooltip>
      <OptionalTooltip title={file.name}>
        <AdditionalText group="paragraph" variant="meta">
          {file.name}
        </AdditionalText>
      </OptionalTooltip>
      {!isDeleting && rest.onDelete && (
        <CloseButton data-testid="delete-file" onClick={handleOnClick}>
          <Icon color={colors.text.static_icons__tertiary.rgba} data={clear} />
        </CloseButton>
      )}
    </CompactFileProgressContainer>
  );
};

export default CompactFileProgress;
