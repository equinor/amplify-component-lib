import { FC, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { TypographyVariants } from '@equinor/eds-core-react/dist/types/components/Typography/Typography.tokens';

import { colors, spacings } from 'src/atoms/style';
import { StepIcon } from 'src/molecules/Stepper/Step/StepIcon';
import { useStepper } from 'src/providers/StepperProvider';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $clickable: boolean;
  $disabled?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
  white-space: nowrap;
  ${({ $disabled, $clickable }) => {
    if ($disabled) {
      return css`
        &:hover {
          cursor: not-allowed;
        }
      `;
    }

    if ($clickable) {
      return css`
        &:hover {
          cursor: pointer;
        }
      `;
    }
    return '';
  }}
`;

interface StepProps {
  index: number;
  onlyShowCurrentStepLabel?: boolean;
  children?: string;
}

export const Step: FC<StepProps> = ({
  index,
  onlyShowCurrentStepLabel = false,
  children,
}) => {
  const { currentStep, setCurrentStep, isStepAtIndexDisabled } = useStepper();

  const isDisabled = isStepAtIndexDisabled(index);

  const textVariant = useMemo((): TypographyVariants => {
    if (index < currentStep) return 'body_short';
    return 'body_short_bold';
  }, [currentStep, index]);

  const textColor = useMemo((): string | undefined => {
    if (index > currentStep || isDisabled)
      return colors.interactive.disabled__text.rgba;
    return colors.text.static_icons__default.rgba;
  }, [currentStep, index, isDisabled]);

  const handleOnClick = () => {
    if (index < currentStep && !isDisabled) {
      setCurrentStep(index);
    }
  };

  return (
    <Container
      data-testid="step"
      $clickable={index < currentStep}
      onClick={handleOnClick}
      $disabled={isDisabled}
      aria-disabled={isDisabled}
      role="button"
    >
      <StepIcon index={index} disabled={isDisabled} />
      {(!onlyShowCurrentStepLabel || currentStep === index) && (
        <Typography variant={textVariant} color={textColor}>
          {children}
        </Typography>
      )}
    </Container>
  );
};

export default Step;
