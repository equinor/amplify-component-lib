import { FC, FocusEvent, FormEvent } from 'react';

import { EQUINOR_EMAIL_SUFFIX } from '../../Feedback.const';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';
import { TextField } from 'src/components/Inputs/TextField/TextField';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 2/3;
`;

const Url: FC = () => {
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
    console.log(value);
    console.log('include ', value.includes(EQUINOR_EMAIL_SUFFIX));
    console.log('length', value.length !== 0);
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

export default Url;
