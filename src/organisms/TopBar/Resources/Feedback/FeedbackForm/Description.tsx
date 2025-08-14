import { FC, FormEvent, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { LockedInputTooltip } from './LockedInputTooltip';
import { spacings } from 'src/atoms/style';
import { TextField } from 'src/molecules/TextField/TextField';
import { FeedbackType } from 'src/organisms/TopBar/Resources/Feedback/Feedback.types';
import { useFeedbackContext } from 'src/organisms/TopBar/Resources/Feedback/hooks/useFeedbackContext';

import styled from 'styled-components';

const { colors } = tokens;

const Container = styled.div`
  grid-column: 1/3;
  display: flex;
  gap: ${spacings.medium};
  flex-direction: column;
  textarea {
    color: ${colors.text.static_icons__default.rgba};
  }
`;

export const Description: FC = () => {
  const { serviceNowSuccess, feedbackContent, selectedType, updateFeedback } =
    useFeedbackContext();

  const questionColor = useMemo(() => {
    if (serviceNowSuccess) {
      return colors.interactive.disabled__text.rgba;
    }
    return colors.text.static_icons__default.rgba;
  }, [serviceNowSuccess]);

  return (
    <Container>
      {selectedType === FeedbackType.BUG && (
        <div>
          <Typography group="input" variant="text" color={questionColor}>
            What is the specific bug?
          </Typography>
          <Typography group="input" variant="text" color={questionColor}>
            What are the expected results?
          </Typography>
          <Typography group="input" variant="text" color={questionColor}>
            How can we reproduce the issue?
          </Typography>
          <Typography group="input" variant="text" color={questionColor}>
            Is there a known workaround?
          </Typography>
        </div>
      )}
      <LockedInputTooltip show={serviceNowSuccess}>
        <TextField
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
