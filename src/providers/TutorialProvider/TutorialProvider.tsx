import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, Typography } from '@equinor/eds-core-react';

import { HIGHLIGHT_PADDING } from './TutorialProvider.const';
import {
  DialogActions,
  DialogContent,
  DialogWrapper,
  Highlighter,
  NavigateSteps,
  TutorialDialog,
} from './TutorialProvider.styles';
import {
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

interface TutorialContextType {
  activeTutorial: Tutorial | undefined;
  currentStep: number;
}

export const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

interface TutorialProviderProps {
  children: ReactNode;
  customSteps?: Array<{
    key: string;
    element: ReactElement;
  }>;
}

const TutorialProvider: FC<TutorialProviderProps> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const highligherRef = useRef<HTMLDivElement | null>(null);

  const [activeTutorial, setActiveTutorial] = useState<Tutorial | undefined>(
    undefined
  );
  const [currentStep, setCurrentStep] = useState(0);

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

  const dialogPosition: TutorialDialogPosition | undefined = useMemo(() => {
    if (!activeTutorial) return;
    if (!elementToHighlight || !dialogRef.current)
      return TutorialDialogPosition.BOTTOM_RIGHT;
    if (activeTutorial?.steps[currentStep].position)
      return (
        activeTutorial.steps[currentStep].position ??
        TutorialDialogPosition.BOTTOM_RIGHT
      );

    return getBestPositionWithoutOverlap(
      elementToHighlight.getBoundingClientRect(),
      dialogRef.current.getBoundingClientRect()
    );
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

    const boundingClient = elementToHighlight.getBoundingClientRect();

    return {
      top: boundingClient.top - HIGHLIGHT_PADDING,
      left: boundingClient.left - HIGHLIGHT_PADDING,
      height: boundingClient.height + HIGHLIGHT_PADDING * 2,
      width: boundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [elementToHighlight]);

  const dialogContent = useMemo(() => {
    if (!currentStepObject) return;

    if (currentStepObject.key) {
      return <div>Custom stuff \o/</div>;
    } else if (currentStepObject.key === undefined) {
      return (
        <>
          <Typography>{currentStepObject.title}</Typography>
          <Typography>{currentStepObject.body}</Typography>
        </>
      );
    }
  }, [currentStepObject]);

  const isLastStep = useMemo(() => {
    if (!activeTutorial) return false;
    return currentStep >= activeTutorial?.steps.length - 1;
  }, [activeTutorial, currentStep]);

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
  return (
    <TutorialContext.Provider
      value={{ activeTutorial: activeTutorial, currentStep: currentStep }}
    >
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
          ref={highligherRef}
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

      {children}
    </TutorialContext.Provider>
  );
};
export default TutorialProvider;
