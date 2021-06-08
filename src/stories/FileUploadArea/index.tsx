import { FC, useCallback } from "react";
import { Typography, Icon } from "@equinor/eds-core-react";
import styled from "styled-components";
import { upload } from "@equinor/eds-icons";
import { withTheme } from "@material-ui/core";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";

import { tokens } from "@equinor/eds-tokens";
const { colors } = tokens;

interface UploadWrapperProps {
  isDragActive: boolean;
}

const UploadWrapper = withTheme(styled.div<UploadWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 152px;
  border: ${(props) => `2px dotted ${props.theme.primary__resting}`};
  border-radius: 12px;
  margin-top: 10px;
  :hover {
    background-color: #deedee;
    cursor: pointer;
  }
  background-color: ${(props) => (props.isDragActive ? `#deedee` : "")};
`);

export type FileUploadAreaProps = {} & DropzoneOptions;

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
            Drop files or{" "}
            <Typography
              color={colors.interactive.primary__resting.hsla}
              as="span"
            >
              browse
            </Typography>{" "}
            to upload
          </Typography>
          {props.accept && (
            <Typography group="paragraph" variant="meta">
              Supported filetypes: {props.accept}
            </Typography>
          )}
        </>
      )}
    </UploadWrapper>
  );
};

export default FileUploadArea;
