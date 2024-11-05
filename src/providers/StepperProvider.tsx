import { createContext, FC, ReactNode, useContext, useState } from 'react';

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
  initialStep?: number;
  steps: [Step, Step, ...Step[]];
  children: ReactNode;
}

export const StepperProvider: FC<StepperProviderProps> = ({
  initialStep = 0,
  steps,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [currentSubStep, setCurrentSubStep] = useState(0);

  if (initialStep >= steps.length || initialStep < 0) {
    throw new Error('initialStep must be a valid index of the steps array');
  }

  const resetCurrentSubStep = () => {
    if (currentSubStep !== 0) setCurrentSubStep(0);
  };

  const goToNextStep = () => {
    if (
      'subSteps' in steps[currentStep] &&
      steps[currentStep].subSteps &&
      currentSubStep < steps[currentStep].subSteps.length - 1
    ) {
      setCurrentSubStep((prev) => prev + 1);
      return;
    }

    if (currentStep === steps.length - 1) return;

    setCurrentStep((prev) => prev + 1);
    resetCurrentSubStep();
  };

  const goToPreviousStep = () => {
    if (
      currentSubStep > 0 &&
      'subSteps' in steps[currentStep] &&
      steps[currentStep].subSteps &&
      steps[currentStep].subSteps.length > 0
    ) {
      setCurrentSubStep((prev) => prev - 1);
      return;
    }

    if (currentStep === 0) return;

    setCurrentStep((prev) => prev - 1);

    const previousStep = steps.at(currentStep - 1);
    if (previousStep && 'subSteps' in previousStep && previousStep.subSteps) {
      // Set substeps to the last substep of the previous step
      setCurrentSubStep(previousStep.subSteps.length - 1);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStep,
        currentSubStep,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
