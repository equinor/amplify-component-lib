import { FC, FormEvent, useMemo } from 'react';
import { FileWithPath } from 'react-dropzone';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  TextField,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ConsentCheckbox from './ConsentCheckbox';
import { FeedbackContentType, FeedbackEnum } from './FeedbackForm.types';
import UploadFile from './UploadFile';
import { useFeatureToggling } from 'src/hooks';

import styled from 'styled-components';

const { spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  max-width: 350px;
  padding: ${spacings.comfortable.medium};
  padding-top: 0;
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
  selectedType: FeedbackEnum;
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => void;
  handleSave: () => void;
  onClose: () => void;
}

const FeedbackFormInner: FC<FeedbackDetailsProps> = ({
  selectedType,
  feedbackContent,
  updateFeedback,
  handleSave,
  onClose,
}) => {
  const { showContent, isLoading } = useFeatureToggling('feedback-upload-file');

  const canSubmitFeedback = useMemo(() => {
    return (
      feedbackContent.title.length > 0 &&
      feedbackContent.description.length > 0 &&
      (feedbackContent.consent || selectedType === FeedbackEnum.INQUIRY)
    );
  }, [
    feedbackContent.title.length,
    feedbackContent.description.length,
    feedbackContent.consent,
    selectedType,
  ]);

  return (
    <Wrapper>
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
      {selectedType === FeedbackEnum.ERROR && (
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
      {showContent && !isLoading && (
        <UploadFile
          feedbackContent={feedbackContent}
          updateFeedback={updateFeedback}
        />
      )}
      <ConsentCheckbox
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
        selectedType={selectedType}
      />
      <Actions>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!canSubmitFeedback}>
          Send
        </Button>
      </Actions>
    </Wrapper>
  );
};

export default FeedbackFormInner;
