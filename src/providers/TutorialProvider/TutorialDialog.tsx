import { CSSProperties, FC, useMemo } from 'react';

import { Button, Typography } from '@equinor/eds-core-react';

import {
  DIALOG_EDGE_MARGIN,
  TUTORIAL_LOCALSTORAGE_VALUE_STRING,
} from './TutorialProvider.const';
import { useGetTutorialSasToken, useTutorial } from './TutorialProvider.hooks';
import {
  DialogActions,
  DialogContent,
  DialogImage,
  DialogWrapper,
  NavigateSteps,
  StyledTutorialDialog,
} from './TutorialProvider.styles';
import { getBestPositionWithoutOverlap } from './TutorialProvider.utils';
import TutorialStepIndicator from './TutorialStepIndicator';
import { TutorialPosition } from 'src/api';

const TutorialDialog: FC = () => {
  const { data: sasToken } = useGetTutorialSasToken();

  const {
    activeTutorial,
    currentStep,
    setCurrentStep,
    setActiveTutorial,
    dialogRef,
    allElementsToHighlight,
    customStepComponents,
    isLastStep,
    currentStepObject,
    setAllElementsToHighlight,
    shortNameFromParams,
    viewportWidth,
    clearSearchParam,
  } = useTutorial();

  const dialogContent = useMemo(() => {
    if (!currentStepObject) return;
    if (currentStepObject.key && customStepComponents) {
      return customStepComponents.find(
        (step) => step.key === currentStepObject.key
      )?.element;
    } else if (
      currentStepObject.key === undefined ||
      currentStepObject.key === null
    ) {
      return (
        <>
          <Typography>{currentStepObject.title}</Typography>
          <Typography>{currentStepObject.body}</Typography>
          {currentStepObject.imgUrl && sasToken && (
            <DialogImage
              data-testid="tutorial-image"
              alt="tutorial-image"
              src={`${currentStepObject.imgUrl}?${sasToken}`}
            />
          )}
        </>
      );
    }
  }, [currentStepObject, customStepComponents, sasToken]);

  const dialogPosition: TutorialPosition | undefined = useMemo(() => {
    if (
      !activeTutorial ||
      !viewportWidth ||
      !allElementsToHighlight ||
      !dialogRef.current
    )
      return;
    if (activeTutorial.steps[currentStep].position)
      return activeTutorial.steps[currentStep].position;
    if (activeTutorial.dynamicPositioning) {
      return getBestPositionWithoutOverlap(
        allElementsToHighlight[currentStep].getBoundingClientRect(),
        dialogRef.current.getBoundingClientRect()
      );
    }
    return TutorialPosition.BOTTOM_RIGHT;
  }, [
    activeTutorial,
    viewportWidth,
    allElementsToHighlight,
    dialogRef,
    currentStep,
  ]);

  const dialogPositionStyle: CSSProperties | undefined = useMemo(() => {
    if (!dialogPosition || dialogPosition === TutorialPosition.CENTER) return;
    switch (dialogPosition as TutorialPosition) {
      case TutorialPosition.TOP_LEFT:
        return {
          marginTop: `${DIALOG_EDGE_MARGIN}px`,
          marginLeft: `${DIALOG_EDGE_MARGIN}px`,
        };
      case TutorialPosition.TOP_RIGHT:
        return {
          marginTop: `${DIALOG_EDGE_MARGIN}px`,
          marginRight: `${DIALOG_EDGE_MARGIN}px`,
        };
      case TutorialPosition.BOTTOM_LEFT:
        return {
          marginBottom: `${DIALOG_EDGE_MARGIN}px`,
          marginLeft: `${DIALOG_EDGE_MARGIN}px`,
        };
      case TutorialPosition.BOTTOM_RIGHT:
      default:
        return {
          marginBottom: `${DIALOG_EDGE_MARGIN}px`,
          marginRight: `${DIALOG_EDGE_MARGIN}px`,
        };
    }
  }, [dialogPosition]);

  const stopTutorial = () => {
    if (shortNameFromParams) clearSearchParam();
    if (activeTutorial) {
      window.localStorage.setItem(
        activeTutorial?.shortName,
        TUTORIAL_LOCALSTORAGE_VALUE_STRING
      );
      setActiveTutorial(undefined);
      dialogRef.current?.close();
      setCurrentStep(0);
      setAllElementsToHighlight(undefined);
    }
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

  return (
    <DialogWrapper>
      <StyledTutorialDialog
        data-testid="tutorial-dialog"
        ref={dialogRef}
        style={dialogPositionStyle ?? undefined}
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
