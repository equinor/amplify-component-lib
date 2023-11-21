import { FC, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FileUploadArea from '../../../../../../../Inputs/FileUploadArea';
import { MAX_FILE_SIZE_BYTES } from '../../../Feedback.const';
import { useFeedbackContext } from '../../../hooks/useFeedbackContext';
import ImageFile from './ImageFile';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
`;
const Title = styled(Typography)`
  margin: ${spacings.comfortable.small} ${spacings.comfortable.small} 0
    ${spacings.comfortable.small};
  color: ${colors.text.static_icons__tertiary.hex};
`;

const FileUploadAreaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: ${spacings.comfortable.medium_small};
  height: fit-content;
  position: relative;
  > :first-child {
    margin-top: ${spacings.comfortable.medium_small};
  }
`;

function removeDuplicates(
  a: FileWithPath[],
  fn: (a: FileWithPath, b: FileWithPath) => boolean
) {
  if (a.length === 0 || a.length === 1) {
    return a;
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (fn(a[i], a[j])) {
        a.splice(i, 1);
      }
    }
  }
  return a;
}

interface UploadFileProps {}

const UploadFile: FC<UploadFileProps> = () => {
  const { feedbackAttachments, updateFeedback } = useFeedbackContext();
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const onDrop = async (
    acceptedFiles: FileWithPath[],
    fileRejections: FileRejection[]
  ) => {
    if (acceptedFiles.length >= 1) {
      const cleanedOfHiddenFiles = acceptedFiles.filter(
        (file) => file.name[0] !== '.'
      );
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      const oldAttachments: FileWithPath[] = [];

      if (feedbackAttachments) {
        oldAttachments.push(...feedbackAttachments);
      }
      const combinedNewAndPrev = [...cleanedOfHiddenFiles, ...oldAttachments];
      const newAttachments = removeDuplicates(
        combinedNewAndPrev,
        (a, b) => a.name === b.name && a.size === b.size
      );
      updateFeedback('attachments', newAttachments);
    }
    setRejectedFiles(fileRejections);
  };

  const handleOnDelete = (file: FileWithPath) => {
    const newAttachmentsList =
      feedbackAttachments?.filter((attachment) => {
        /* c8 ignore start */ // TODO: Fix coverage for rejected files. user.upload doesnt send the rejected files to onDrop
        return attachment.name !== file.name && attachment.size !== file.size;
      }) ?? [];
    /* c8 ignore end */
    updateFeedback('attachments', newAttachmentsList);
  };

  /* c8 ignore start */
  const handleOnDeleteRejected = (rejection: FileRejection) => {
    setRejectedFiles(
      rejectedFiles?.filter(
        (attachment) =>
          attachment.file.name === rejection.file.name &&
          attachment.file.size !== rejection.file.size
      ) ?? []
    );
  };
  /* c8 ignore end */

  return (
    <Wrapper>
      <Title group="input" variant="label">
        Attachments (.jpg, .jpeg, .png) (max 1 MB)
      </Title>
      <FileUploadAreaWrapper>
        <FileUploadArea
          maxSize={MAX_FILE_SIZE_BYTES}
          onDrop={onDrop}
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
          }}
          compact
        />
        {feedbackAttachments?.map((file) => {
          return (
            <ImageFile
              key={file.name + file.size}
              onDelete={() => handleOnDelete(file)}
              file={file}
            />
          );
        })}
        {rejectedFiles.map((rejection) => {
          /* c8 ignore start */
          return (
            <ImageFile
              {...rejection}
              key={rejection.file.name + rejection.file.size}
              onDelete={() => handleOnDeleteRejected(rejection)}
              error
            />
          );
          /* c8 ignore end */
        })}
      </FileUploadAreaWrapper>
    </Wrapper>
  );
};

export default UploadFile;
