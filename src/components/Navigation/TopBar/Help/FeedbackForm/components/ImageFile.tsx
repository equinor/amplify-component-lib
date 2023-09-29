import { FC, useEffect, useMemo, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Icon, Tooltip } from '@equinor/eds-core-react';
import { clear, error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { readUploadedFileAsText } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.utils';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface WrapperProps {
  $error: boolean;
}

const Wrapper = styled.div<WrapperProps>`
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
  > p {
    word-wrap: break-word;
  }
`;

const CloseButton = styled.div`
  background-color: ${colors.text.static_icons__tertiary.hex};
  border-radius: 50%;
  border: 2px solid ${colors.text.static_icons__primary_white.rgba};
  position: absolute;
  width: 18px;
  height: 18px;
  right: -10px;
  top: -10px;
  > svg {
    width: 18px;
    height: 18px;
    fill: ${colors.text.static_icons__primary_white.rgba};
  }
`;

export interface ImageFileProps {
  onDelete: () => void;
  onAbort: () => void;
  rejection?: FileRejection;
  file?: FileWithPath;
  error?: boolean;
  errorMsg?: string;
  loading?: boolean;
  progress?: number;
}

const ImageFile: FC<ImageFileProps> = ({
  rejection,
  file,
  error,
  errorMsg,
  onDelete,
  onAbort,
  loading,
}) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const getSrc = async (file: FileWithPath) => {
      const src = await readUploadedFileAsText(file);
      setSrc(src);
    };
    if (file) {
      getSrc(file);
    }
  }, [file]);

  const fileName = useMemo(() => {
    if (file) return file.name;
    if (rejection) return rejection.file.name;
    return '';
  }, [file, rejection]);

  return (
    <Wrapper $error={error !== undefined}>
      <Tooltip
        title={`
          ${fileName}${error ? ': ' + errorMsg : ''}
        `}
      >
        {error ? (
          <Rejection>
            <Icon
              data={error_outlined}
              color={colors.interactive.warning__resting.hex}
            />
            {errorMsg?.includes('invalid') ? 'Invalid' : 'Error'}
          </Rejection>
        ) : (
          <ImageWrapper>
            <img src={src} alt={`Uploaded file: ${fileName}`} />
          </ImageWrapper>
        )}
      </Tooltip>
      <CloseButton onClick={() => (loading ? onAbort() : onDelete())}>
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
