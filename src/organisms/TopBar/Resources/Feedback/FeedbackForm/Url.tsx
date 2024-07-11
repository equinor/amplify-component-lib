import { FC, FocusEvent, FormEvent } from 'react';

import { TextField } from 'src/molecules/TextField/TextField';
import { EQUINOR_EMAIL_SUFFIX } from 'src/organisms/TopBar/Resources/Feedback/Feedback.const';
import { LockedInputTooltip } from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/LockedInputTooltip';
import { useFeedbackContext } from 'src/organisms/TopBar/Resources/Feedback/hooks/useFeedbackContext';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 2/3;
`;

export const Url: FC = () => {
  const {
    serviceNowSuccess,
    feedbackContent,
    updateFeedback,
    isWrongDomain,
    setIsWrongDomain,
  } = useFeedbackContext();

  const handleOnUrlChange = (e: FormEvent<HTMLInputElement>) => {
    updateFeedback('url', e.currentTarget.value);
    if (e.currentTarget.value === '') {
      setIsWrongDomain(false);
    } else if (
      isWrongDomain &&
      e.currentTarget.value.includes(EQUINOR_EMAIL_SUFFIX)
    ) {
      setIsWrongDomain(false);
    }
  };

  const handleOnUrlBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value.includes(EQUINOR_EMAIL_SUFFIX) && value.length !== 0) {
      setIsWrongDomain(true);
    }
  };

  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <TextField
          id="feedback-url"
          label="URL"
          disabled={serviceNowSuccess}
          meta="optional"
          value={feedbackContent.url}
          placeholder="URL of error location"
          variant={isWrongDomain ? 'error' : undefined}
          helperText={
            isWrongDomain
              ? `The provided URL must be from a ${EQUINOR_EMAIL_SUFFIX} domain`
              : ''
          }
          onChange={handleOnUrlChange}
          onBlur={handleOnUrlBlur}
        />
      </LockedInputTooltip>
    </Container>
  );
};
