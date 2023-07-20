import { FC, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FileProgress from '../../../../Feedback/Progress/FileProgress';
import FileUploadArea from '../../../../Inputs/FileUploadArea';
import { SeverityOption } from './FeedbackDetails';
import { FeedbackContentType } from './FeedbackForm';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileUploadAreaWrapper = styled.div`
  position: relative;
  top: -10px;
`;

const FilesUploadedList = styled.div``;

const LabelAndMeta = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 10px;
  margin: 0 ${spacings.comfortable.small};
  > p {
    color: ${colors.text.static_icons__tertiary.hex};
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
    console.log(acceptedFiles);
    const cleanedOfHiddenFiles = acceptedFiles.filter(
      (file) => file.name[0] !== '.'
    );
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
    setRejectedFiles(fileRejections);
    updateFeedback('attachments', cleanedOfHiddenFiles);
  };

  const handleOnDelete = (file: FileWithPath) => {
    const newAttachmentsList =
      feedbackContent.attachments?.filter(
        (attachment) =>
          attachment.name === file.name && attachment.size !== file.size
      ) ?? [];

    updateFeedback('attachments', newAttachmentsList);
  };

  return (
    <Wrapper>
      <FileUploadAreaWrapper className="test">
        <LabelAndMeta>
          <Typography group="input" variant="label">
            Attachments
          </Typography>
          <Typography group="input" variant="label">
            optional
          </Typography>
        </LabelAndMeta>
        <FileUploadArea
          onDrop={onDrop}
          accept={{
            'application/pdf': ['.pdf'],
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation':
              ['.pptx'],
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
          }}
        />
      </FileUploadAreaWrapper>
      <FilesUploadedList>
        {feedbackContent.attachments?.map((file) => {
          return (
            <FileProgress
              key={file.name + file.size}
              name={file.name}
              onDelete={() => handleOnDelete(file)}
              onAbort={() => null}
            />
          );
        })}
        {rejectedFiles.map((rejection) => {
          return (
            <FileProgress
              key={rejection.file.name + rejection.file.size}
              name={rejection.file.name}
              onDelete={() => null}
              onAbort={() => null}
              error={true}
              errorMsg={
                rejection.errors[0].code + ' - ' + rejection.errors[0].message
              }
            />
          );
        })}
      </FilesUploadedList>
    </Wrapper>
  );
};

export default UploadFile;
