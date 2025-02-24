import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

interface SubStep {
  title: string;
  description?: string;
}

interface StepWithSubSteps {
  label: string;
  title?: undefined;
  description?: undefined;
  subSteps: [SubStep, SubStep, ...SubStep[]];
}

interface StepWithoutSubSteps {
  label: string;
  title?: string;
  description?: string;
  subSteps?: undefined;
}

type Step = StepWithSubSteps | StepWithoutSubSteps;

interface StepperContextType {
  steps: [Step, Step, ...Step[]];
  currentStep: number;
  currentSubStep: number;
  setCurrentStep: (value: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const StepperContext = createContext<StepperContextType | undefined>(
  undefined
);

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
}

export interface StepperProviderProps {
  steps: [Step, Step, ...Step[]];
  children: ReactNode;
}

interface StepperProviderSyncedToURLParamProps extends StepperProviderProps {
  syncToURLParam: true;
}

interface StepperProviderWithoutSyncToURLParamProps
  extends StepperProviderProps {
  syncToURLParam?: undefined;
  initialStep?: number;
}

/**
 * @param steps - Which steps the stepper should have
 * @param syncToURLParam - Assumes step param is at end of path, syncs current step to the URL param
 * @param initialStep - Initial step to start the stepper at, can't be set if you use syncToURLParam
 */
export const StepperProvider: FC<
  | StepperProviderSyncedToURLParamProps
  | StepperProviderWithoutSyncToURLParamProps
> = ({ steps, children, ...rest }) => {
  const { step } = useParams();
  const navigate = useNavigate();
  const pathWithoutStep = useLocation()
    .pathname.split('/')
    .slice(0, -1)
    .join('/');
  const usingInitialStep = rest.syncToURLParam
    ? Number(step)
    : (rest?.initialStep ?? 0);

  if (rest.syncToURLParam && step && isNaN(Number(step))) {
    throw new Error(
      'Step URL param must be a valid number when using "syncToURLParam"'
    );
  }

  const [currentStep, setCurrentStep] = useState(usingInitialStep);
  const usingStep = rest.syncToURLParam ? Number(step) : currentStep;
  const [currentSubStep, setCurrentSubStep] = useState(0);

  if (usingInitialStep >= steps.length || usingInitialStep < 0) {
    throw new Error('initialStep must be a valid index of the steps array');
  }

  const handleOnSetStep = (value: number) => {
    if (rest.syncToURLParam) {
      console.log(pathWithoutStep);
      navigate(`${pathWithoutStep}/${value}`);
    } else {
      setCurrentStep(value);
    }
  };

  const resetCurrentSubStep = () => {
    if (currentSubStep !== 0) setCurrentSubStep(0);
  };

  const goToNextStep = () => {
    if (
      'subSteps' in steps[usingStep] &&
      steps[usingStep].subSteps &&
      currentSubStep < steps[usingStep].subSteps.length - 1
    ) {
      setCurrentSubStep((prev) => prev + 1);
      return;
    }

    if (usingStep === steps.length - 1) return;

    handleOnSetStep(usingStep + 1);
    resetCurrentSubStep();
  };

  const goToPreviousStep = () => {
    if (
      currentSubStep > 0 &&
      'subSteps' in steps[usingStep] &&
      steps[usingStep].subSteps &&
      steps[usingStep].subSteps.length > 0
    ) {
      setCurrentSubStep((prev) => prev - 1);
      return;
    }

    if (usingStep === 0) return;

    handleOnSetStep(usingStep - 1);

    const previousStep = steps.at(usingStep - 1);
    if (previousStep && 'subSteps' in previousStep && previousStep.subSteps) {
      // Set substeps to the last substep of the previous step
      setCurrentSubStep(previousStep.subSteps.length - 1);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStep: usingStep,
        currentSubStep,
        setCurrentStep: handleOnSetStep,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
