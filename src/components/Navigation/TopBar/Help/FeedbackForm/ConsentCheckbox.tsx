import { ChangeEvent, FC } from 'react';
import { FileWithPath } from 'react-dropzone';

import { Checkbox, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import {
  FeedbackContentType,
  FeedbackEnum,
  SeverityOption,
} from './FeedbackForm.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.small};
`;

const Text = styled(Typography)`
  font-size: 14px;
`;

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
      <Checkbox
        data-testid="consent_checkbox"
        checked={feedbackContent.consent}
        onChange={handleOnChange}
      />
      <Text variant="body_short">
        {selectedType === FeedbackEnum.BUG
          ? 'I agree to my email being included with the report (and the service now report) in case there are any questions'
          : 'I agree to my email being included with the suggestion in case there are any questions'}
      </Text>
    </Container>
  );
};

export default ConsentCheckbox;
