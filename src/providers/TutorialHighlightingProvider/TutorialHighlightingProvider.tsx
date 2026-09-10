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
  /**
   * CSS selectors for elements that should stay clickable while a tutorial is showing,
   * everything else outside the tutorial popover is blocked
   */
  interactiveElementSelectors?: string[];
  /** Keep the page scrollable while a tutorial is showing, blocked by default */
  allowScrolling?: boolean;
}

export const TutorialHighlightingProvider: FC<
  TutorialHighlightingProviderProps
> = ({
  children,
  contentRef,
  customStepContent,
  interactiveElementSelectors = [],
  allowScrolling = false,
}) => (
  <TutorialHighlightingContext.Provider
    value={{ customStepContent: customStepContent ?? {} }}
  >
    <TutorialProvider>
      <TutorialHighlightingProviderInner
        contentRef={contentRef}
        interactiveElementSelectors={interactiveElementSelectors}
        allowScrolling={allowScrolling}
      >
        {children}
      </TutorialHighlightingProviderInner>
    </TutorialProvider>
  </TutorialHighlightingContext.Provider>
);
