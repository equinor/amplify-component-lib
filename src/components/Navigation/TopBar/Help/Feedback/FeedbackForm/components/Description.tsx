import { FC, FormEvent, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackType } from '../../Feedback.types';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';
import AmplifyTextField from 'src/components/Inputs/AmplifyTextField';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Container = styled.div`
  grid-column: 1/3;
  display: flex;
  gap: ${spacings.comfortable.medium};
  flex-direction: column;
`;

const Description: FC = () => {
  const { serviceNowSuccess, feedbackContent, selectedType, updateFeedback } =
    useFeedbackContext();

  const questionColor = useMemo(() => {
    if (serviceNowSuccess) {
      return colors.interactive.disabled__text.hex;
    }
    return colors.text.static_icons__default.hex;
  }, [serviceNowSuccess]);

  return (
    <Container>
      {selectedType === FeedbackType.BUG && (
        <div>
          <Typography group="input" variant="text" color={questionColor}>
            What is the actual bug?
          </Typography>
          <Typography group="input" variant="text" color={questionColor}>
            What is expected results?
          </Typography>
          <Typography group="input" variant="text" color={questionColor}>
            How to reproduce the steps?
          </Typography>
          <Typography group="input" variant="text" color={questionColor}>
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
