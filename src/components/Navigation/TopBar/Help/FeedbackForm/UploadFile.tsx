import { FC, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackContentType, SeverityOption } from './FeedbackForm.types';
import FileUploadArea from 'src/components/Inputs/FileUploadArea';
import ImageFile from 'src/components/Navigation/TopBar/Help/FeedbackForm/ImageFile';

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
  height: 140px;
  overflow-x: visible;
  overflow-y: auto;
  > :first-child {
    margin-top: ${spacings.comfortable.medium_small};
  }
`;

interface UploadFileProps {
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[]
  ) => void;
}

const UploadFile: FC<UploadFileProps> = ({
  feedbackContent,
  updateFeedback,
}) => {
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
      updateFeedback('attachments', cleanedOfHiddenFiles);
    }
    setRejectedFiles(fileRejections);
  };

  const handleOnDelete = (file: FileWithPath) => {
    const newAttachmentsList =
      feedbackContent.attachments?.filter(
        (attachment) =>
          /* c8 ignore start */ // TODO: Fix coverage for rejected files. user.upload doesnt send the rejected files to onDrop
          attachment.name !== file.name && attachment.size !== file.size
      ) ?? [];
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
        Attachments
      </Title>
      <FileUploadAreaWrapper className="test">
        <FileUploadArea
          compact
          onDrop={onDrop}
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
          }}
        />
        {feedbackContent.attachments?.map((file) => {
          return (
            <ImageFile
              key={file.name + file.size}
              onDelete={() => handleOnDelete(file)}
              onAbort={() => null}
              file={file}
            />
          );
        })}
        {rejectedFiles.map((rejection) => {
          console.log(rejection);
          /* c8 ignore start */
          return (
            <ImageFile
              rejection={rejection}
              key={rejection.file.name + rejection.file.size}
              onDelete={() => handleOnDeleteRejected(rejection)}
              onAbort={() => null}
              error={true}
              errorMsg={
                rejection.errors[0].code + ' - ' + rejection.errors[0].message
              }
            />
          );
          /* c8 ignore end */
        })}
      </FileUploadAreaWrapper>
    </Wrapper>
  );
};

export default UploadFile;
