import { FC, FormEvent } from 'react';

import { Typography } from '@equinor/eds-core-react';

import AmplifyTextField from '../../../../../../Inputs/AmplifyTextField';
import { FeedbackType } from '../../Feedback.types';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
`;

const Description: FC = () => {
  const { serviceNowSuccess, feedbackContent, selectedType, updateFeedback } =
    useFeedbackContext();

  return (
    <Container>
      {selectedType === FeedbackType.BUG && (
        <div>
          <Typography group="input" variant="text">
            What is the actual bug?
          </Typography>
          <Typography group="input" variant="text">
            What is expected results?
          </Typography>
          <Typography group="input" variant="text">
            How to reproduce the steps?
          </Typography>
          <Typography group="input" variant="text">
            Is there a workaround?
          </Typography>
        </div>
      )}
      <LockedInputTooltip show={serviceNowSuccess}>
        <AmplifyTextField
          id="feedback-description"
          label="Description"
          disabled={serviceNowSuccess}
          meta="Required"
          value={feedbackContent.description}
          placeholder={
            selectedType === FeedbackType.BUG
              ? 'Describe the bug, including expectations, reproductions steps, any workarounds...'
              : 'Describe the feature. What would be the value for you?'
          }
          rows={4}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            updateFeedback('description', e.currentTarget.value)
          }
          multiline
        />
      </LockedInputTooltip>
    </Container>
  );
};

export default Description;
