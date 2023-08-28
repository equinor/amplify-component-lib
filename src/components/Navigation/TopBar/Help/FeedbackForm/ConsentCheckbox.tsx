import { ChangeEvent, FC } from 'react';
import { FileWithPath } from 'react-dropzone';

import { Checkbox, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackContentType, FeedbackEnum } from './FeedbackForm.types';
import { SeverityOption } from './FeedbackFormInner';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.small};
`;

const StyledCheckbox = styled(Checkbox)``;
const ConsentText = styled(Typography)``;

interface ConsentCheckboxProps {
  selectedType: FeedbackEnum;
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => void;
}

const ConsentCheckbox: FC<ConsentCheckboxProps> = ({
  feedbackContent,
  updateFeedback,
  selectedType,
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFeedback('consent', e.target.checked);
  };

  return (
    <Container>
      <StyledCheckbox
        data-testid="consent_checkbox"
        checked={feedbackContent.consent}
        onChange={handleOnChange}
      />
      <ConsentText variant="body_short">
        {selectedType === FeedbackEnum.ERROR
          ? 'I agree to my email being used in the service now report'
          : 'I agree to my email being included in the inquiry in case there are any questions'}
      </ConsentText>
    </Container>
  );
};

export default ConsentCheckbox;
