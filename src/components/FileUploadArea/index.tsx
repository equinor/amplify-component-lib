import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Icon, Typography } from '@equinor/eds-core-react';

import { FC } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { upload } from '@equinor/eds-icons';

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

  return (
    <UploadWrapper {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
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
              <>Supported filetypes: {props.accept}</>
            </Typography>
          )}
        </>
      )}
    </UploadWrapper>
  );
};

export default FileUploadArea;
