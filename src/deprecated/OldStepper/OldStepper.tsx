import { FC, ReactElement, useMemo } from 'react';

import { OldStep } from './OldStep';
import OldStepLine from './OldStepLine';
import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

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
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth}`}
`;

interface OldStepperProps {
  current: number;
  setCurrent: (value: number) => void;
  steps: string[];
  onlyShowCurrentStepLabel?: boolean;
  maxWidth?: string;
}

/**
 * @deprecated Use the new Stepper + StepperProvider component instead
 */
export const OldStepper: FC<OldStepperProps> = ({
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
        <OldStep
          key={`step-${index}`}
          index={index}
          currentIndex={current}
          setCurrentIndex={setCurrent}
          onlyShowCurrentStepLabel={onlyShowCurrentStepLabel}
        >
          {step}
        </OldStep>
      );

      if (index !== steps.length - 1) {
        all.push(
          <OldStepLine key={`step-line-${index}`} done={current > index} />
        );
      }
    });
    return all;
  }, [current, onlyShowCurrentStepLabel, setCurrent, steps]);

  return (
    <Container
      $stepAmount={steps.length}
      $maxWidth={maxWidth}
      data-testid="stepper-container"
    >
      {children}
    </Container>
  );
};
