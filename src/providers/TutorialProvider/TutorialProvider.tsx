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
import { getAllElementsToHighlight } from './TutorialProvider.utils';
import TutorialProviderInner from './TutorialProviderInner';

interface TutorialContextType {
  activeTutorial: Tutorial | undefined;
  setActiveTutorial: Dispatch<SetStateAction<Tutorial | undefined>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  allElementsToHighlight: HTMLElement[] | undefined;
  setAllElementsToHighlight: Dispatch<
    SetStateAction<HTMLElement[] | undefined>
  >;
  customStepComponents: CustomTutorialComponent[] | undefined;
  currentStepObject: GenericTutorialStep | CustomTutorialStep | undefined;
  isLastStep: boolean;
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
  tutorialShortNameFromParams: string | null;
  tutorialsFromProps: Tutorial[];
  tutorialError: boolean;
  setTutorialError: Dispatch<SetStateAction<boolean>>;
  tutorialWasStartedFromParam: MutableRefObject<boolean>;
  viewportWidth: number;
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
  tutorials?: Tutorial[];
}

const TutorialProvider: FC<TutorialProviderProps> = ({
  children,
  customStepComponents,
  tutorials,
}) => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | undefined>(
    undefined
  );
  const tutorialWasStartedFromParam = useRef(false);
  const [tutorialError, setTutorialError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const tutorialShortNameFromParams = searchParams.get(
    TUTORIAL_SEARCH_PARAM_KEY
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [allElementsToHighlight, setAllElementsToHighlight] = useState<
    HTMLElement[] | undefined
  >(undefined);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const currentStepObject = useMemo(() => {
    if (!activeTutorial) return;
    return activeTutorial.steps.at(currentStep);
  }, [activeTutorial, currentStep]);

  const isLastStep = useMemo(() => {
    if (!activeTutorial) return false;
    return currentStep >= activeTutorial?.steps.length - 1;
  }, [activeTutorial, currentStep]);

  useEffect(() => {
    const setViewportWidthHandler = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', setViewportWidthHandler);

    return () => {
      window.removeEventListener('resize', setViewportWidthHandler);
    };
  }, []);

  // Try to find all elements to highlight, and set it to a state for further use.
  // If not found, set error state to true
  useEffect(() => {
    if (!activeTutorial || tutorialError) return;

    const handleTryToGetElementsAgain = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const allElementsToHighlightInTimeout =
        getAllElementsToHighlight(activeTutorial);
      if (allElementsToHighlightInTimeout.every((item) => item !== null)) {
        setAllElementsToHighlight(
          allElementsToHighlightInTimeout as HTMLElement[]
        );
      } else {
        console.error(
          'Could not find all elements to highlight for the tutorial. Here is an array with all elements that were found: ',
          allElementsToHighlightInTimeout
        );
        setTutorialError(true);
      }
    };

    const allElementsToHighlight = getAllElementsToHighlight(activeTutorial);

    if (allElementsToHighlight.every((item) => item !== null)) {
      setAllElementsToHighlight(allElementsToHighlight as HTMLElement[]);
    } else {
      handleTryToGetElementsAgain();
    }
  }, [activeTutorial, currentStep, tutorialError, tutorialShortNameFromParams]);

  // Check to see if the tutorial has the custom components for any custom steps it has.
  // Sets tutorialError to true if it does not find a match for all potential custom steps
  useEffect(() => {
    if (!activeTutorial || tutorialError) return;
    const customKeysFromSteps = activeTutorial.steps
      .filter((step) => step.key !== undefined)
      .map((customStep) => customStep.key ?? '');
    if (customKeysFromSteps.length === 0) return;

    const customKeysFromComponents = customStepComponents?.map(
      (stepComponent) => stepComponent.key
    );
    if (!customKeysFromComponents || customKeysFromComponents.length === 0) {
      console.error(
        'Could not find any custom components, but expected these keys: ',
        customKeysFromSteps
      );
      setTutorialError(true);
    }

    const stepsHaveComponents = customKeysFromSteps.map((keyFromStep) =>
      customKeysFromComponents?.includes(keyFromStep)
    );

    if (stepsHaveComponents.some((step) => step !== true)) {
      console.error(
        'Could not find the custom components related to the active tutorial'
      );
      console.error(
        'The active tutorial expected to find these keys:  ',
        customKeysFromSteps
      );
      console.error(
        'However in the custom components we only found these keys: ',
        customKeysFromComponents
      );
      setTutorialError(true);
    }
  }, [activeTutorial, customStepComponents, tutorialError]);

  return (
    <TutorialContext.Provider
      value={{
        currentStepObject,
        activeTutorial,
        setActiveTutorial,
        currentStep,
        setCurrentStep,
        allElementsToHighlight,
        setAllElementsToHighlight,
        customStepComponents,
        isLastStep,
        dialogRef,
        searchParams,
        setSearchParams,
        tutorialShortNameFromParams,
        tutorialsFromProps: tutorials ?? [],
        tutorialError,
        setTutorialError,
        tutorialWasStartedFromParam,
        viewportWidth,
      }}
    >
      <TutorialProviderInner />

      {children}
    </TutorialContext.Provider>
  );
};
export default TutorialProvider;
