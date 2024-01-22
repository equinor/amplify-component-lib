import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { CustomTutorialComponent, Tutorial } from './TutorialProvider.types';
import TutorialProviderInner from './TutorialProviderInner';

export const tutorialForTesting: Tutorial = {
  name: 'Dashboard tutorial',
  shortName: 'dashboard-tutorial',
  path: '/dashboard',
  dynamicPositioning: true,
  steps: [
    {
      title: 'A story',
      body: 'body step 0',
    },
    {
      title: 'The story continues',
      body: 'body step 1',
    },
    {
      title: 'A twist!',
      body: 'body step 2',
    },
    {
      title: 'woop',
      body: 'body step 3',
    },
  ],
};

interface TutorialContextType {
  activeTutorial: Tutorial | undefined;
  setActiveTutorial: Dispatch<SetStateAction<Tutorial | undefined>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

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
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <TutorialContext.Provider
      value={{ activeTutorial, setActiveTutorial, currentStep, setCurrentStep }}
    >
      <TutorialProviderInner customStepComponents={customStepComponents} />

      {children}
    </TutorialContext.Provider>
  );
};
export default TutorialProvider;
