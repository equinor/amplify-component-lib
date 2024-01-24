import { FC, useMemo } from 'react';

import { Button, Typography } from '@equinor/eds-core-react';

import { useTutorial } from './TutorialProvider';
import {
  DialogActions,
  DialogContent,
  DialogImage,
  DialogWrapper,
  NavigateSteps,
  StyledTutorialDialog,
} from './TutorialProvider.styles';
import { TutorialDialogPosition } from './TutorialProvider.types';
import {
  getBestPositionWithoutOverlap,
  getMarginCss,
} from './TutorialProvider.utils';
import TutorialStepIndicator from './TutorialStepIndicator';

const TutorialDialog: FC = () => {
  const {
    activeTutorial,
    currentStep,
    setCurrentStep,
    setActiveTutorial,
    dialogRef,
    elementToHighlight,
    customStepComponents,
    isLastStep,
    currentStepObject,
    setElementToHighlight,
  } = useTutorial();

  const dialogContent = useMemo(() => {
    if (!currentStepObject) return;

    if (currentStepObject.key && customStepComponents) {
      return customStepComponents.find(
        (step) => step.key === currentStepObject.key
      )?.element;
    } else if (currentStepObject.key === undefined) {
      return (
        <>
          <Typography>{currentStepObject.title}</Typography>
          <Typography>{currentStepObject.body}</Typography>
          {currentStepObject.imgUrl && (
            <DialogImage src={currentStepObject.imgUrl} />
          )}
        </>
      );
    }
  }, [currentStepObject, customStepComponents]);

  const dialogPosition: TutorialDialogPosition | undefined = useMemo(() => {
    if (!activeTutorial) return;
    if (!elementToHighlight || !dialogRef.current)
      return TutorialDialogPosition.BOTTOM_RIGHT;
    if (activeTutorial?.steps[currentStep].position)
      return (
        activeTutorial.steps[currentStep].position ??
        TutorialDialogPosition.BOTTOM_RIGHT
      );
    if (activeTutorial.dynamicPositioning) {
      return getBestPositionWithoutOverlap(
        elementToHighlight.getBoundingClientRect(),
        dialogRef.current.getBoundingClientRect()
      );
    }
    return TutorialDialogPosition.BOTTOM_RIGHT;
  }, [activeTutorial, currentStep, dialogRef, elementToHighlight]);

  const dialogPositionCss = useMemo(() => {
    switch (dialogPosition) {
      case TutorialDialogPosition.TOP_LEFT:
        return `${getMarginCss('top')}${getMarginCss('left')}`;
      case TutorialDialogPosition.TOP_RIGHT:
        return `${getMarginCss('top')}${getMarginCss('right')}`;
      case TutorialDialogPosition.BOTTOM_LEFT:
        return `${getMarginCss('bottom')}${getMarginCss('left')}`;
      case TutorialDialogPosition.BOTTOM_RIGHT:
        return `${getMarginCss('bottom')}${getMarginCss('right')}`;
      default:
        return '';
    }
  }, [dialogPosition]);

  const stopTutorial = () => {
    dialogRef.current?.close();
    setActiveTutorial(undefined);
    setCurrentStep(0);
    setElementToHighlight(undefined);
  };
  const handleOnSkip = () => {
    stopTutorial();
  };

  const handleOnPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleOnNext = () => {
    if (isLastStep) {
      stopTutorial();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  // TODO: Add image

  return (
    <DialogWrapper>
      <StyledTutorialDialog
        open={activeTutorial !== undefined}
        ref={dialogRef}
        $positionCss={dialogPositionCss ?? ''}
      >
        <DialogContent>
          {dialogContent}
          <TutorialStepIndicator
            steps={activeTutorial?.steps ?? []}
            currentStep={currentStep}
          />
          <DialogActions>
            <Button variant="ghost" onClick={handleOnSkip}>
              Skip
            </Button>
            <NavigateSteps>
              {currentStep && currentStep !== 0 ? (
                <Button variant="ghost" onClick={handleOnPrev}>
                  Previous
                </Button>
              ) : null}
              <Button variant="outlined" onClick={handleOnNext}>
                {isLastStep ? 'Done' : 'Next'}
              </Button>
            </NavigateSteps>
          </DialogActions>
        </DialogContent>
      </StyledTutorialDialog>
    </DialogWrapper>
  );
};

export default TutorialDialog;
