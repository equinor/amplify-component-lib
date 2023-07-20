import { Dispatch, FC, FormEvent, SetStateAction, useMemo } from 'react';
import { FileWithPath } from 'react-dropzone';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ConsentCheckbox from './ConsentCheckbox';
import { FeedbackContentType, FeedbackEnum } from './FeedbackForm';
import UploadFile from './UploadFile';

import styled from 'styled-components';

const { spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  max-width: 350px;
`;

const MenuSectionTitle = styled(Typography)`
  padding: ${spacings.comfortable.small} 0;
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
  setSelectedType: Dispatch<SetStateAction<FeedbackEnum | undefined>>;
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => void;
  handleSave: () => void;
}

const FeedbackDetails: FC<FeedbackDetailsProps> = ({
  selectedType,
  setSelectedType,
  feedbackContent,
  updateFeedback,
  handleSave,
}) => {
  const canSubmitFeedback = useMemo(() => {
    return (
      feedbackContent.title.length > 0 &&
      feedbackContent.description.length > 0 &&
      (feedbackContent.consent || selectedType === FeedbackEnum.INQUIRY)
    );
  }, [feedbackContent.title.length, feedbackContent.description.length, feedbackContent.consent, selectedType]);

  return (
    <Wrapper>
      <MenuSectionTitle group="input" variant="label">
        {selectedType === FeedbackEnum.ERROR
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
      <UploadFile
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
      />
      <ConsentCheckbox
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
        selectedType={selectedType}
      />
      <Actions>
        <Button variant="ghost" onClick={() => setSelectedType(undefined)}>
          Back
        </Button>
        <Button onClick={handleSave} disabled={!canSubmitFeedback}>
          Send report
        </Button>
      </Actions>
    </Wrapper>
  );
};

export default FeedbackDetails;
