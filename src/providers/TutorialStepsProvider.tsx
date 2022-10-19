import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Steps } from '../components/DataDisplay/Tutorial/Tutorial';

const localStorageKey = 'tutorialstepscontext';

type TutorialContextState = {
  tutorialStep: Steps;
  setTutorialStep: (val: Steps) => void;
  showTutorialStarter: boolean;
  setShowTutorialStarter: (val: boolean) => void;
};

interface TutorialState {
  step: Steps;
  showTutorialStarter: boolean;
}

const getDefaultState = (): TutorialState => {
  const localStorageData = localStorage.getItem(localStorageKey);

  if (localStorageData) {
    return JSON.parse(localStorageData);
  }
  return { step: Steps.NOTSTARTED, showTutorialStarter: false };
};

const updateLocalStorage = (state: TutorialState) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const TutorialStepsContext = createContext<
  TutorialContextState | undefined
>(undefined);

export const useTutorialSteps = (): TutorialContextState => {
  const context = useContext(TutorialStepsContext);
  if (context === undefined) {
    throw new Error(
      'useTutorialSteps must be used within a TutorialStepsProvider'
    );
  }
  return context;
};

const TutorialStepsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tutorialStep, setTutorialStep] = useState<Steps>(
    getDefaultState().step
  );
  const [showTutorialStarter, setShowTutorialStarter] = useState<boolean>(
    getDefaultState().showTutorialStarter
  );

  useEffect(() => {
    updateLocalStorage({
      step: tutorialStep,
      showTutorialStarter: showTutorialStarter,
    });
  }, [showTutorialStarter, tutorialStep]);

  return (
    <TutorialStepsContext.Provider
      value={{
        tutorialStep,
        setTutorialStep,
        showTutorialStarter,
        setShowTutorialStarter,
      }}
    >
      {children}
    </TutorialStepsContext.Provider>
  );
};

export default TutorialStepsProvider;
