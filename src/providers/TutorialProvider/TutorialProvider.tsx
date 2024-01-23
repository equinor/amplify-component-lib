import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { TUTORIAL_SEARCH_PARAM_KEY } from './TutorialProvider.const';
import {
  CustomTutorialComponent,
  CustomTutorialStep,
  GenericTutorialStep,
  Tutorial,
} from './TutorialProvider.types';
import TutorialProviderInner from './TutorialProviderInner';

interface TutorialContextType {
  activeTutorial: Tutorial | undefined;
  setActiveTutorial: Dispatch<SetStateAction<Tutorial | undefined>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  elementToHighlight: HTMLElement | undefined | null;
  customStepComponents: CustomTutorialComponent[] | undefined;
  currentStepObject: GenericTutorialStep | CustomTutorialStep | undefined;
  isLastStep: boolean;
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
  tutorialShortNameFromParams: string | null;
}

export const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error(
      'useTutorial must be used within a TutorialContext provider'
    );
  }

  return context;
};

interface TutorialProviderProps {
  children: ReactNode;
  customStepComponents?: Array<CustomTutorialComponent>;
}

const TutorialProvider: FC<TutorialProviderProps> = ({
  children,
  customStepComponents,
}) => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const tutorialShortNameFromParams = searchParams.get(
    TUTORIAL_SEARCH_PARAM_KEY
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [elementToHighlight, setElementToHighlight] = useState<
    HTMLElement | undefined
  >(undefined);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!tutorialShortNameFromParams || !activeTutorial) return;

    const element = document.getElementById(
      `${activeTutorial.shortName}-${currentStep}`
    );
    const handleTryToGetElement = async () => {
      // Wait before trying to get the element
      await new Promise((resolve) => setTimeout(resolve, 200));

      const elementInTimeout = document.getElementById(
        `${activeTutorial.shortName}-${currentStep}`
      );
      if (elementInTimeout) {
        setElementToHighlight(elementInTimeout);
      } else {
        // TODO: handleError
      }
    };

    if (element && activeTutorial) {
      setElementToHighlight(element);
    } else {
      handleTryToGetElement();
    }
  }, [activeTutorial, currentStep, tutorialShortNameFromParams]);

  const currentStepObject = useMemo(() => {
    if (!activeTutorial) return;
    return activeTutorial.steps.at(currentStep);
  }, [activeTutorial, currentStep]);

  const isLastStep = useMemo(() => {
    if (!activeTutorial) return false;
    return currentStep >= activeTutorial?.steps.length - 1;
  }, [activeTutorial, currentStep]);

  return (
    <TutorialContext.Provider
      value={{
        currentStepObject,
        activeTutorial,
        setActiveTutorial,
        currentStep,
        setCurrentStep,
        elementToHighlight,
        customStepComponents,
        isLastStep,
        dialogRef,
        searchParams,
        setSearchParams,
        tutorialShortNameFromParams,
      }}
    >
      <TutorialProviderInner />

      {children}
    </TutorialContext.Provider>
  );
};
export default TutorialProvider;
