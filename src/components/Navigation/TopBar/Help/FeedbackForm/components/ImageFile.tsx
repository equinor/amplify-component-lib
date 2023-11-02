import { FC, useEffect, useMemo, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Icon, Tooltip } from '@equinor/eds-core-react';
import { clear, error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { readUploadedFileAsText } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.utils';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Wrapper = styled.div`
  border-radius: 4px;
  margin: 10px 0;
  width: 82px;
  height: 82px;
  position: relative;
  border: 2px solid ${colors.ui.background__light.hex};
`;

const ImageWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  > img {
    width: 100%;
    overflow: hidden;
  }
`;

const Rejection = styled.div`
  display: flex;
  gap: ${spacings.comfortable.small};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

const CloseButton = styled.div`
  background-color: ${colors.text.static_icons__tertiary.hex};
  border-radius: 50%;
  border: 2px solid ${colors.text.static_icons__primary_white.rgba};
  position: absolute;
  width: 18px;
  height: 18px;
  right: -10px;
  cursor: pointer;
  top: -10px;
  > svg {
    width: 18px;
    height: 18px;
    fill: ${colors.text.static_icons__primary_white.rgba};
  }
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

const ImageFile: FC<RejectionImageFileProps | SuccessImageFileProps> = (
  props
) => {
  const [src, setSrc] = useState('');

  const { error, onDelete } = props;

  const errorMessage = useMemo(() => {
    if (!error) return;
    /* c8 ignore start */
    return `${props.errors[0].code} - ${props.errors[0].message}`;
    /* c8 ignore end */
  }, [error, props]);

  const fileName = useMemo<string>(() => {
    /* c8 ignore start */ // TODO: Fix rejection testing
    if (error) {
      return props.file.name;
      /* c8 ignore end */
    } else {
      return props.file.name;
    }
  }, [error, props]);

  const shortError = useMemo(() => {
    if (!error) return '';
    if (props.errors.find((error) => error.code.includes('invalid'))) {
      return 'Invalid type';
    }
    if (props.errors.find((error) => error.code.includes('large'))) {
      return 'Invalid size';
    }
    return 'Error';
  }, [error, props]);
  console.log(shortError);

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
    <Wrapper>
      <Tooltip
        title={`
          ${fileName}${error ? ': ' + errorMessage : ''}
        `}
      >
        {
          /* c8 ignore start */
          error ? (
            <Rejection>
              <Icon
                data={error_outlined}
                color={colors.interactive.warning__resting.hex}
              />
              {shortError}
            </Rejection>
          ) : (
            /* c8 ignore end */
            <ImageWrapper>
              <img src={src} alt={`Uploaded file: ${fileName}`} />
            </ImageWrapper>
          )
        }
      </Tooltip>
      <CloseButton data-testid="attachment-delete-button" onClick={onDelete}>
        <Icon
          color={colors.text.static_icons__tertiary.hex}
          data={clear}
          size={24}
        />
      </CloseButton>
    </Wrapper>
  );
};

export default ImageFile;
