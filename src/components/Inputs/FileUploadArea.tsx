import { FC, useMemo } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { upload } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface UploadWrapperProps {
  $isDragActive: boolean;
}

const UploadWrapper = styled.div<UploadWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
  height: 152px;
  border: 2px dotted ${colors.interactive.primary__resting.rgba};
  border-radius: 15px;
  margin-top: 10px;
  :hover {
    background-color: #deedee;
    cursor: pointer;
  }
  /* c8 ignore next */
  background-color: ${(props) => (props.$isDragActive ? `#deedee` : '')};
`;

const CompactUploadWrapper = styled.div<UploadWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border: 1px dashed ${colors.interactive.primary__resting.rgba};
  border-radius: 4px;
  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
    cursor: pointer;
  }
  /* c8 ignore next */
  background-color: ${(props) => (props.$isDragActive ? `#deedee` : '')};
`;

export type FileUploadAreaProps = {
  compact?: boolean;
} & DropzoneOptions;

const FileUploadArea: FC<FileUploadAreaProps> = ({ compact, ...options }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
  });

  const filetypes = useMemo((): string | undefined => {
    if (options.accept) {
      return Object.values(options.accept).join(', ');
    }
  }, [options.accept]);

  if (compact) {
    return (
      <CompactUploadWrapper {...getRootProps()} $isDragActive={isDragActive}>
        <input data-testid="file-upload-area-input" {...getInputProps()} />
        <Icon data={add} color={colors.interactive.primary__resting.rgba} />
      </CompactUploadWrapper>
    );
  }

  return (
    <UploadWrapper {...getRootProps()} $isDragActive={isDragActive}>
      <input data-testid="file-upload-area-input" {...getInputProps()} />
      {
        /* c8 ignore start */
        isDragActive ? (
          <Typography variant="h6">Drop to upload your files</Typography>
        ) : (
          /* c8 ignore end */
          <>
            <Icon
              data={upload}
              color={colors.interactive.primary__resting.rgba}
            />
            <Typography group="navigation" variant="button">
              Drop files or{' '}
              <Typography
                color={colors.interactive.primary__resting.rgba}
                as="span"
              >
                browse
              </Typography>{' '}
              to upload
            </Typography>
            {options.accept && (
              <Typography group="paragraph" variant="meta">
                <>Supported filetypes: {filetypes}</>
              </Typography>
            )}
          </>
        )
      }
    </UploadWrapper>
  );
};

export default FileUploadArea;
