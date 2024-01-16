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
import { tokens } from '@equinor/eds-tokens';

import { tutorialForTesting } from './TutorialProviderStory';
import TutorialStepIndicator from './TutorialStepIndicator';

import styled from 'styled-components';

const { spacings, elevation, shape } = tokens;
const HIGHLIGHT_PADDING = 8;

interface HighlighterProps {
  $top: number;
  $left: number;
  $width: number;
  $height: number;
}

const Highlighter = styled.div<HighlighterProps>`
  position: absolute;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
  transition: 300ms;
  border-radius: 4px;
  ::backdrop {
    background: transparent;
  }
  ${({ $width, $height, $top, $left }) => `
    top: ${$top}px;
    left: ${$left}px;
    width: ${$width}px;
    height: ${$height}px;
  `}
`;

const DialogWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  background: transparent;
`;

interface TutorialDialogProps {
  $positionCss: string;
}

const TutorialDialog = styled.dialog<TutorialDialogProps>`
  border: none;
  //box-shadow:
  //  0 11px 15px 0 rgba(0, 0, 0, 0.2),
  //  0 9px 46px 0 rgba(0, 0, 0, 0.12),
  //  0 24px 38px 0 rgba(0, 0, 0, 0.14);
  box-shadow: ${elevation.above_scrim};
  border-radius: ${shape.corners.borderRadius};
  ${({ $positionCss }) => $positionCss}
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.large};
  width: 300px;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavigateSteps = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
`;
interface TutorialContextType {
  startTutorial: () => void;
}

export type Tutorial = {
  name: string;
  shortName: string;
  path: string;
  steps: Array<GenericTutorialStep | CustomTutorialStep>;
};

export enum TutorialPosition {
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
  CENTER = 'center',
}

type TutorialStepBase = {
  position?: TutorialPosition;
};

export type GenericTutorialStep = TutorialStepBase & {
  title: string;
  body: string;
  key?: undefined;
  imgUrl?: string;
};

export type CustomTutorialStep = TutorialStepBase & {
  key: string;
};

export const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

type HighlightingInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

interface TutorialProviderProps {
  children: ReactNode;
  customSteps?: Array<{
    key: string;
    element: ReactElement;
  }>;
}

const TutorialProvider: FC<TutorialProviderProps> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [activeTutorial, setActiveTutorial] = useState<Tutorial | undefined>(
    undefined
  );
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = useMemo(() => {
    if (!activeTutorial) return false;
    return currentStep >= activeTutorial?.steps.length - 1;
  }, [activeTutorial, currentStep]);

  const currentStepObject = useMemo(() => {
    if (!activeTutorial) return;
    return activeTutorial.steps.at(currentStep);
  }, [activeTutorial, currentStep]);

  const highlightingInfo: HighlightingInfo | undefined = useMemo(() => {
    if (!activeTutorial) return;
    const elementCollection = document.getElementsByClassName(
      `${activeTutorial.shortName}-${currentStep}`
    );
    const elementToHighlight = elementCollection.item(0);

    if (elementCollection.length !== 1 || !elementToHighlight) return;

    const boundingClient = elementToHighlight.getBoundingClientRect();

    return {
      top: boundingClient.top - HIGHLIGHT_PADDING,
      left: boundingClient.left - HIGHLIGHT_PADDING,
      height: boundingClient.height + HIGHLIGHT_PADDING * 2,
      width: boundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [activeTutorial, currentStep]);

  const currentStepDialogContent = useMemo(() => {
    if (!currentStepObject) return;

    if (currentStepObject.key) {
      console.log(currentStepObject);
      return <div>Custom stuff \o/</div>;
    } else if (currentStepObject.key === undefined) {
      console.log(currentStepObject);
      return (
        <>
          <Typography>{currentStepObject.title}</Typography>
          <Typography>{currentStepObject.body}</Typography>
        </>
      );
    }
  }, [currentStepObject]);

  const getMarginString = (type: string) => {
    return `margin-${type}: ${spacings.comfortable.large}; `;
  };

  const dialogPositioningCss = useMemo(() => {
    if (
      !activeTutorial ||
      currentStepObject?.position === TutorialPosition.CENTER
    )
      return '';
    switch (currentStepObject?.position) {
      case TutorialPosition.TOP_LEFT:
        return `${getMarginString('top')}${getMarginString('left')}`;
      case TutorialPosition.TOP_RIGHT:
        return `${getMarginString('top')}${getMarginString('right')}`;
      case TutorialPosition.BOTTOM_LEFT:
        return `${getMarginString('bottom')}${getMarginString('left')}`;
      case TutorialPosition.BOTTOM_RIGHT:
        return `${getMarginString('bottom')}${getMarginString('right')}`;
      default:
        // TODO: make logic for dynamic positioning
        return `${getMarginString('bottom')}${getMarginString('right')}`;
    }
  }, [activeTutorial, currentStepObject?.position]);

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
    <TutorialContext.Provider value={{ startTutorial: () => null }}>
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
          $positionCss={dialogPositioningCss ?? ''}
        >
          <DialogContent>
            {currentStepDialogContent}
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
