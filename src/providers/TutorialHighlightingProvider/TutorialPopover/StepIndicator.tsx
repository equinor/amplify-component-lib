import { FC } from 'react';

import { useTutorials } from '@equinor/subsurface-app-management';

import { animation, colors, shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: ${spacings.x_small};
`;

interface StepProps {
  $index: number;
  $activeIndex: number;
}

const Step = styled.span<StepProps>`
  overflow: hidden;
  height: 4px;
  width: 100%;
  background: ${colors.infographic.primary__moss_green_34.rgba};
  border-radius: ${shape.rounded.borderRadius};
  position: relative;
  &:after {
    content: '';
    position: absolute;
    background: ${colors.interactive.primary__resting.rgba};
    width: 100%;
    height: 100%;
    transition: left ${animation.transitionMS};
    left: calc(${({ $index, $activeIndex }) => ($activeIndex - $index) * 100}%);
  }
`;

interface StepIndicatorProps {
  stepAmount: number;
}

export const StepIndicator: FC<StepIndicatorProps> = ({ stepAmount }) => {
  const { activeStep } = useTutorials();

  return (
    <Container style={{ gridTemplateColumns: `repeat(${stepAmount}, 1fr)` }}>
      {Array.from({ length: stepAmount }).map((_, index) => (
        <Step key={index} $index={index} $activeIndex={activeStep!} />
      ))}
    </Container>
  );
};
