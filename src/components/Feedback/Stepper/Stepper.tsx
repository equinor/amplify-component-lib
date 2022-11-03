import { FC, ReactElement, useMemo } from 'react';

import { tokens } from '@equinor/eds-tokens';

import Step from './Step';
import StepLine from './StepLine';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
  align-items: center;
`;

export interface StepperProps {
  current: number;
  setCurrent: (value: number) => void;
  steps: string[];
}

const Stepper: FC<StepperProps> = ({ current, setCurrent, steps }) => {
  const children = useMemo((): ReactElement[] => {
    const all: ReactElement[] = [];
    steps.forEach((step, index) => {
      all.push(
        <Step
          key={`step-${index}`}
          index={index}
          currentIndex={current}
          setCurrentIndex={setCurrent}
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
  }, [current, setCurrent, steps]);

  return <Container>{children}</Container>;
};

export default Stepper;
