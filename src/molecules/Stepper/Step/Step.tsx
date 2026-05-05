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
  allowJumpingAhead?: boolean;
}

export const Step: FC<StepProps> = ({
  index,
  onlyShowCurrentStepLabel = false,
  children,
  allowJumpingAhead = false,
}) => {
  const { currentStep, setCurrentStep, isStepAtIndexDisabled } = useStepper();

  const isDisabled = isStepAtIndexDisabled(index);

  const textVariant = useMemo((): TypographyVariants => {
    if (index < currentStep) return 'body_short';
    if (allowJumpingAhead && index > currentStep) return 'body_short_bold';
    return 'body_short_bold';
  }, [currentStep, index, allowJumpingAhead]);

  const textColor = useMemo((): string | undefined => {
    if (isDisabled) return colors.interactive.disabled__text.rgba;
    if (index > currentStep && !allowJumpingAhead)
      return colors.interactive.disabled__text.rgba;
    return colors.text.static_icons__default.rgba;
  }, [currentStep, index, isDisabled, allowJumpingAhead]);

  const isClickable = useMemo((): boolean => {
    if (isDisabled) return false;
    if (index < currentStep) return true;
    if (allowJumpingAhead && index > currentStep) return true;
    return false;
  }, [index, currentStep, isDisabled, allowJumpingAhead]);

  const handleOnClick = () => {
    if (isClickable) {
      setCurrentStep(index);
    }
  };

  return (
    <Container
      data-testid="step"
      $clickable={isClickable}
      onClick={handleOnClick}
      $disabled={isDisabled}
      aria-disabled={isDisabled}
      role="button"
    >
      <StepIcon
        index={index}
        disabled={isDisabled}
        allowJumpingAhead={allowJumpingAhead}
      />
      {(!onlyShowCurrentStepLabel || currentStep === index) && (
        <Typography variant={textVariant} color={textColor}>
          {children}
        </Typography>
      )}
    </Container>
  );
};

export default Step;
