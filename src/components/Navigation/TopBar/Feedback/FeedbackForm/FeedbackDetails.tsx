import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Icon,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { keyboard_backspace } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import FileUploadArea from '../../../../Inputs/FileUploadArea';
import { FeedbackContentType, FeedbackType } from './FeedbackForm';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const MenuSectionTitle = styled(Typography)`
  padding: ${spacings.comfortable.small} 0;
`;

const FileUploadAreaWrapper = styled.div`
  position: relative;
  top: -10px;
`;

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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.comfortable.medium};
`;

export enum SeverityOption {
  NO_IMPACT = 'I am not impacted',
  IMPEDES = 'It impedes my progress',
  UNABLE = 'I am unable to work',
}

interface FeedbackDetailsProps {
  selectedType: FeedbackType;
  setSelectedType: Dispatch<SetStateAction<FeedbackType | undefined>>;
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath
  ) => void;
}

const FeedbackDetails: FC<FeedbackDetailsProps> = ({
  selectedType,
  setSelectedType,
  feedbackContent,
  updateFeedback,
}) => {
  const onDrop = (
    acceptedFiles: FileWithPath[],
    fileRejections: FileRejection[]
  ) => {
    const cleanedOfHiddenFiles = acceptedFiles.filter(
      (file) => file.name[0] !== '.'
    );
    console.log(cleanedOfHiddenFiles);
    updateFeedback('attachments', cleanedOfHiddenFiles[0]);
  };

  return (
    <Wrapper>
      <MenuSectionTitle group="input" variant="label">
        {selectedType === FeedbackType.ERROR
          ? 'Service now error report'
          : 'General inquiry'}
      </MenuSectionTitle>
      <TextField
        id="feedback-title"
        label="Title"
        meta="Required"
        value={feedbackContent.title}
        placeholder="Write a title..."
        onChange={(e: FormEvent<HTMLInputElement>) =>
          updateFeedback('title', e.currentTarget.value)
        }
      />
      <TextField
        id="feedback-description"
        label="Description"
        meta="Required"
        value={feedbackContent.description}
        placeholder={'Describe the ' + selectedType + '...'}
        rows={3}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          updateFeedback('description', e.currentTarget.value)
        }
        multiline
      />
      {selectedType === FeedbackType.ERROR && (
        <>
          <Autocomplete
            options={Object.values(SeverityOption)}
            id="feedback-severity"
            label="Severity"
            meta="optional"
            selectedOptions={[feedbackContent.severity as SeverityOption]}
            placeholder="Select error impact"
            onOptionsChange={(e: AutocompleteChanges<SeverityOption>) =>
              updateFeedback('severity', e.selectedItems[0])
            }
            autoWidth
          />
          <TextField
            id="feedback-url"
            label="URL"
            meta="optional"
            value={feedbackContent.url}
            placeholder="URL of error location"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              updateFeedback('url', e.currentTarget.value)
            }
          />
        </>
      )}
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
            video: ['.vid'],
          }}
        />
      </FileUploadAreaWrapper>
      <Actions>
        <Button variant="ghost" onClick={() => setSelectedType(undefined)}>
          Back
        </Button>
        <Button>Send report</Button>
      </Actions>
    </Wrapper>
  );
};

export default FeedbackDetails;
