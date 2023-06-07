import { FC, ReactElement, useMemo } from 'react';

import { tokens } from '@equinor/eds-tokens';

import Step from './Step';
import StepLine from './StepLine';

import styled from 'styled-components';

const { spacings } = tokens;
interface ContainerProps {
  stepAmount: number;
  maxWidth?: string;
}
const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(${({ stepAmount }) => stepAmount - 1}, auto 1fr) auto;
  grid-gap: ${spacings.comfortable.small};
  align-items: center;
  width: 100%;
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`}
`;

export interface StepperProps {
  current: number;
  setCurrent: (value: number) => void;
  steps: string[];
  onlyShowCurrentStepLabel?: boolean;
  maxWidth?: string;
}

const Stepper: FC<StepperProps> = ({
  current,
  setCurrent,
  steps,
  onlyShowCurrentStepLabel = false,
  maxWidth,
}) => {
  const children = useMemo((): ReactElement[] => {
    const all: ReactElement[] = [];
    steps.forEach((step, index) => {
      all.push(
        <Step
          key={`step-${index}`}
          index={index}
          currentIndex={current}
          setCurrentIndex={setCurrent}
          onlyShowCurrentStepLabel={onlyShowCurrentStepLabel}
        >
          {step}
        </Step>
      );

      if (index !== steps.length - 1) {
        all.push(
          <StepLine key={`step-line-${index}`} done={current > index} />
        );
      }
    });
    return all;
  }, [current, onlyShowCurrentStepLabel, setCurrent, steps]);

  return (
    <Container
      stepAmount={steps.length}
      maxWidth={maxWidth}
      data-testid="stepper-container"
    >
      {children}
    </Container>
  );
};

export default Stepper;
