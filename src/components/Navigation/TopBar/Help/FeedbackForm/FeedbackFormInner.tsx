import { FC, FocusEvent, FormEvent, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  CircularProgress,
  TextField,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ConsentCheckbox from './ConsentCheckbox';
import {
  FeedbackContentType,
  FeedbackEnum,
  SeverityOption,
} from './FeedbackForm.types';
import UploadFile from './UploadFile';
import FilePrivacyCheckbox from 'src/components/Navigation/TopBar/Help/FeedbackForm/FilePrivacyCheckbox';

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

const LoadingSpinner = styled(CircularProgress)`
  height: 60%;
  margin: auto;
`;

interface FeedbackDetailsProps {
  selectedType: FeedbackEnum;
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => void;
  handleSave: () => void;
  onClose: () => void;
  requestIsLoading: boolean;
}

const FeedbackFormInner: FC<FeedbackDetailsProps> = ({
  selectedType,
  feedbackContent,
  updateFeedback,
  handleSave,
  onClose,
  requestIsLoading,
}) => {
  const [isWrongDomain, setIsWrongDomain] = useState(false);

  const hasAttachment = useMemo(() => {
    return (
      feedbackContent.attachments !== undefined &&
      feedbackContent.attachments.length > 0
    );
  }, [feedbackContent.attachments]);

  const filePrivacyConsent = useMemo(() => {
    if (hasAttachment && selectedType === FeedbackEnum.BUG) {
      return feedbackContent.filePrivacyConsent;
    }
    return true;
  }, [feedbackContent.filePrivacyConsent, hasAttachment, selectedType]);

  const handleOnUrlChange = (e: FormEvent<HTMLInputElement>) => {
    updateFeedback('url', e.currentTarget.value);
    if (e.currentTarget.value === '') {
      setIsWrongDomain(false);
    } else if (
      isWrongDomain &&
      e.currentTarget.value.includes('.equinor.com')
    ) {
      setIsWrongDomain(false);
    }
  };

  const handleOnUrlBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.includes('.equinor.com')) {
      setIsWrongDomain(true);
    }
  };

  const canSubmitFeedback = useMemo(() => {
    return (
      feedbackContent.title.length > 0 &&
      feedbackContent.description.length > 0 &&
      (feedbackContent.consent || selectedType === FeedbackEnum.SUGGESTION) &&
      filePrivacyConsent &&
      !isWrongDomain
    );
  }, [
    feedbackContent.title.length,
    feedbackContent.description.length,
    feedbackContent.consent,
    selectedType,
    filePrivacyConsent,
    isWrongDomain,
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
      {selectedType === FeedbackEnum.BUG && (
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
            variant={isWrongDomain ? 'error' : undefined}
            helperText={
              isWrongDomain
                ? 'The provided URL must from a equinor.com domain'
                : ''
            }
            onChange={handleOnUrlChange}
            onBlur={handleOnUrlBlur}
          />
        </>
      )}
      <UploadFile
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
      />
      <FilePrivacyCheckbox
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
        hasAttachment={hasAttachment}
      />
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
          {requestIsLoading ? <LoadingSpinner /> : 'Send'}
        </Button>
      </Actions>
    </Wrapper>
  );
};

export default FeedbackFormInner;
