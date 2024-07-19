import { FC } from 'react';

import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { UrgencyOption } from 'src/organisms/TopBar/Resources/Feedback/Feedback.types';
import { LockedInputTooltip } from 'src/organisms/TopBar/Resources/Feedback/FeedbackForm/LockedInputTooltip';
import { useFeedbackContext } from 'src/organisms/TopBar/Resources/Feedback/hooks/useFeedbackContext';

import styled from 'styled-components';
const { colors } = tokens;

const Container = styled.div`
  grid-column: 1/2;
`;

const AutocompleteWrapper = styled.div`
  * {
    color: ${colors.text.static_icons__default.rgba};
  }
`;

export const Severity: FC = () => {
  const { serviceNowSuccess, feedbackContent, updateFeedback } =
    useFeedbackContext();
  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <AutocompleteWrapper>
          <Autocomplete
            options={Object.values(UrgencyOption)}
            id="feedback-severity"
            data-testid="feedback-severity-input"
            label="Severity"
            meta="optional"
            disabled={serviceNowSuccess}
            selectedOptions={[feedbackContent.urgency as UrgencyOption]}
            placeholder="Select error impact"
            onOptionsChange={(e: AutocompleteChanges<UrgencyOption>) =>
              updateFeedback('urgency', e.selectedItems[0])
            }
            autoWidth
          />
        </AutocompleteWrapper>
      </LockedInputTooltip>
    </Container>
  );
};

export default Severity;
