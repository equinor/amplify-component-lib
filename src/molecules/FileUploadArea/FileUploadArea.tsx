import { FC, useMemo } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Icon, Typography } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';

import { animation, colors, spacings } from 'src/atoms/style';
import { Button, OptionalTooltip } from 'src/molecules';
import { BORDER_RADIUS } from 'src/molecules/FileProgress/CompactFileProgress.styles';
import { UploadIllustration } from 'src/molecules/FileUploadArea/UploadIllustration';

import styled from 'styled-components';

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
  border: 2px dashed ${colors.interactive.primary__resting.rgba};
  border-radius: 15px;
  margin-top: 10px;
  padding: ${spacings.medium_small} ${spacings.xx_large};
  /* c8 ignore next */
  background: ${colors.ui.background__light.rgba};
  transition: background ${animation.transitionMS};
  > section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacings.x_small};
    margin: calc(${spacings.medium_small} / 2) 0;
  }
`;

const CompactUploadWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border: 2px dashed ${colors.interactive.primary__resting.rgba};
  border-radius: ${BORDER_RADIUS};
  background: ${colors.ui.background__light.rgba};
  transition: background ${animation.transitionMS};
  > svg {
    width: 48px;
    height: 48px;
  }
  > p {
    color: ${colors.interactive.primary__resting.rgba};
  }
  > p:last-child {
    color: ${colors.text.static_icons__tertiary.rgba};
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    position: absolute;
    bottom: calc((1.6em + ${spacings.small}) * -1);
  }
  &:hover {
    cursor: pointer;
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

const DividerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  width: 100%;
  gap: ${spacings.x_small};
  align-items: center;
  > p {
    color: ${colors.text.static_icons__tertiary.rgba};
  }
  > hr {
    width: 100%;
    height: 2px;
  }
`;

export type FileUploadAreaProps = {
  compact?: boolean;
} & DropzoneOptions;

export const FileUploadArea: FC<FileUploadAreaProps> = ({
  compact,
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

  if (compact) {
    return (
      <CompactUploadWrapper {...getRootProps()}>
        <input data-testid="file-upload-area-input" {...getInputProps()} />
        <UploadIllustration />
        <Typography variant="meta">Upload image</Typography>
        {options.accept && (
          <OptionalTooltip title={`Supported filetypes: ${filetypes}`}>
            <Typography variant="meta">({filetypes})</Typography>
          </OptionalTooltip>
        )}
      </CompactUploadWrapper>
    );
  }

  return (
    <UploadWrapper
      {...getRootProps()}
      onClick={undefined}
      style={{
        /* c8 ignore next 2 */
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
