import { FC, ReactElement, useMemo } from 'react';

import { Step } from './Step/Step';
import { StepLine } from './StepLine';
import { spacings } from 'src/atoms/style';
import { SubTitle } from 'src/molecules/Stepper/SubTitle/SubTitle';
import { useStepper } from 'src/providers/StepperProvider';

import styled, { css } from 'styled-components';

/**
 * Stepper component that displays a multi-step process with visual progress indication.
 *
 * The Stepper component renders step labels with connecting lines and displays
 * the current step's content (title and description) via the SubTitle component.
 * SubTitle content is available when a step has a `title` or `subSteps`.
 * It relies on the StepperProvider for state management and step configuration.
 *
 * @component
 * @example
 * // Basic usage within a StepperProvider
 * <StepperProvider steps={steps}>
 *   <Stepper />
 * </StepperProvider>
 *
 * @example
 * // Only show the current step's label
 * <Stepper onlyShowCurrentStepLabel />
 *
 * @example
 * // Hide the content section
 * <Stepper hideContent />
 *
 * @example
 * // Allow users to jump to any step
 * <Stepper allowJumpingAhead />
 *
 * @param props - The component props
 * @returns The rendered Stepper component
 */

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

/**
 * Props for the Stepper component
 * @interface StepperProps
 */
export interface StepperProps {
  /** If true, only the current step's label is displayed, hiding others */
  onlyShowCurrentStepLabel?: boolean;
  /** Maximum width of the stepper container */
  maxWidth?: string;
  /** If true, hides the SubTitle content section below the stepper (used when steps provide `title` or `subSteps`) */
  hideContent?: boolean;
  /** If true, allows users to click on steps ahead of the current step to jump forward and renders those steps as interactive */
  allowJumpingAhead?: boolean;
}

export const Stepper: FC<StepperProps> = ({
  onlyShowCurrentStepLabel = false,
  maxWidth,
  hideContent = false,
  allowJumpingAhead = false,
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
          allowJumpingAhead={allowJumpingAhead}
        >
          {step.label}
        </Step>
      );

      if (index !== steps.length - 1) {
        all.push(
          <StepLine
            key={`step-line-${index}`}
            done={currentStep > index || allowJumpingAhead}
          />
        );
      }
    });
    return all;
  }, [currentStep, onlyShowCurrentStepLabel, steps, allowJumpingAhead]);

  return (
    <Wrapper>
      <Container
        $stepAmount={steps.length}
        $maxWidth={maxWidth}
        data-testid="stepper-container"
      >
        {content}
      </Container>
      {!hideContent && <SubTitle />}
    </Wrapper>
  );
};
