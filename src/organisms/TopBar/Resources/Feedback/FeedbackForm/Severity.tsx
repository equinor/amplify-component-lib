import { FC } from 'react';

import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { UrgencyOption } from 'src/organisms/TopBar/Resources/Feedback/Feedback.types';
import { LockedInputTooltip } from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/LockedInputTooltip';
import { useFeedbackContext } from 'src/organisms/TopBar/Resources/Feedback/hooks/useFeedbackContext';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/2;
`;

const ITEMS = Object.values(UrgencyOption).map((option) => ({
  value: option,
  label: option,
}));

export const Severity: FC = () => {
  const { serviceNowSuccess, feedbackContent, updateFeedback } =
    useFeedbackContext();

  const value = feedbackContent.urgency
    ? {
        value: feedbackContent.urgency as UrgencyOption,
        label: feedbackContent.urgency as UrgencyOption,
      }
    : undefined;

  console.log(value);

  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <SingleSelect
          items={ITEMS}
          label="Severity"
          meta="optional"
          clearable={false}
          disabled={serviceNowSuccess}
          value={value}
          placeholder="Select error impact"
          onSelect={(newValue) => {
            if (!newValue) return;

            updateFeedback('urgency', newValue.value);
          }}
        />
      </LockedInputTooltip>
    </Container>
  );
};

export default Severity;
