import { FC } from 'react';

import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';

import { UrgencyOption } from '../../Feedback.types';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/2;
`;
const Severity: FC = () => {
  const { serviceNowSuccess, feedbackContent, updateFeedback } =
    useFeedbackContext();
  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <Autocomplete
          options={Object.values(UrgencyOption)}
          id="feedback-severity"
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
      </LockedInputTooltip>
    </Container>
  );
};

export default Severity;
