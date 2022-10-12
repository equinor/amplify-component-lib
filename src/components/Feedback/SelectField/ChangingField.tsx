import React, { FC, useEffect, useState } from 'react';

import { LinearProgress, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled, { keyframes } from 'styled-components';

const { spacings, colors } = tokens;

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
  min-height: calc(100vh - (${spacings.comfortable.xxx_large} * 4));
  width: 100%;
  max-width: 370px;
`;

const StyledTypography = styled(Typography)`
  span {
    text-transform: capitalize;
  }
`;

const animateCheckmark = keyframes`
  from {
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
  }
  to {
    stroke-dasharray: 130;
    stroke-dashoffset: 260;
  }
`;

const AnimatedCheckMarkIcon = styled.div`
  padding-top: calc(24px * 3);
  padding-bottom: calc(24px * 3);
  svg {
    width: 24px;
    height: 24px;
    transform: scale(6);
  }
  path {
    fill: transparent;
    stroke-width: 2;
    stroke: ${colors.interactive.primary__resting.hex};
    animation: ${animateCheckmark} 1.5s;
  }
`;

interface ChangingFieldProps {
  fieldName: string;
  onChangedField: () => void;
  finishedText: string;
}

const ChangingField: FC<ChangingFieldProps> = ({
  fieldName,
  onChangedField,
  finishedText,
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
        onChangedField();
      }, 4000);
    }
  }, [finished, onChangedField]);

  return (
    <Container>
      {!finished ? (
        <>
          <Typography variant="h3">
            Changing field.{'.'.repeat(progress / 35)}
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </>
      ) : (
        <>
          <StyledTypography variant="h3">
            Changed to <span>{fieldName}</span>
          </StyledTypography>
          <AnimatedCheckMarkIcon>
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22L18 28L30 16M42 21.5C42 32.8218 32.8218 42 21.5 42C10.1782 42 1 32.8218 1 21.5C1 10.1782 10.1782 1 21.5 1C32.8218 1 42 10.1782 42 21.5Z" />
            </svg>
          </AnimatedCheckMarkIcon>
          <Typography variant="h6">{finishedText}</Typography>
        </>
      )}
    </Container>
  );
};

export default ChangingField;
