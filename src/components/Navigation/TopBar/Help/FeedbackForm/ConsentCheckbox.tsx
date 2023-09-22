import { ChangeEvent, FC } from 'react';
import { FileWithPath } from 'react-dropzone';

import { Checkbox, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackContentType, SeverityOption } from './FeedbackForm.types';

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
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => void;
}

const ConsentCheckbox: FC<ConsentCheckboxProps> = ({
  feedbackContent,
  updateFeedback,
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFeedback('anonymous', e.target.checked);
  };

  return (
    <Container>
      <Checkbox
        data-testid="opt_out_checkbox"
        checked={feedbackContent.anonymous}
        onChange={handleOnChange}
      />
      <Text variant="body_short">Suggest this feature anonymously</Text>
    </Container>
  );
};

export default ConsentCheckbox;
