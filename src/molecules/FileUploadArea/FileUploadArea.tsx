import { FC, useMemo } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Icon, Typography } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';

import {
  DividerRow,
  MediumUploadWrapper,
  SmallUploadWrapper,
  UploadWrapper,
} from './FileUploadArea.styles';
import { colors } from 'src/atoms/style';
import { Button, OptionalTooltip } from 'src/molecules';
import { UploadIllustration } from 'src/molecules/FileUploadArea/UploadIllustration';

export type FileUploadAreaProps = {
  /*
   @description Default size is "large"
   */
  size?: 'small' | 'medium' | 'large';
} & DropzoneOptions;

export const FileUploadArea: FC<FileUploadAreaProps> = ({
  size = 'large',
  ...options
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
  });

  const filetypes = useMemo((): string | undefined => {
    if (options.accept) {
      return Object.values(options.accept).join(', ');
    }
  }, [options.accept]);

  if (size == 'small') {
    return (
      <SmallUploadWrapper {...getRootProps()}>
        <input data-testid="file-upload-area-input" {...getInputProps()} />
        <UploadIllustration />
        <Typography variant="meta">Upload file</Typography>
        {options.accept && (
          <OptionalTooltip title={`Supported filetypes: ${filetypes}`}>
            <Typography variant="meta">({filetypes})</Typography>
          </OptionalTooltip>
        )}
      </SmallUploadWrapper>
    );
  }

  if (size == 'medium') {
    return (
      <MediumUploadWrapper {...getRootProps()}>
        <input data-testid="file-upload-area-input" {...getInputProps()} />
        <UploadIllustration />
        <section>
          <Typography variant="button" group="navigation">
            Drag files here
          </Typography>
          {options.accept && (
            <OptionalTooltip title={`Supported filetypes: ${filetypes}`}>
              <Typography
                group="paragraph"
                variant="meta"
                color={colors.text.static_icons__tertiary.rgba}
              >
                {filetypes}
              </Typography>
            </OptionalTooltip>
          )}
        </section>
        <DividerRow>
          <hr />
          <Typography variant="meta">OR</Typography>
          <hr />
        </DividerRow>
        <Button variant="ghost" onClick={getRootProps().onClick}>
          <Icon data={folder} />
          Browse files
        </Button>
      </MediumUploadWrapper>
    );
  }

  return (
    <UploadWrapper
      {...getRootProps()}
      onClick={undefined}
      style={{
        /* v8 ignore next 2 */
        background: isDragActive
          ? colors.interactive.primary__hover_alt.rgba
          : undefined,
      }}
    >
      <input data-testid="file-upload-area-input" {...getInputProps()} />
      <UploadIllustration />
      <section>
        <Typography variant="button" group="navigation">
          Drag files here to upload.
        </Typography>
        {options.accept && (
          <Typography
            group="paragraph"
            variant="meta"
            color={colors.text.static_icons__tertiary.rgba}
          >
            Supported filetypes: {filetypes}
          </Typography>
        )}
      </section>
      <DividerRow>
        <hr />
        <Typography variant="button" group="navigation">
          OR
        </Typography>
        <hr />
      </DividerRow>
      <Button variant="ghost" onClick={getRootProps().onClick}>
        <Icon data={folder} />
        Browse files
      </Button>
    </UploadWrapper>
  );
};
