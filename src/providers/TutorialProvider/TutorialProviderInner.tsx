import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';

import { Button, Typography } from '@equinor/eds-core-react';

import TutorialDialog from './TutorialDialog';
import { useTutorial } from './TutorialProvider';
import {
  HIGHLIGHT_PADDING,
  LOCALSTORAGE_VALUE_STRING,
} from './TutorialProvider.const';
import { useGetTutorialsForApp } from './TutorialProvider.hooks';
import { BrokenTutorialDialog, Highlighter } from './TutorialProvider.styles';
import { HighlightingInfo, Tutorial } from './TutorialProvider.types';

const TutorialProviderInner: FC = () => {
  const { pathname } = useLocation();
  const brokenTutorialDialogRef = useRef<HTMLDialogElement | null>(null);
  const {
    activeTutorial,
    setActiveTutorial,
    dialogRef,
    elementToHighlight,
    tutorialShortNameFromParams,
    customStepComponents,
    tutorialsFromProps,
  } = useTutorial();
  const hasStartedTutorial = useRef(false);
  const appTutorials = useGetTutorialsForApp(tutorialsFromProps);

  const hasRelevantCustomSteps = useMemo(() => {
    if (!activeTutorial) return true;
    const customKeysFromSteps = activeTutorial.steps
      .filter((step) => step.key !== undefined)
      .map((customStep) => customStep.key ?? '');
    if (customKeysFromSteps.length === 0) return true;

    const customKeysFromComponents = customStepComponents?.map(
      (stepComponent) => stepComponent.key
    );
    if (!customKeysFromComponents || customKeysFromComponents.length === 0)
      return false;

    const stepsHaveComponents = customKeysFromSteps.map((keyFromStep) =>
      customKeysFromComponents?.includes(keyFromStep)
    );

    const canShowTutorial = stepsHaveComponents.every((step) => step === true);
    if (canShowTutorial) {
      return true;
    } else {
      brokenTutorialDialogRef.current?.showModal();
      return false;
    }
  }, [activeTutorial, customStepComponents]);

  const highlightingInfo: HighlightingInfo | undefined = useMemo(() => {
    if (!elementToHighlight || !activeTutorial) return;

    const highlighterBoundingClient =
      elementToHighlight.getBoundingClientRect();

    return {
      top: highlighterBoundingClient.top - HIGHLIGHT_PADDING + window.scrollY,
      left: highlighterBoundingClient.left - HIGHLIGHT_PADDING,
      height: highlighterBoundingClient.height + HIGHLIGHT_PADDING * 2,
      width: highlighterBoundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [activeTutorial, elementToHighlight]);

  const tutorialsForPath = useMemo(() => {
    return appTutorials.filter((item) => item.path === pathname);
  }, [appTutorials, pathname]);

  const runTutorial = useCallback(
    (tutorialToRun: Tutorial) => {
      if (!tutorialShortNameFromParams || hasStartedTutorial.current) return;
      setActiveTutorial(tutorialToRun);
      hasStartedTutorial.current = true;
      dialogRef.current?.showModal();
      localStorage.setItem(
        tutorialShortNameFromParams,
        LOCALSTORAGE_VALUE_STRING
      );
      // TODO: keep this when deploying
      // searchParams.delete(TUTORIAL_SEARCH_PARAM_KEY);
      // setSearchParams(searchParams);
    },
    [dialogRef, setActiveTutorial, tutorialShortNameFromParams]
  );

  useEffect(() => {
    if (!hasRelevantCustomSteps) {
      console.error(
        'The tutorial that tried to run did could not find the relevant custom step components passed into the TutorialProvider. Please check that the key for the step match the relevant key in the customStepComponents array passed to the TutorialProvider'
      );
      brokenTutorialDialogRef.current?.showModal();
    }
  }, [hasRelevantCustomSteps, setActiveTutorial]);

  useEffect(() => {
    if (
      tutorialShortNameFromParams &&
      appTutorials.some(
        (item) => item.shortName === tutorialShortNameFromParams
      )
    ) {
      localStorage.removeItem(tutorialShortNameFromParams);
    }
  }, [
    activeTutorial,
    appTutorials,
    setActiveTutorial,
    tutorialShortNameFromParams,
  ]);

  useEffect(() => {
    if (tutorialsForPath.length < 1) return;

    const tutorialToRun = tutorialsForPath.find(
      (item) =>
        localStorage.getItem(item.shortName) !== LOCALSTORAGE_VALUE_STRING
    );
    if (tutorialToRun) {
      runTutorial(tutorialToRun);
    }
  }, [runTutorial, tutorialsForPath]);

  const handleOnClickBrokenTutorial = () => {
    brokenTutorialDialogRef.current?.close();

    setActiveTutorial(undefined);
  };

  if (!hasRelevantCustomSteps && activeTutorial) {
    return (
      <BrokenTutorialDialog ref={brokenTutorialDialogRef}>
        <Typography>
          There was a problem getting the custom components for this tutorial.
        </Typography>
        <Button variant="outlined" onClick={handleOnClickBrokenTutorial}>
          Close
        </Button>
      </BrokenTutorialDialog>
    );
  }

  return (
    <>
      {highlightingInfo && (
        <>
          <Highlighter
            $top={highlightingInfo.top}
            $left={highlightingInfo.left}
            $width={highlightingInfo.width}
            $height={highlightingInfo.height}
          />
        </>
      )}
      <TutorialDialog />
    </>
  );
};

export default TutorialProviderInner;
