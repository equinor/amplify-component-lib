import { FC, useEffect, useState } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ContentWrapper } from '../Feedback.styles';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import { AnimateChangeInHeight } from './AnimateChangeInHeight';
import ResponseStatus from './ResponseStatus';
import Success from './Success';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled(motion.div)`
  display: flex;
  gap: ${spacings.comfortable.large};
  height: auto;
  flex-direction: column;
  button {
    align-self: end;
  }
`;

const ResponsePage: FC = () => {
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const {
    handleResponsePageOnClose,
    requestIsLoading,
    resetForm,
    requestHasError,
    shouldCloseDialog,
  } = useFeedbackContext();

  useEffect(() => {
    if (!showSuccessPage && shouldCloseDialog) {
      setTimeout(() => {
        setShowSuccessPage(true);
        resetForm();
      }, 1000);
    }
  }, [shouldCloseDialog, resetForm, showSuccessPage]);

  return (
    <ContentWrapper>
      <Container>
        <AnimateChangeInHeight>
          {showSuccessPage ? <Success /> : <ResponseStatus />}
        </AnimateChangeInHeight>
        <Button disabled={requestIsLoading} onClick={handleResponsePageOnClose}>
          {requestHasError ? 'Retry' : 'Close'}
        </Button>
      </Container>
    </ContentWrapper>
  );
};

export default ResponsePage;
