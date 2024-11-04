import { FC, useMemo, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { TypographyVariants } from '@equinor/eds-core-react/dist/types/components/Typography/Typography.tokens';

import { colors, spacings } from 'src/atoms/style';
import { StepIcon } from 'src/molecules/Stepper/Step/StepIcon';
import { useStepper } from 'src/providers/StepperProvider';

import styled from 'styled-components';

interface ContainerProps {
  $clickable: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
  white-space: nowrap;
  ${(props) =>
    props.$clickable &&
    `
    &:hover {
        cursor: pointer;
    }
  `}
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
  const { currentStep, setCurrentStep } = useStepper();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const textVariant = useMemo((): TypographyVariants => {
    if (index < currentStep) return 'body_short';
    return 'body_short_bold';
  }, [currentStep, index]);

  const textColor = useMemo((): string | undefined => {
    if (index > currentStep) return colors.interactive.disabled__text.rgba;
    return colors.text.static_icons__default.rgba;
  }, [currentStep, index]);

  const handleOnClick = () => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <Container
      data-testid="step"
      ref={(ref: HTMLDivElement | null) => {
        if (containerRef === null && ref !== null) {
          setContainerRef(ref);
        }
      }}
      style={
        containerRef !== null && !onlyShowCurrentStepLabel
          ? {
              width: `calc(${containerRef.clientWidth}px)`,
            }
          : undefined
      }
      $clickable={index < currentStep}
      onClick={handleOnClick}
    >
      <StepIcon index={index} />
      {(!onlyShowCurrentStepLabel || currentStep === index) && (
        <Typography variant={textVariant} color={textColor}>
          {children}
        </Typography>
      )}
    </Container>
  );
};

export default Step;
