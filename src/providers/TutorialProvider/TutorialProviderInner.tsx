import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';

import { Button, Typography } from '@equinor/eds-core-react';

import TutorialDialog from './TutorialDialog';
import {
  HIGHLIGHT_PADDING,
  TUTORIAL_HIGHLIGHTER_DATATEST_ID,
} from './TutorialProvider.const';
import { useGetTutorialsForApp, useTutorial } from './TutorialProvider.hooks';
import { Highlighter, TutorialErrorDialog } from './TutorialProvider.styles';
import { HighlightingInfo } from './TutorialProvider.types';
import { Tutorial } from 'src/api';
import { EnvironmentType } from 'src/types/Environment';
import { environment } from 'src/utils/auth_environment';

const { getEnvironmentName } = environment;

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
    viewportWidth,
    setTutorialError,
    clearSearchParam,
  } = useTutorial();

  const hasStartedTutorial = useRef(false);
  const { data: tutorialsFromBackend } = useGetTutorialsForApp();

  const appTutorials = useMemo(() => {
    if (
      !tutorialsFromBackend &&
      (!tutorialsFromProps || tutorialsFromProps.length === 0)
    )
      return [];
    const allTutorials = [];
    if (tutorialsFromProps) {
      allTutorials.push(...tutorialsFromProps);
    }
    if (tutorialsFromBackend) {
      allTutorials.push(...tutorialsFromBackend);
    }
    return allTutorials;
  }, [tutorialsFromBackend, tutorialsFromProps]);

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
    return {
      top: highlighterBoundingClient.top - HIGHLIGHT_PADDING + window.scrollY,
      left: highlighterBoundingClient.left - HIGHLIGHT_PADDING,
      height: highlighterBoundingClient.height + HIGHLIGHT_PADDING * 2,
      width: highlighterBoundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [activeTutorial, allElementsToHighlight, currentStep, viewportWidth]);

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
    if (!highlightingInfo || dialogRef.current?.open) return;
    dialogRef.current?.showModal();
  }, [dialogRef, highlightingInfo]);

  useEffect(() => {
    if (tutorialsForPath.length < 1) return;
    const tutorialToRun = tutorialsForPath.find(
      (item) =>
        !window.localStorage.getItem(item.shortName) ||
        (shortNameFromParams &&
          tutorialsForPath.some(
            (item) => item.shortName === shortNameFromParams
          ))
    );
    if (tutorialToRun) {
      runTutorial(tutorialToRun);
    }
  }, [runTutorial, shortNameFromParams, tutorialsForPath]);

  const handleOnCloseBrokenTutorial = () => {
    clearSearchParam();
    setTutorialError(false);
    setActiveTutorial(undefined);
  };

  if (
    !activeTutorial?.showInProd &&
    getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME) ===
      EnvironmentType.PRODUCTION
  )
    return null;

  if (!activeTutorial?.willPopUp && !shortNameFromParams) return null;

  // Show error dialog if the user was expecting a tutorial (opened a link that had tutorial name as parameter)
  if (tutorialError && shortNameFromParams) {
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
          style={{
            top: `${highlightingInfo.top}px`,
            left: `${highlightingInfo.left}px`,
            width: `${highlightingInfo.width}px`,
            height: `${highlightingInfo.height}px`,
          }}
        />
      )}
      <TutorialDialog />
    </>
  );
};

export default TutorialProviderInner;
