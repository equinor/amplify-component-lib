import { FC, RefObject, useState } from 'react';

import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import {
  MyTutorialDto,
  useTutorials,
  useTutorialStepImage,
} from '@equinor/subsurface-app-management';

import { useTutorialHighlighting } from '../TutorialHighlightingProvider';
import { TUTORIAL_HIGHLIGHT_ANIMATION_PROPS } from '../TutorialHighlightingProvider.constants';
import {
  useTutorialPopoverPosition,
  UseTutorialPopoverPositionReturn,
} from './hooks/useTutorialPopoverPosition';
import { StepIndicator } from './StepIndicator';
import { colors, elevation, spacings } from 'src/atoms/style';

import { motion, MotionProps } from 'motion/react';
import styled, { css } from 'styled-components';

function caretPositionToCss(
  caretPosition: UseTutorialPopoverPositionReturn['caretPosition']
) {
  switch (caretPosition) {
    case 'top':
      return css`
        left: 50%;
        top: 0;
        transform: translate(-50%, 0) rotate(45deg);
      `;
    case 'top-right':
      return css`
        right: 0;
        top: 0;
        transform: translate(-50%, 0) rotate(45deg);
      `;
    case 'right':
      return css`
        right: 0;
        top: 50%;
        transform: translate(0, -50%) rotate(45deg);
      `;
    case 'bottom-right':
      return css`
        right: 0;
        bottom: 0;
        transform: translate(-50%, 0) rotate(45deg);
      `;
    case 'bottom':
      return css`
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0) rotate(45deg);
      `;
    case 'bottom-left':
      return css`
        left: 24px;
        bottom: 0;
        transform: translate(-50%, 0) rotate(45deg);
      `;
    case 'left':
      return css`
        left: 0;
        top: 50%;
        transform: translate(0, -50%) rotate(45deg);
      `;
    case 'top-left':
      return css`
        left: 24px;
        top: 0;
        transform: translate(-50%, 0) rotate(45deg);
      `;
  }
}

interface ContainerProps extends MotionProps {
  $highlightingElement: boolean;
  $caretPosition: UseTutorialPopoverPositionReturn['caretPosition'];
}

const Container = styled(motion(Card))<ContainerProps>`
  width: 360px;
  padding: ${spacings.medium};
  background: ${colors.ui.background__tutorial_card.rgba};
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  transition:
    top 400ms,
    left 400ms;
  box-shadow: ${elevation.above_scrim};
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
  ${({ $highlightingElement, $caretPosition }) =>
    $highlightingElement &&
    css`
      transform: translateX(-50%);
      &:before {
        z-index: -1;
        content: '';
        width: 32px;
        height: 32px;
        background: ${colors.ui.background__tutorial_card.rgba};
        position: absolute;
        ${caretPositionToCss($caretPosition)}
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
  contentRef: RefObject<HTMLElement | null>;
  isHighlighting: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export const TutorialPopover: FC<TutorialPopoverProps> = ({
  contentRef,
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
  const { style, highlightingElement, caretPosition } =
    useTutorialPopoverPosition({
      contentRef,
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
        $caretPosition={caretPosition}
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
      $caretPosition={caretPosition}
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
