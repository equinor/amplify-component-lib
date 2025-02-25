import { FC, useState } from 'react';

import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import {
  MyTutorialDto,
  useTutorials,
  useTutorialStepImage,
} from '@equinor/subsurface-app-management';

import { useTutorialHighlighting } from '../TutorialHighlightingProvider';
import { TUTORIAL_HIGHLIGHT_ANIMATION_PROPS } from '../TutorialHighlightingProvider.constants';
import { StepIndicator } from './StepIndicator';
import { colors, elevation, spacings } from 'src/atoms/style';
import {
  useTutorialPopoverPosition,
  UseTutorialPopoverPositionReturn,
} from 'src/providers/TutorialHighlightingProvider/TutorialPopover/hooks/useTutorialPopoverPosition';

import { motion, MotionProps } from 'framer-motion';
import styled, { css } from 'styled-components';

interface ContainerProps extends MotionProps {
  $highlightingElement: boolean;
  $highlightDirection: UseTutorialPopoverPositionReturn['highlightDirection'];
}

const Container = styled(motion(Card))<ContainerProps>`
  width: 360px;
  padding: ${spacings.medium};
  background: ${colors.infographic.primary__moss_green_13.rgba};
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  transition:
    top 400ms,
    left 400ms;
  box-shadow: ${elevation.raised};
  pointer-events: auto;
  > header {
    display: flex;
    gap: ${spacings.small};
    align-items: center;
  }
  > img {
    max-height: 170px;
    object-fit: contain;
  }
  ${({ $highlightingElement, $highlightDirection }) =>
    $highlightingElement &&
    css`
      transform: translateX(-50%);
      &:before {
        z-index: -1;
        content: '';
        width: 32px;
        height: 32px;
        background: ${colors.infographic.primary__moss_green_13.rgba};
        position: absolute;
        ${$highlightDirection === 'top' || $highlightDirection === 'bottom'
          ? css`
              left: 50%;
              ${$highlightDirection}: 0;
              transform: translate(-50%, 0) rotate(45deg);
            `
          : css`
              top: 50%;
              ${$highlightDirection}: 0;
              transform: translate(0, -50%) rotate(45deg);
            `}
      }
    `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.small};
  &:has(> :last-child:nth-child(3)) {
    > button:first-child {
      margin-right: auto;
    }
  }
`;

interface TutorialPopoverProps extends MyTutorialDto {
  isHighlighting: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export const TutorialPopover: FC<TutorialPopoverProps> = ({
  isHighlighting,
  id,
  top,
  left,
  width,
  height,
  name,
  steps,
}) => {
  const { customStepContent } = useTutorialHighlighting();
  const {
    activeTutorial,
    activeStep,
    skipTutorial,
    startTutorial,
    goToNextStep,
    goToPreviousStep,
  } = useTutorials();
  const { data: image } = useTutorialStepImage(
    activeTutorial?.steps.at(activeStep!)?.imgUrl ?? undefined
  );
  const [popoverSize, setPopoverSize] = useState<
    | {
        width: number;
        height: number;
      }
    | undefined
  >(undefined);
  const { style, highlightingElement, highlightDirection } =
    useTutorialPopoverPosition({
      top,
      left,
      width,
      height,
      popoverSize,
    });

  const handleSetPopoverSize = (element: HTMLDivElement | null) => {
    if (!element) {
      setPopoverSize(undefined);
      return;
    }
    setPopoverSize({
      width: element.clientWidth,
      height: element.clientHeight,
    });
  };

  const handleSkip = () => {
    skipTutorial(id);
  };

  const handleStart = () => {
    startTutorial(id);
  };

  if (
    activeStep !== undefined &&
    steps[activeStep].custom &&
    !customStepContent[steps[activeStep].id!]
  ) {
    throw new Error(
      `[TutorialHighlightingProvider]: Custom step content not found, tutorial ID: ${id}, step ID: ${steps[activeStep].id}`
    );
  }

  if (!highlightingElement && isHighlighting) return null;

  if (!activeTutorial || activeStep === undefined) {
    return (
      <Container
        ref={handleSetPopoverSize}
        style={{ ...style }}
        $highlightingElement={highlightingElement}
        $highlightDirection={highlightDirection}
        {...TUTORIAL_HIGHLIGHT_ANIMATION_PROPS}
      >
        <header>
          <Icon
            data={info_circle}
            color={colors.interactive.primary__resting.rgba}
          />
          <Typography variant="h6">{name}</Typography>
        </header>
        <Actions>
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button onClick={handleStart}>Start tour</Button>
        </Actions>
      </Container>
    );
  }

  return (
    <Container
      ref={handleSetPopoverSize}
      style={{
        ...style,
        width: steps[activeStep].custom ? 'auto' : undefined,
      }}
      $highlightDirection={highlightDirection}
      $highlightingElement={highlightingElement}
      {...TUTORIAL_HIGHLIGHT_ANIMATION_PROPS}
    >
      {steps[activeStep].custom ? (
        customStepContent[steps[activeStep].id!]
      ) : (
        <>
          <header>
            <Icon
              data={info_circle}
              color={colors.interactive.primary__resting.rgba}
            />
            <Typography variant="h6">{steps[activeStep]?.title}</Typography>
          </header>
          <Typography variant="body_short">
            {steps[activeStep]?.body}
          </Typography>
          {image ? <img src={image} alt={steps[activeStep].title!} /> : null}
        </>
      )}
      <Actions>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        <Button variant="ghost" onClick={handleSkip}>
          Cancel
        </Button>
        <Button onClick={goToNextStep}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Actions>
      <StepIndicator stepAmount={steps.length} />
    </Container>
  );
};
