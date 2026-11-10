import { FC, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { check, warning_outlined } from '@equinor/eds-icons';

import {
  Container,
  Content,
  Description,
  Item,
  Line,
  MissingInputs,
  NumberAndLine,
  NumberContainer,
  StepButton,
  StepHeader,
  SubStepItem,
  SubSteps,
  TitleRow,
} from 'src/molecules/Stepper/SideStepper/SideStepper.styles';
import { Tooltip } from 'src/molecules/Tooltip/Tooltip';
import { useStepper } from 'src/providers/StepperProvider';

export interface SideStepperProps {
  /** Show plain circles without numbers and letters */
  plainCircles?: boolean;
}

interface HoverState {
  step: number;
  /** Undefined means the step itself is hovered, not one of its sub steps */
  subStep?: number;
}

/**
 * Vertical stepper menu with numbered steps and lettered sub steps.
 *
 * Uses the same StepperProvider as Stepper. The step `label` is used as the step title,
 * and `description` is revealed for the current step and on hover.
 * Hovering a step with sub steps highlights its first sub step, and clicking it navigates there.
 * Steps and sub steps with `missingInputs` show a warning chip with the amount.
 * Steps and sub steps show a check icon in their circle when completed, which defaults to
 * steps before the current one, and can be overridden with `completed`.
 *
 * @example
 * <StepperProvider steps={steps}>
 *   <SideStepper />
 * </StepperProvider>
 */
export const SideStepper: FC<SideStepperProps> = ({ plainCircles = false }) => {
  const {
    steps,
    currentStep,
    currentSubStep,
    setCurrentStep,
    setCurrentSubStep,
    isStepAtIndexDisabled,
  } = useStepper();
  const [hover, setHover] = useState<HoverState | undefined>(undefined);

  const hoverStep = (step: number, subStep?: number) =>
    setHover((prev) =>
      prev?.step === step && prev.subStep === subStep ? prev : { step, subStep }
    );

  const clearHover = () => setHover(undefined);

  const handleSelect = (stepIndex: number, subStepIndex?: number) => {
    if (isStepAtIndexDisabled(stepIndex)) return;
    setCurrentStep(stepIndex);
    const hasSubSteps = (steps[stepIndex].subSteps?.length ?? 0) > 0;
    if (hasSubSteps) setCurrentSubStep(subStepIndex ?? 0);
  };

  return (
    <Container>
      {steps.map((step, index) => {
        const subSteps = step.subSteps ?? [];
        const hasSubSteps = subSteps.length > 0;
        const isCurrent = index === currentStep;
        const isStepCompleted = step.completed ?? index < currentStep;
        const isDisabled = isStepAtIndexDisabled(index);
        const isStepHovered = !isDisabled && hover?.step === index;
        const hoveredSubStep = isStepHovered
          ? (hover?.subStep ?? 0)
          : undefined;

        return (
          <Item
            key={`${step.label}-${index}`}
            $hovered={isStepHovered && !hasSubSteps}
            onMouseEnter={hasSubSteps ? undefined : () => hoverStep(index)}
            onMouseLeave={hasSubSteps ? undefined : clearHover}
            onClick={hasSubSteps ? undefined : () => handleSelect(index)}
          >
            <NumberAndLine>
              <NumberContainer
                $filled={isCurrent || isStepCompleted}
                $size={24}
                $disabled={isDisabled}
              >
                {isStepCompleted ? (
                  <Icon data={check} size={16} />
                ) : (
                  !plainCircles && index + 1
                )}
              </NumberContainer>
              {(hasSubSteps || index < steps.length - 1) && (
                <Line $active={isCurrent || isStepHovered} />
              )}
            </NumberAndLine>
            <Content>
              <StepHeader
                onMouseEnter={() => hoverStep(index)}
                onMouseLeave={clearHover}
              >
                <Tooltip title={step.tooltip}>
                  <StepButton
                    type="button"
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-disabled={isDisabled}
                    onClick={
                      hasSubSteps ? () => handleSelect(index) : undefined
                    }
                    onFocus={() => hoverStep(index)}
                    onBlur={() => setHover(undefined)}
                  >
                    <TitleRow $size="step" $disabled={isDisabled}>
                      {step.label}
                      {!!step.missingInputs && (
                        <MissingInputs data-testid="missing-inputs">
                          <Icon data={warning_outlined} size={16} />
                          {step.missingInputs}
                        </MissingInputs>
                      )}
                    </TitleRow>
                    {step.description && (
                      <Description
                        $expanded={isCurrent || isStepHovered}
                        aria-hidden={!(isCurrent || isStepHovered)}
                      >
                        <span>{step.description}</span>
                      </Description>
                    )}
                  </StepButton>
                </Tooltip>
              </StepHeader>
              {hasSubSteps && (
                <SubSteps>
                  {subSteps.map((subStep, subIndex) => {
                    const isCurrentSubStep =
                      isCurrent && subIndex === currentSubStep;
                    const isSubStepCompleted =
                      subStep.completed ??
                      (index < currentStep ||
                        (isCurrent && subIndex < currentSubStep));
                    const expanded =
                      isCurrentSubStep ||
                      (isStepHovered &&
                        (hover?.subStep === undefined ||
                          hover.subStep === subIndex));

                    return (
                      <SubStepItem
                        key={`${subStep.title}-${subIndex}`}
                        $hovered={hoveredSubStep === subIndex}
                        onMouseEnter={() => hoverStep(index, subIndex)}
                        onMouseLeave={clearHover}
                      >
                        <NumberContainer
                          $filled={isCurrentSubStep || isSubStepCompleted}
                          $size={20}
                          $offset={2}
                          $disabled={isDisabled}
                        >
                          {isSubStepCompleted ? (
                            <Icon data={check} size={16} />
                          ) : (
                            !plainCircles && String.fromCharCode(65 + subIndex)
                          )}
                        </NumberContainer>
                        <StepButton
                          type="button"
                          aria-current={isCurrentSubStep ? 'step' : undefined}
                          aria-disabled={isDisabled}
                          onClick={() => handleSelect(index, subIndex)}
                          onFocus={() => hoverStep(index, subIndex)}
                          onBlur={() => setHover(undefined)}
                        >
                          <TitleRow $size="substep" $disabled={isDisabled}>
                            {subStep.title}
                            {!!subStep.missingInputs && (
                              <MissingInputs data-testid="missing-inputs">
                                <Icon data={warning_outlined} size={16} />
                                {subStep.missingInputs}
                              </MissingInputs>
                            )}
                          </TitleRow>
                          {subStep.description && (
                            <Description
                              $expanded={expanded}
                              aria-hidden={!expanded}
                            >
                              <span>{subStep.description}</span>
                            </Description>
                          )}
                        </StepButton>
                      </SubStepItem>
                    );
                  })}
                </SubSteps>
              )}
            </Content>
          </Item>
        );
      })}
    </Container>
  );
};
