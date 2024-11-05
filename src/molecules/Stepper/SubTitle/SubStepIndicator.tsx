import { FC } from 'react';

import { animation, colors, shape, spacings } from 'src/atoms/style';
import { useStepper } from 'src/providers/StepperProvider';

import styled from 'styled-components';

interface ContainerProps {
  $amountOfSubSteps: number;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $amountOfSubSteps }) => $amountOfSubSteps},
    1fr
  );
  gap: ${spacings.small};
  width: 300px;
`;

interface LineProps {
  $currentIndex: number;
  $index: number;
}

const Line = styled.span<LineProps>`
  width: 100%;
  height: 5px;
  position: relative;
  background: ${colors.interactive.primary__hover_alt.rgba};
  border-radius: ${shape.rounded.borderRadius};
  overflow: hidden;
  &:after {
    content: '';
    background: ${colors.interactive.primary__resting.rgba};
    position: absolute;
    width: 100%;
    height: 100%;
    transition: left ${animation.transitionMS};
    left: ${({ $index, $currentIndex }) => ($currentIndex - $index) * 100}%;
  }
`;

export const SubStepIndicator: FC = () => {
  const { currentSubStep, steps, currentStep } = useStepper();
  const amountOfSubSteps = steps[currentStep].subSteps!.length;

  return (
    <Container $amountOfSubSteps={amountOfSubSteps}>
      {new Array(amountOfSubSteps).fill(null).map((_, index) => (
        <Line key={index} $index={index} $currentIndex={currentSubStep} />
      ))}
    </Container>
  );
};
