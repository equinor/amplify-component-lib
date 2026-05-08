import { FC } from 'react';

import { BugSeverity } from '@equinor/subsurface-app-management';

import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { SORTED_BUG_SEVERITY_OPTIONS } from 'src/organisms/TopBar/Resources/Feedback/Feedback.const';
import { getUrgencyDisplayText } from 'src/organisms/TopBar/Resources/Feedback/Feedback.utils';
import { LockedInputTooltip } from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/LockedInputTooltip';
import { useFeedbackContext } from 'src/organisms/TopBar/Resources/Feedback/hooks/useFeedbackContext';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/2;
`;

const ITEMS = SORTED_BUG_SEVERITY_OPTIONS.map((option) => ({
  value: option,
  label: getUrgencyDisplayText(option),
}));

export const Severity: FC = () => {
  const { serviceNowSuccess, feedbackContent, updateFeedback } =
    useFeedbackContext();

  const value = feedbackContent.urgency
    ? {
        value: feedbackContent.urgency as BugSeverity,
        label: getUrgencyDisplayText(feedbackContent.urgency),
      }
    : undefined;

  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <SingleSelect
          items={ITEMS}
          label="Severity"
          meta="optional"
          clearable
          disabled={serviceNowSuccess}
          value={value}
          placeholder="Select error impact"
          onSelect={(newValue) => {
            updateFeedback('urgency', newValue?.value);
          }}
        />
      </LockedInputTooltip>
    </Container>
  );
};
