import { createContext, FC, ReactElement, RefObject, useContext } from 'react';

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
  contentRef: RefObject<HTMLElement | null>;
  customStepContent?: Record<string, ReactElement>;
}

export const TutorialHighlightingProvider: FC<
  TutorialHighlightingProviderProps
> = ({ children, contentRef, customStepContent }) => (
  <TutorialHighlightingContext.Provider
    value={{ customStepContent: customStepContent ?? {} }}
  >
    <TutorialProvider>
      <TutorialHighlightingProviderInner contentRef={contentRef}>
        {children}
      </TutorialHighlightingProviderInner>
    </TutorialProvider>
  </TutorialHighlightingContext.Provider>
);
