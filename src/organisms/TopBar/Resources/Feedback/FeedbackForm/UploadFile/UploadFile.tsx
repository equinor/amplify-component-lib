import { FC, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { FileUploadArea } from 'src/molecules/FileUploadArea/FileUploadArea';
import { MAX_FILE_SIZE_BYTES } from 'src/organisms/TopBar/Resources/Feedback/Feedback.const';
import { ImageFile } from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/UploadFile/ImageFile';
import {
  FileUploadAreaWrapper,
  Title,
} from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/UploadFile/UploadFile.styles';
import { useFeedbackContext } from 'src/organisms/TopBar/Resources/Feedback/hooks/useFeedbackContext';

import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
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

export const UploadFile: FC = () => {
  const { feedbackAttachments, setFeedbackAttachments } = useFeedbackContext();
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const onDrop = (
    acceptedFiles: FileWithPath[],
    fileRejections: FileRejection[]
  ) => {
    if (acceptedFiles.length >= 1) {
      const cleanedOfHiddenFiles = acceptedFiles.filter(
        (file) => !file.name.startsWith('.')
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
      setFeedbackAttachments(newAttachments);
    }
    setRejectedFiles(fileRejections);
  };

  const handleOnDelete = (file: FileWithPath) => {
    const newAttachmentsList =
      feedbackAttachments?.filter((attachment) => {
        /* v8 ignore start */ // TODO: Fix coverage for rejected files. user.upload doesnt send the rejected files to onDrop
        return attachment.name !== file.name && attachment.size !== file.size;
      }) ?? [];
    /* v8 ignore end */

    setFeedbackAttachments(newAttachmentsList);
  };

  /* v8 ignore start */
  const handleOnDeleteRejected = (rejection: FileRejection) => {
    setRejectedFiles(
      rejectedFiles?.filter(
        (attachment) =>
          attachment.file.name === rejection.file.name &&
          attachment.file.size !== rejection.file.size
      ) ?? []
    );
  };
  /* v8 ignore end */

  return (
    <Container>
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
          size="small"
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
          /* v8 ignore start */
          return (
            <ImageFile
              key={rejection.file.name + rejection.file.size}
              {...rejection}
              onDelete={() => handleOnDeleteRejected(rejection)}
              error
            />
          );
          /* v8 ignore end */
        })}
      </FileUploadAreaWrapper>
    </Container>
  );
};
