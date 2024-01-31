import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';

import { Button, Typography } from '@equinor/eds-core-react';

import TutorialDialog from './TutorialDialog';
import { useTutorial } from './TutorialProvider';
import {
  HIGHLIGHT_PADDING,
  TUTORIAL_HIGHLIGHTER_DATATEST_ID,
  TUTORIAL_LOCALSTORAGE_VALUE_STRING,
} from './TutorialProvider.const';
import { useGetTutorialsForApp } from './TutorialProvider.hooks';
import { Highlighter, TutorialErrorDialog } from './TutorialProvider.styles';
import { HighlightingInfo, Tutorial } from './TutorialProvider.types';

const TutorialProviderInner: FC = () => {
  const { pathname } = useLocation();
  const {
    activeTutorial,
    setActiveTutorial,
    dialogRef,
    allElementsToHighlight,
    shortNameFromParams,
    tutorialError,
    tutorialsFromProps,
    currentStep,
    clearSearchParam,
    viewportWidth,
    setTutorialError,
  } = useTutorial();

  const hasStartedTutorial = useRef(false);
  const appTutorials = useGetTutorialsForApp(tutorialsFromProps);

  const highlightingInfo: HighlightingInfo | undefined = useMemo(() => {
    if (!allElementsToHighlight || !activeTutorial || !viewportWidth) return;
    const currentElementToHighlight = allElementsToHighlight[currentStep];

    const highlighterBoundingClient =
      currentElementToHighlight.getBoundingClientRect();

    if (currentElementToHighlight) {
      currentElementToHighlight.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    clearSearchParam();
    return {
      top: highlighterBoundingClient.top - HIGHLIGHT_PADDING + window.scrollY,
      left: highlighterBoundingClient.left - HIGHLIGHT_PADDING,
      height: highlighterBoundingClient.height + HIGHLIGHT_PADDING * 2,
      width: highlighterBoundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [
    activeTutorial,
    allElementsToHighlight,
    clearSearchParam,
    currentStep,
    viewportWidth,
  ]);

  const tutorialsForPath = useMemo(() => {
    return appTutorials.filter((item) => item.path === pathname);
  }, [appTutorials, pathname]);

  const runTutorial = useCallback(
    (tutorialToRun: Tutorial) => {
      if (hasStartedTutorial.current) return;
      setActiveTutorial(tutorialToRun);
      hasStartedTutorial.current = true;
    },
    [setActiveTutorial]
  );

  useEffect(() => {
    if (activeTutorial) return;
    if (
      shortNameFromParams.current &&
      tutorialsForPath.some(
        (item) => item.shortName === shortNameFromParams.current
      )
    ) {
      window.localStorage.removeItem(shortNameFromParams.current);
    }
  }, [
    activeTutorial,
    appTutorials,
    setActiveTutorial,
    shortNameFromParams,
    tutorialsForPath,
  ]);

  useEffect(() => {
    if (!highlightingInfo || dialogRef.current?.open) return;
    dialogRef.current?.showModal();
  }, [dialogRef, highlightingInfo]);

  useEffect(() => {
    if (tutorialsForPath.length < 1) return;

    const tutorialToRun = tutorialsForPath.find(
      (item) =>
        window.localStorage.getItem(item.shortName) !==
        TUTORIAL_LOCALSTORAGE_VALUE_STRING
    );

    if (tutorialToRun) {
      runTutorial(tutorialToRun);
    }
  }, [runTutorial, tutorialsForPath]);

  const handleOnCloseBrokenTutorial = () => {
    setTutorialError(false);
    setActiveTutorial(undefined);
    clearSearchParam();
  };

  // Show error dialog if the user was expecting a tutorial (opened a link that had tutorial name as parameter)
  if (tutorialError && shortNameFromParams.current) {
    return (
      <TutorialErrorDialog
        open
        isDismissable
        onClose={handleOnCloseBrokenTutorial}
      >
        <Typography>
          There was a problem starting this tutorial. Please report this in
          using the feedback function in the Top Bar.
        </Typography>
        <Button variant="outlined" onClick={handleOnCloseBrokenTutorial}>
          Close
        </Button>
      </TutorialErrorDialog>
    );
  }

  // Show nothing if tutorial has error, but user did not know that a tutorial tried to play (There is a console.error when tutorial error is set to true)
  if (tutorialError) return null;

  return (
    <>
      {highlightingInfo && (
        <Highlighter
          data-testid={TUTORIAL_HIGHLIGHTER_DATATEST_ID}
          $top={highlightingInfo.top}
          $left={highlightingInfo.left}
          $width={highlightingInfo.width}
          $height={highlightingInfo.height}
        />
      )}
      <TutorialDialog />
    </>
  );
};

export default TutorialProviderInner;
