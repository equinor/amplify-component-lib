import { FC, useMemo } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import {
  Actions,
  Container,
  ContentWrapper,
  LockedFormWarning,
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

const FeedbackForm: FC = () => {
  const {
    isWrongDomain,
    selectedType,
    resetForm,
    feedbackContent,
    onDialogClose,
    serviceNowSuccess,
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
        {serviceNowSuccess && (
          <LockedFormWarning>
            <Icon data={info_circle} />
            <Typography>
              The report has already been sent to service now, and part of the
              form is locked, so you can retry sending it to the development
              team. Otherwise you can reset the form with the &quot;Reset
              form&quot; button in the bottom left corner.
            </Typography>
          </LockedFormWarning>
        )}
        <Actions>
          <Button
            variant="ghost"
            onClick={resetForm}
            data-testid="reset-form-button"
          >
            Reset form
          </Button>
          <div>
            <Button variant="ghost" onClick={onDialogClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!canSubmitFeedback || requestIsLoading}
              data-testid="submit-button"
            >
              {serviceNowSuccess ? 'Send again' : 'Send'}
            </Button>
          </div>
        </Actions>
      </Container>
    </ContentWrapper>
  );
};

export default FeedbackForm;
