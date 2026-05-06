import { FC, useEffect, useMemo, useState } from 'react';
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
import { Button } from 'src/molecules/Button/Button';
import { FILE_UPLOAD_SCRIM_ID } from 'src/molecules/FileUploadArea/FileUploadArea.constants';
import { UploadIllustration } from 'src/molecules/FileUploadArea/UploadIllustration';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

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
  const [isDraggingOverWindow, setIsDraggingOverWindow] = useState(false);

  /* v8 ignore start */
  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      // Prevent default to allow dropping
      event.preventDefault();
      if (!isDraggingOverWindow) {
        setIsDraggingOverWindow(true);
      }
    };

    const handleDragLeave = (event: DragEvent) => {
      // Check if the drag is truly leaving the window, not just an element within it
      if (
        event.clientX === 0 ||
        event.clientY === 0 ||
        event.clientX === window.innerWidth ||
        event.clientY === window.innerHeight
      ) {
        setIsDraggingOverWindow(false);
      }
    };

    const handleDrop = () => {
      setIsDraggingOverWindow(false);
    };

    const handleDragEnd = () => {
      setIsDraggingOverWindow(false);
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragend', handleDragEnd); // Important for when drag ends without a drop

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragend', handleDragEnd);
    };
  }, [isDraggingOverWindow]);

  useEffect(() => {
    if (isDraggingOverWindow) {
      if (!document.getElementById(FILE_UPLOAD_SCRIM_ID)) {
        const scrim = document.createElement('div');
        scrim.id = FILE_UPLOAD_SCRIM_ID;
        scrim.style.position = 'fixed';
        scrim.style.top = '0';
        scrim.style.left = '0';
        scrim.style.width = '100%';
        scrim.style.height = '100%';
        scrim.style.backgroundColor = colors.ui.background__scrim.rgba;
        scrim.style.zIndex = '9999';
        scrim.style.pointerEvents = 'none';
        window.document.body.appendChild(scrim);
      }
    } else {
      const scrim = document.getElementById(FILE_UPLOAD_SCRIM_ID);
      if (scrim !== null) {
        scrim.remove();
      }
    }
  }, [isDraggingOverWindow]);
  /* v8 ignore end */

  const filetypes = useMemo((): string | undefined => {
    if (options.accept) {
      return Object.values(options.accept).join(', ');
    }
  }, [options.accept]);

  if (size == 'small') {
    return (
      <SmallUploadWrapper
        {...getRootProps()}
        style={{
          /* v8 ignore next 2 */
          background: isDragActive
            ? colors.interactive.primary__hover_alt.rgba
            : undefined,
        }}
      >
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
      <MediumUploadWrapper
        {...getRootProps()}
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
