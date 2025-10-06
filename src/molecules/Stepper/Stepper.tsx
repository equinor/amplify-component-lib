import { FC, ReactElement, useMemo } from 'react';

import { Step } from './Step/Step';
import { StepLine } from './StepLine';
import { spacings } from 'src/atoms/style';
import { SubTitle } from 'src/molecules/Stepper/SubTitle/SubTitle';
import { useStepper } from 'src/providers/StepperProvider';

import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.xx_large};
`;

interface ContainerProps {
  $stepAmount: number;
  $maxWidth?: string;
}
const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns:
    repeat(${({ $stepAmount }) => $stepAmount - 1}, auto 1fr)
    auto;
  grid-gap: ${spacings.small};
  align-items: center;
  width: 100%;
  ${({ $maxWidth }) => {
    if ($maxWidth) {
      return css`
        max-width: ${$maxWidth};
      `;
    }
    return '';
  }}
`;

export interface StepperProps {
  onlyShowCurrentStepLabel?: boolean;
  maxWidth?: string;
}

export const Stepper: FC<StepperProps> = ({
  onlyShowCurrentStepLabel = false,
  maxWidth,
}) => {
  const { steps, currentStep } = useStepper();

  const content = useMemo((): ReactElement[] => {
    const all: ReactElement[] = [];
    steps.forEach((step, index) => {
      all.push(
        <Step
          key={`step-${index}`}
          index={index}
          onlyShowCurrentStepLabel={onlyShowCurrentStepLabel}
        >
          {step.label}
        </Step>
      );

      if (index !== steps.length - 1) {
        all.push(
          <StepLine key={`step-line-${index}`} done={currentStep > index} />
        );
      }
    });
    return all;
  }, [currentStep, onlyShowCurrentStepLabel, steps]);

  return (
    <Wrapper>
      <Container
        $stepAmount={steps.length}
        $maxWidth={maxWidth}
        data-testid="stepper-container"
      >
        {content}
      </Container>
      <SubTitle />
    </Wrapper>
  );
};
