import React, { FC, useEffect, useState } from 'react';

import { LinearProgress, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import string from '../../../../../utils/string';
import AnimatedCheckmark from '../../../../Feedback/AnimatedCheckmark';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  gap: ${spacings.comfortable.medium};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 370px;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
`;
const StyledTypography = styled(Typography)`
  span {
    text-transform: capitalize;
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.large};
`;

const TransferringContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
  width: 100%;
  align-items: center;
  padding: ${spacings.comfortable.large} 0;
`;

interface ChangingApplicationProps {
  applicationName: string;
  portal: boolean;
  onChangedApplication: () => void;
  finishedText: string;
}

const ChangingApplication: FC<ChangingApplicationProps> = ({
  applicationName,
  onChangedApplication,
  finishedText,
  portal,
}) => {
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setFinished(true);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        onChangedApplication();
      }, 4000);
    }
  }, [finished, onChangedApplication]);

  return (
    <Container>
      {!finished ? (
        <Loading>
          <Typography variant="h3">
            Transferring you to application.{'.'.repeat(progress / 35)}
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Loading>
      ) : (
        <TransferringContainer>
          <StyledTypography variant="h3">
            Transferring to <span>{string.capitalize(applicationName)}</span>
          </StyledTypography>

          <AnimatedCheckmark portal={portal} />
          <Typography variant="h6">{finishedText}</Typography>
        </TransferringContainer>
      )}
    </Container>
  );
};

export default ChangingApplication;
