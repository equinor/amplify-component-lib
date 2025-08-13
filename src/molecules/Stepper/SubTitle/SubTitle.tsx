import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';
import { SubStepIndicator } from 'src/molecules/Stepper/SubTitle/SubStepIndicator';
import { useStepper } from 'src/providers/StepperProvider';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  align-self: center;
  align-items: center;
`;

export const SubTitle: FC = () => {
  const { currentStep, currentSubStep: subStepIndex, steps } = useStepper();
  const currentSubSteps =
    'subSteps' in steps[currentStep] ? steps[currentStep].subSteps : [];
  const currentSubStep = currentSubSteps?.at(subStepIndex);

  if (
    (!currentSubStep && steps[currentStep].title === undefined) ||
    !currentSubSteps
  ) {
    return null;
  }

  if (steps[currentStep].title) {
    return (
      <Container>
        <Typography variant="h3">{steps[currentStep].title}</Typography>
        {steps[currentStep].description && (
          <Typography variant="caption">
            {steps[currentStep].description}
          </Typography>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Typography
        variant="caption"
        color={colors.text.static_icons__secondary.rgba}
      >
        {`${subStepIndex + 1} of ${currentSubSteps.length}`}
      </Typography>
      <Typography variant="h3">{currentSubStep?.title}</Typography>
      {currentSubStep?.description && (
        <Typography variant="caption">{currentSubStep.description}</Typography>
      )}
      <SubStepIndicator />
    </Container>
  );
};
