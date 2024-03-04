import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { CustomTutorialStep, GenericTutorialStep } from 'src/api';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const StepContainer = styled.div`
  position: relative;
  transform: translate(0, -65%);
  display: flex;
  gap: ${spacings.comfortable.small};
  margin-bottom: -${spacings.comfortable.small};
  margin-top: ${spacings.comfortable.medium_small};
  width: 100%;
  justify-content: center;
`;

interface StepIndicatorProps {
  $active: boolean;
  $num: number;
  $activeNum: number;
}

const StepIndicator = styled.div<StepIndicatorProps>`
  width: ${spacings.comfortable.medium};
  height: ${spacings.comfortable.x_small};
  border-radius: 24px;
  transition: all 300ms;
  background: linear-gradient(
    90deg,
    ${colors.interactive.primary__resting.rgba} 49%,
    ${colors.interactive.primary__hover_alt.rgba} 51%
  );

  background-size:
    400% 10px,
    400%;
  ${(props) =>
    props.$active
      ? 'background-position: 0%'
      : `background-position: ${
          props.$num < props.$activeNum ? '-50' : '100'
        }%`}
`;

interface TutorialStepIndicatorProps {
  steps: (GenericTutorialStep | CustomTutorialStep)[];
  currentStep: number;
}

const TutorialStepIndicator: FC<TutorialStepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <StepContainer>
      {steps.map((item, index) => {
        return (
          <StepIndicator
            key={item.key ?? item.title}
            $active={index === currentStep}
            $activeNum={currentStep}
            $num={index}
          />
        );
      })}
    </StepContainer>
  );
};

export default TutorialStepIndicator;
