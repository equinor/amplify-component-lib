import { FC } from 'react';

import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { UrgencyOption } from '../../Feedback.types';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import LockedInputTooltip from './LockedInputTooltip';

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
const Severity: FC = () => {
  const { serviceNowSuccess, feedbackContent, updateFeedback } =
    useFeedbackContext();
  return (
    <Container>
      <LockedInputTooltip show={serviceNowSuccess}>
        <AutocompleteWrapper>
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
        </AutocompleteWrapper>
      </LockedInputTooltip>
    </Container>
  );
};

export default Severity;
