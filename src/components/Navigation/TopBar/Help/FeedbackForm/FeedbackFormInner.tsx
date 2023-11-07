import { FC, FocusEvent, FormEvent, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Icon,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  FeedbackContentType,
  FeedbackEnum,
  UrgencyOption,
} from './FeedbackForm.types';
import UploadFile from 'src/components/Navigation/TopBar/Help/FeedbackForm/components/UploadFile';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.medium};
  height: 100%;
  width: 100%;
  :first-child {
    grid-column: 1 / 3;
  }
`;

const UploadInfo = styled.div`
  grid-column: 1/3;
  display: flex;
  gap: ${spacings.comfortable.small};
  height: fit-content;
  align-self: flex-end;
  align-items: center;
  background-color: ${colors.ui.background__info.hex};
  padding: ${spacings.comfortable.medium_small};
  border-radius: ${shape.button.borderRadius};
`;

const Description = styled(TextField)`
  grid-column: 1/3;
`;

const ReportLocationText = styled(Typography)`
  grid-column: 1/3;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.comfortable.medium};
  grid-column: 1/3;
`;

interface FeedbackFormInnerProps {
  selectedType: FeedbackEnum;
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | UrgencyOption | FileWithPath[] | boolean
  ) => void;
  handleSave: () => void;
  onClose: () => void;
  requestIsLoading: boolean;
}

const FeedbackFormInner: FC<FeedbackFormInnerProps> = ({
  selectedType,
  feedbackContent,
  updateFeedback,
  handleSave,
  onClose,
  requestIsLoading,
}) => {
  const [isWrongDomain, setIsWrongDomain] = useState(false);

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
      !isWrongDomain
    );
  }, [
    feedbackContent.title.length,
    feedbackContent.description.length,
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

      {selectedType === FeedbackEnum.BUG && (
        <>
          <Autocomplete
            options={Object.values(UrgencyOption)}
            id="feedback-severity"
            label="Severity"
            meta="optional"
            selectedOptions={[feedbackContent.urgency as UrgencyOption]}
            placeholder="Select error impact"
            onOptionsChange={(e: AutocompleteChanges<UrgencyOption>) =>
              updateFeedback('urgency', e.selectedItems[0])
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
                ? 'The provided URL must be from a equinor.com domain'
                : ''
            }
            onChange={handleOnUrlChange}
            onBlur={handleOnUrlBlur}
          />
        </>
      )}
      <Description
        id="feedback-description"
        label="Description"
        meta="Required"
        value={feedbackContent.description}
        placeholder={'Describe the ' + selectedType + '...'}
        rows={4}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          updateFeedback('description', e.currentTarget.value)
        }
        multiline
      />
      <UploadInfo>
        <Icon data={info_circle} />
        <Typography>
          Please make sure the uploaded files do not contain confidential or
          personal information
        </Typography>
      </UploadInfo>
      <UploadFile
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
      />
      <ReportLocationText>
        {selectedType === FeedbackEnum.BUG
          ? ' Bug reports gets sent to our Slack-channel, #amplify-feedback and to ServiceNow'
          : ' Bug reports gets sent to our Slack-channel, #amplify-feedback'}
      </ReportLocationText>
      <Actions>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!canSubmitFeedback || requestIsLoading}
        >
          Send
        </Button>
      </Actions>
    </Wrapper>
  );
};

export default FeedbackFormInner;
