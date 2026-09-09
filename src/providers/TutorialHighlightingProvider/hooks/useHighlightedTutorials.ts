import { useEffect, useState } from 'react';

import { useTutorials } from '@equinor/subsurface-app-management';
import { useIsFetching } from '@tanstack/react-query';

import { WindowSize } from './useWindowSize';
import {
  getHighlightElementBoundingBox,
  TutorialHighlight,
} from 'src/atoms/utils/tutorials';

export function useHighlightedTutorials(
  windowSize: WindowSize
): TutorialHighlight[] {
  const { activeTutorial, activeStep, unseenTutorialsOnThisPage } =
    useTutorials();
  const isFetching = useIsFetching() > 0;
  const [highlightedTutorials, setHighlightedTutorials] = useState<
    TutorialHighlight[]
  >([]);

  useEffect(() => {
    if (isFetching) return;

    const findHighlightedTutorials = async () => {
      if (activeTutorial && activeStep !== undefined) {
        if (!activeTutorial.steps[activeStep].highlightElement)
          return setHighlightedTutorials([]);

        const highlight = await getHighlightElementBoundingBox(
          activeTutorial.id,
          activeStep,
          windowSize
        );

        return setHighlightedTutorials(highlight ? [highlight] : []);
      }

      const unseen = await Promise.all(
        unseenTutorialsOnThisPage.map((tutorial) => {
          if (!tutorial.steps.at(0)?.highlightElement) return undefined;

          return getHighlightElementBoundingBox(tutorial.id, 0, windowSize);
        })
      );
      return setHighlightedTutorials(
        unseen.filter((value) => value !== undefined)
      );
    };

    findHighlightedTutorials();
  }, [
    activeStep,
    activeTutorial,
    isFetching,
    unseenTutorialsOnThisPage,
    windowSize,
  ]);

  return highlightedTutorials;
}
