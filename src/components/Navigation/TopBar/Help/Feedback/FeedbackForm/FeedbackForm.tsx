import { FC, useMemo } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import {
  Actions,
  Container,
  ContentWrapper,
  ReportLocationText,
  UploadInfo,
} from '../Feedback.styles';
import { FeedbackType } from '../Feedback.types';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import Description from './components/Description';
import Severity from './components/Severity';
import Title from './components/Title';
import UploadFile from './components/UploadFile/UploadFile';
import Url from './components/Url';

interface FeedbackFormProps {}

const FeedbackForm: FC<FeedbackFormProps> = () => {
  const {
    isWrongDomain,
    selectedType,
    resetForm,
    feedbackContent,
    onDialogClose,
    handleSave,
    requestIsLoading,
  } = useFeedbackContext();

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
    <ContentWrapper>
      <Container>
        <Title />
        {selectedType === FeedbackType.BUG && (
          <>
            <Severity />
            <Url />
          </>
        )}
        <Description />
        <UploadInfo>
          <Icon data={info_circle} />
          <Typography>
            Please make sure the uploaded files do not contain confidential or
            personal information
          </Typography>
        </UploadInfo>
        <UploadFile />
        <ReportLocationText>
          {selectedType === FeedbackType.BUG
            ? 'Bug reports are sent to Service Now and to the development team directly'
            : 'Feature suggestions are sent to the development team directly'}
        </ReportLocationText>
        <Actions>
          <Button variant="ghost" onClick={resetForm}>
            Reset
          </Button>

          <Button variant="ghost" onClick={onDialogClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!canSubmitFeedback || requestIsLoading}
          >
            Send
          </Button>
        </Actions>
      </Container>
    </ContentWrapper>
  );
};

export default FeedbackForm;
