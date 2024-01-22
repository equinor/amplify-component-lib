import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router';

import { Button, Typography } from '@equinor/eds-core-react';

import { useTutorial } from '../../hooks/useTutorial';
import { HIGHLIGHT_PADDING } from './TutorialProvider.const';
import {
  BrokenTutorialDialog,
  DialogActions,
  DialogContent,
  DialogWrapper,
  Highlighter,
  NavigateSteps,
  TutorialDialog,
} from './TutorialProvider.styles';
import {
  CustomTutorialComponent,
  HighlightingInfo,
  Tutorial,
  TutorialDialogPosition,
} from './TutorialProvider.types';
import {
  getBestPositionWithoutOverlap,
  getMarginCss,
} from './TutorialProvider.utils';
import { tutorialForTesting } from './TutorialProviderStory';
import TutorialStepIndicator from './TutorialStepIndicator';

interface TutorialProviderInnerProps {
  customStepComponents?: Array<CustomTutorialComponent>;
}

const TutorialProviderInner: FC<TutorialProviderInnerProps> = ({
  customStepComponents,
}) => {
  // const [localStorage, setLocalStorage] = useLocalStorage<string[]>('', []);
  const { pathname } = useLocation();
  const { tutorial } = useParams();
  console.log('pathname: ', pathname);
  console.log('tutorialFromParam', tutorial);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const brokenTutorialDialogRef = useRef<HTMLDialogElement | null>(null);
  const { activeTutorial, setActiveTutorial, currentStep, setCurrentStep } =
    useTutorial();
  const queryParams = useMemo(() => new URLSearchParams(location.search), []);
  const appTutorials = useMemo(() => [tutorialForTesting], []);
  const elementToHighlight = useMemo(() => {
    if (!activeTutorial) return;
    const elementCollection = document.getElementsByClassName(
      `${activeTutorial.shortName}-${currentStep}`
    );
    return elementCollection.item(0);
  }, [activeTutorial, currentStep]);

  const currentStepObject = useMemo(() => {
    if (!activeTutorial) return;
    return activeTutorial.steps.at(currentStep);
  }, [activeTutorial, currentStep]);

  const hasRelevantCustomSteps = useMemo(() => {
    if (!activeTutorial) return;
    const customKeysFromSteps = activeTutorial.steps
      .filter((step) => step.key !== undefined)
      .map((customStep) => customStep.key ?? '');
    if (customKeysFromSteps.length === 0) return true;

    const customKeysFromComponents = customStepComponents?.map(
      (stepComponent) => stepComponent.key
    );
    if (!customKeysFromComponents || customKeysFromComponents.length === 0)
      return false;

    const stepsHaveComponents = customKeysFromSteps.map(
      (keyFromStep) => customKeysFromComponents?.includes(keyFromStep)
    );

    const canShowTutorial = stepsHaveComponents.every((step) => step === true);
    if (canShowTutorial) {
      return true;
    } else {
      brokenTutorialDialogRef.current?.showModal();
      return false;
    }
  }, [activeTutorial, customStepComponents]);

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
  }, [activeTutorial, currentStep, elementToHighlight]);

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

  const highlightingInfo: HighlightingInfo | undefined = useMemo(() => {
    if (!elementToHighlight) return;

    const highlighterBoundingClient =
      elementToHighlight.getBoundingClientRect();

    return {
      top: highlighterBoundingClient.top - HIGHLIGHT_PADDING + window.scrollY,
      left: highlighterBoundingClient.left - HIGHLIGHT_PADDING,
      height: highlighterBoundingClient.height + HIGHLIGHT_PADDING * 2,
      width: highlighterBoundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [elementToHighlight]);

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
        </>
      );
    }
  }, [currentStepObject, customStepComponents]);

  const isLastStep = useMemo(() => {
    if (!activeTutorial) return false;
    return currentStep >= activeTutorial?.steps.length - 1;
  }, [activeTutorial, currentStep]);

  const tutorialsForPath = useMemo(() => {
    return appTutorials.filter((item) => item.path === pathname);
  }, [appTutorials, pathname]);

  const runTutorial = useCallback(
    (tutorialToRun: Tutorial) => {
      if (!tutorial) return;
      setActiveTutorial(tutorialToRun);
      dialogRef.current?.showModal();
      localStorage.setItem(tutorial, 'true');
      queryParams.delete(tutorial);
    },
    [queryParams, setActiveTutorial, tutorial]
  );

  useEffect(() => {
    if (!hasRelevantCustomSteps) {
      brokenTutorialDialogRef.current?.showModal();
    }
  }, [hasRelevantCustomSteps, setActiveTutorial]);

  useEffect(() => {
    // TODO: check for tutorial in list from backend
    if (tutorial && appTutorials.some((item) => item.shortName === tutorial)) {
      localStorage.removeItem(tutorial);
    }
  }, [activeTutorial, appTutorials, setActiveTutorial, tutorial]);

  useEffect(() => {
    if (tutorialsForPath.length < 1) return;

    const tutorialToRun = tutorialsForPath.find(
      (item) => localStorage.getItem(item.shortName) !== 'true'
    );
    if (tutorialToRun) {
      runTutorial(tutorialToRun);
    }
  }, [runTutorial, tutorialsForPath]);

  const stopTutorial = () => {
    dialogRef.current?.close();
    setActiveTutorial(undefined);
    setCurrentStep(0);
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

  const handleOnClickBrokenTutorial = () => {
    brokenTutorialDialogRef.current?.close();

    setActiveTutorial(undefined);
  };

  console.log('app : ', appTutorials);
  console.log('path : ', tutorialsForPath);

  if (!hasRelevantCustomSteps && activeTutorial) {
    return (
      <BrokenTutorialDialog ref={brokenTutorialDialogRef}>
        <Typography>
          The tutorial you tried to open is broken. Please submit this feedback
          using the Resources menu in the topbar
        </Typography>
        <Button variant="outlined" onClick={handleOnClickBrokenTutorial}>
          Close
        </Button>
      </BrokenTutorialDialog>
    );
  }

  return (
    <>
      <Button
        onClick={() => {
          dialogRef.current?.showModal();
          setActiveTutorial(tutorialForTesting);
        }}
      >
        Start tutorial
      </Button>
      {highlightingInfo && (
        <Highlighter
          $top={highlightingInfo.top}
          $left={highlightingInfo.left}
          $width={highlightingInfo.width}
          $height={highlightingInfo.height}
        />
      )}
      <DialogWrapper>
        <TutorialDialog
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
        </TutorialDialog>
      </DialogWrapper>
    </>
  );
};

export default TutorialProviderInner;
