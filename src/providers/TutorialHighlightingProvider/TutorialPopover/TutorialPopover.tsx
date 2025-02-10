import { FC } from 'react';

import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import {
  MyTutorialDto,
  useTutorials,
} from '@equinor/subsurface-app-management';

import { useTutorialHighlighting } from '../TutorialHighlightingProvider';
import { TUTORIAL_HIGHLIGHT_ANIMATION_PROPS } from '../TutorialHighlightingProvider.constants';
import { StepIndicator } from './StepIndicator';
import { colors, elevation, spacings } from 'src/atoms/style';
import { useReversedScrollY } from 'src/providers/TutorialHighlightingProvider/hooks/useReversedScrollY';

import { motion, MotionProps, useTransform } from 'framer-motion';
import styled, { css } from 'styled-components';

interface ContainerProps extends MotionProps {
  $highlightingElement: boolean;
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
  > header {
    display: flex;
    gap: ${spacings.small};
    align-items: center;
  }
  ${({ $highlightingElement }) =>
    $highlightingElement &&
    css`
      transform: translateX(-50%);
      &:before {
        z-index: -1;
        content: '';
        width: 32px;
        height: 26px;
        background: ${colors.infographic.primary__moss_green_13.rgba};
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0) rotate(45deg);
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

const TOP_OFFSET = 16;

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
  const reversedScrollY = useReversedScrollY();
  const usingTop = top && height ? top + height + TOP_OFFSET : undefined;
  const usingLeft = left && width ? left + width / 2 : undefined;
  const highlightingElement = !!usingTop && !!usingLeft;
  const transformedTop = useTransform(reversedScrollY, (value) => {
    if (!highlightingElement) return null;
    return value + usingTop;
  });

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
        style={{
          position: highlightingElement ? 'absolute' : undefined,
          top: transformedTop,
          left: usingLeft,
        }}
        $highlightingElement={highlightingElement}
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
      style={{
        position: highlightingElement ? 'absolute' : undefined,
        top: transformedTop,
        left: usingLeft,
      }}
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
