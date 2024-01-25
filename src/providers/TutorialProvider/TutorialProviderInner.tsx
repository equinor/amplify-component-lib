import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';

import { Button, Typography } from '@equinor/eds-core-react';

import TutorialDialog from './TutorialDialog';
import { useTutorial } from './TutorialProvider';
import {
  HIGHLIGHT_PADDING,
  LOCALSTORAGE_VALUE_STRING,
  TUTORIAL_SEARCH_PARAM_KEY,
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
    allElementsToHighlight,
    tutorialShortNameFromParams,
    tutorialError,
    tutorialsFromProps,
    tutorialWasStartedFromParam,
    currentStep,
    searchParams,
    setSearchParams,
  } = useTutorial();

  const hasStartedTutorial = useRef(false);
  const appTutorials = useGetTutorialsForApp(tutorialsFromProps);

  const highlightingInfo: HighlightingInfo | undefined = useMemo(() => {
    if (!allElementsToHighlight || !activeTutorial) return;

    const highlighterBoundingClient =
      allElementsToHighlight[currentStep].getBoundingClientRect();

    return {
      top: highlighterBoundingClient.top - HIGHLIGHT_PADDING + window.scrollY,
      left: highlighterBoundingClient.left - HIGHLIGHT_PADDING,
      height: highlighterBoundingClient.height + HIGHLIGHT_PADDING * 2,
      width: highlighterBoundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [activeTutorial, allElementsToHighlight, currentStep]);

  const tutorialsForPath = useMemo(() => {
    return appTutorials.filter((item) => item.path === pathname);
  }, [appTutorials, pathname]);

  const runTutorial = useCallback(
    (tutorialToRun: Tutorial) => {
      if (hasStartedTutorial.current) return;
      setActiveTutorial(tutorialToRun);
      hasStartedTutorial.current = true;
      dialogRef.current?.showModal();
      // TODO: keep this when deploying
      searchParams.delete(TUTORIAL_SEARCH_PARAM_KEY);
      setSearchParams(searchParams);
    },
    [dialogRef, searchParams, setActiveTutorial, setSearchParams]
  );

  const shouldShowErrorDialog = useMemo(() => {
    const shouldShow = tutorialError && tutorialWasStartedFromParam.current;
    if (shouldShow) {
      brokenTutorialDialogRef.current?.showModal();
    }
    return shouldShow;
  }, [tutorialError, tutorialWasStartedFromParam]);

  useEffect(() => {
    if (
      tutorialShortNameFromParams &&
      appTutorials.some(
        (item) => item.shortName === tutorialShortNameFromParams
      )
    ) {
      tutorialWasStartedFromParam.current = true;
      window.localStorage.removeItem(tutorialShortNameFromParams);
    }
  }, [
    activeTutorial,
    appTutorials,
    setActiveTutorial,
    tutorialShortNameFromParams,
    tutorialWasStartedFromParam,
  ]);

  useEffect(() => {
    if (tutorialsForPath.length < 1) return;

    const tutorialToRun = tutorialsForPath.find(
      (item) =>
        window.localStorage.getItem(item.shortName) !==
        LOCALSTORAGE_VALUE_STRING
    );

    if (tutorialToRun) {
      runTutorial(tutorialToRun);
    }
  }, [runTutorial, tutorialsForPath]);

  const handleOnClickBrokenTutorial = () => {
    brokenTutorialDialogRef.current?.close();
    setActiveTutorial(undefined);
  };

  // Show error dialog if the user was expecting a tutorial (opened a link that had tutorial name as parameter)
  if (shouldShowErrorDialog) {
    return (
      <BrokenTutorialDialog ref={brokenTutorialDialogRef}>
        <Typography>
          There was a problem getting the custom components for this tutorial.
          Please report this in using the feedback function in the Top Bar.
        </Typography>
        <Button variant="outlined" onClick={handleOnClickBrokenTutorial}>
          Close
        </Button>
      </BrokenTutorialDialog>
    );
  }

  // Show nothing if tutorial has error, but user did not know that a tutorial tried to play (There is a console.error when tutorial error is set to true)
  if (tutorialError) return null;

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
