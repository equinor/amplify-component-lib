import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const localStorageKey = 'tutorialstepscontext';

interface TutorialContextState {
  tutorialStep: string;
  setTutorialStep: (val: string) => void;
  showTutorialIntro: boolean;
  setShowTutorialIntro: (val: boolean) => void;
}

interface TutorialState {
  step: string;
  showTutorialIntro: boolean;
}

const getDefaultState = (): TutorialState => {
  const localStorageData = localStorage.getItem(localStorageKey);

  if (localStorageData) {
    return JSON.parse(localStorageData) as TutorialState;
  }
  return { step: '', showTutorialIntro: false };
};

const updateLocalStorage = (state: TutorialState) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const TutorialStepsContext = createContext<TutorialContextState | undefined>(
  undefined
);

export const useTutorialSteps = (): TutorialContextState => {
  const context = useContext(TutorialStepsContext);
  if (context === undefined) {
    throw new Error(
      'useTutorialSteps must be used within a TutorialStepsProvider'
    );
  }
  return context;
};

const TutorialStepsProvider: FC<{
  children: ReactNode;
  startOpen?: boolean;
}> = ({ children, startOpen = false }) => {
  const [tutorialStep, setTutorialStep] = useState<string>(
    getDefaultState().step
  );
  const [showTutorialIntro, setShowTutorialIntro] = useState<boolean>(
    startOpen ? startOpen : getDefaultState().showTutorialIntro
  );

  useEffect(() => {
    updateLocalStorage({
      step: tutorialStep,
      showTutorialIntro: showTutorialIntro,
    });
  }, [showTutorialIntro, tutorialStep]);

  return (
    <TutorialStepsContext.Provider
      value={{
        tutorialStep,
        setTutorialStep,
        showTutorialIntro,
        setShowTutorialIntro,
      }}
    >
      {children}
    </TutorialStepsContext.Provider>
  );
};

export default TutorialStepsProvider;
