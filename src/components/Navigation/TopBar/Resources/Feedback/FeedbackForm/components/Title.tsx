import { FC, FormEvent } from 'react';

import AmplifyTextField from '../../../../../../Inputs/AmplifyTextField';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/3;
`;

const Title: FC = () => {
  const { serviceNowSuccess, feedbackContent, updateFeedback } =
    useFeedbackContext();
  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <AmplifyTextField
          id="feedback-title"
          label="Title"
          meta="Required"
          disabled={serviceNowSuccess}
          value={feedbackContent.title}
          placeholder="Write a title..."
          onChange={(e: FormEvent<HTMLInputElement>) =>
            updateFeedback('title', e.currentTarget.value)
          }
        />
      </LockedInputTooltip>
    </Container>
  );
};

export default Title;
