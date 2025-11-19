import { FC, useEffect, useState } from 'react';

import { Button } from '@equinor/eds-core-react';

import { useFeedbackContext } from '../hooks/useFeedbackContext';
import { AnimateChangeInHeight } from './AnimateChangeInHeight';
import { ResponseStatus } from './ResponseStatus';
import { Success } from './Success';
import { spacings } from 'src/atoms/style';
import { ContentWrapper } from 'src/organisms/TopBar/Resources/Feedback/Feedback.styles';

import { motion } from 'motion/react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  display: flex;
  gap: ${spacings.large};
  height: auto;
  flex-direction: column;
  button {
    align-self: end;
  }
`;

export const ResponsePage: FC = () => {
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const {
    handleResponsePageOnClose,
    requestIsLoading,
    resetForm,
    requestHasError,
    relevantRequestsHaveBeenSuccess,
  } = useFeedbackContext();

  useEffect(() => {
    if (!showSuccessPage && relevantRequestsHaveBeenSuccess) {
      setTimeout(() => {
        setShowSuccessPage(true);
        resetForm();
      }, 1000);
    }
  }, [relevantRequestsHaveBeenSuccess, resetForm, showSuccessPage]);

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
