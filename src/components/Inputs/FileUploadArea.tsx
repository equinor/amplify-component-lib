import { FC, useMemo } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Icon, Typography } from '@equinor/eds-core-react';
import { upload } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface UploadWrapperProps {
  isDragActive: boolean;
}

const UploadWrapper = styled.div<UploadWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
  height: 152px;
  border: 2px dotted ${colors.interactive.primary__resting.hex};
  border-radius: 15px;
  margin-top: 10px;
  :hover {
    background-color: #deedee;
    cursor: pointer;
  }
  background-color: ${(props) => (props.isDragActive ? `#deedee` : '')};
`;

export type FileUploadAreaProps = DropzoneOptions;

const FileUploadArea: FC<FileUploadAreaProps> = (props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...props,
  });

  const filetypes = useMemo((): string | undefined => {
    if (props.accept) {
      return Object.values(props.accept).join(', ');
    }
  }, [props.accept]);

  return (
    <UploadWrapper {...getRootProps()} isDragActive={isDragActive}>
      <input data-testid="file-upload-area-input" {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="h6">Drop to upload your files</Typography>
      ) : (
        <>
          <Icon
            data={upload}
            color={colors.interactive.primary__resting.hsla}
          />
          <Typography group="navigation" variant="button">
            Drop files or{' '}
            <Typography
              color={colors.interactive.primary__resting.hsla}
              as="span"
            >
              browse
            </Typography>{' '}
            to upload
          </Typography>
          {props.accept && (
            <Typography group="paragraph" variant="meta">
              <>Supported filetypes: {filetypes}</>
            </Typography>
          )}
        </>
      )}
    </UploadWrapper>
  );
};

export default FileUploadArea;
