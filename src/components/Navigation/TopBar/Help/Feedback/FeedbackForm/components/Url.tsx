import { FC, FocusEvent, FormEvent } from 'react';

import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';
import AmplifyTextField from 'src/components/Inputs/AmplifyTextField';

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
      e.currentTarget.value.includes('.equinor.com')
    ) {
      setIsWrongDomain(false);
    }
  };

  const handleOnUrlBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!value.includes('.equinor.com') && value.length !== 0) {
      setIsWrongDomain(true);
    }
  };

  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <AmplifyTextField
          id="feedback-url"
          label="URL"
          disabled={serviceNowSuccess}
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
      </LockedInputTooltip>
    </Container>
  );
};

export default Url;
