import { createContext, FC, ReactElement, useContext } from 'react';

import { TutorialProvider } from '@equinor/subsurface-app-management';

import { TutorialHighlightingProviderInner } from './TutorialHighlightingProviderInner';

interface TutorialHighlightingContextType {
  customStepContent: Record<string, ReactElement>;
}

const TutorialHighlightingContext = createContext<
  TutorialHighlightingContextType | undefined
>(undefined);

export function useTutorialHighlighting() {
  const context = useContext(TutorialHighlightingContext);
  if (!context) {
    throw new Error(
      'useTutorialHighlighting must be used within a TutorialHighlightingProvider'
    );
  }
  return context;
}

interface TutorialHighlightingProviderProps {
  children: ReactElement | ReactElement[];
  customStepContent?: Record<string, ReactElement>;
}

export const TutorialHighlightingProvider: FC<
  TutorialHighlightingProviderProps
> = ({ children, customStepContent }) => (
  <TutorialHighlightingContext.Provider
    value={{ customStepContent: customStepContent ?? {} }}
  >
    <TutorialProvider>
      <TutorialHighlightingProviderInner>
        {children}
      </TutorialHighlightingProviderInner>
    </TutorialProvider>
  </TutorialHighlightingContext.Provider>
);
