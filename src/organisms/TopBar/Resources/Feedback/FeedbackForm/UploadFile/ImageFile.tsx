import { FC, useEffect, useMemo, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Icon } from '@equinor/eds-core-react';
import { clear, error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { readUploadedFileAsText } from 'src/organisms/TopBar/Resources/Feedback/Feedback.utils';
import {
  CloseButton,
  FileTooltip,
  ImageWrapper,
  Rejection,
} from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/UploadFile/UploadFile.styles';

import styled from 'styled-components';

const { colors } = tokens;

const FILE_SIZE_ERROR_CODE = 'file-too-large';
const FILE_TYPE_ERROR_CODE = 'file-invalid-type';

const Container = styled.div`
  border-radius: 4px;
  margin: 10px 0;
  width: 82px;
  height: 82px;
  position: relative;
`;

interface ImageFileProps {
  onDelete: () => void;
}

interface RejectionImageFileProps extends ImageFileProps, FileRejection {
  error: true;
}
interface SuccessImageFileProps extends ImageFileProps {
  file: FileWithPath;
  error?: false;
}

export const ImageFile: FC<RejectionImageFileProps | SuccessImageFileProps> = (
  props
) => {
  const [src, setSrc] = useState('');
  const { error, onDelete } = props;

  const errorMessage = useMemo(() => {
    /* v8 ignore start */
    if (!error) return;
    const code = props.errors[0].code;
    let message = props.errors[0].message;
    if (code === FILE_SIZE_ERROR_CODE) {
      message = message.replace(/(\d+ bytes)/, '1MB');
    } else if (code === FILE_TYPE_ERROR_CODE) {
      message = message.replace(/(\w+\/\w+,)/g, '').replaceAll(',', ', ');
    }
    return `${props.errors[0].code} \n${message}`;
    /* v8 ignore end */
  }, [error, props]);

  const fileName = useMemo<string>(() => {
    /* v8 ignore start */ // TODO: Fix rejection testing
    if (error) {
      return props.file.name;
      /* v8 ignore end */
    } else {
      return props.file.name;
    }
  }, [error, props]);

  const shortError = useMemo(() => {
    if (!error) return '';
    if (props.errors.find((error) => error.code.includes('invalid'))) {
      return 'Invalid file type';
    }
    if (props.errors.find((error) => error.code.includes('large'))) {
      return 'Invalid file size';
    }
    return 'Error';
  }, [error, props]);

  useEffect(() => {
    const getSrc = async (file: FileWithPath) => {
      const src = await readUploadedFileAsText(file);
      setSrc(src);
    };
    if (!error) {
      getSrc(props.file);
    }
  }, [error, props]);

  return (
    <Container>
      <FileTooltip
        // placement="right"
        title={`${fileName}${error ? ': ' + errorMessage : ''}`}
      >
        {
          /* v8 ignore start */
          error ? (
            <Rejection>
              <Icon
                data={error_outlined}
                color={colors.interactive.warning__text.rgba}
              />
              <div>{shortError}</div>
            </Rejection>
          ) : (
            /* v8 ignore end */
            <ImageWrapper>
              <img src={src} alt={`Uploaded file: ${fileName}`} />
            </ImageWrapper>
          )
        }
      </FileTooltip>
      <CloseButton data-testid="attachment-delete-button" onClick={onDelete}>
        <Icon
          color={colors.text.static_icons__tertiary.rgba}
          data={clear}
          size={24}
        />
      </CloseButton>
    </Container>
  );
};
