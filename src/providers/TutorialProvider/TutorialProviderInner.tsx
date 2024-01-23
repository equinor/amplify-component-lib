import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';

import { Button, Typography } from '@equinor/eds-core-react';

import TutorialDialog from './TutorialDialog';
import { useTutorial } from './TutorialProvider';
import { HIGHLIGHT_PADDING } from './TutorialProvider.const';
import { useGetTutorialsForApp } from './TutorialProvider.hooks';
import { BrokenTutorialDialog, Highlighter } from './TutorialProvider.styles';
import {
  CustomTutorialComponent,
  HighlightingInfo,
  Tutorial,
} from './TutorialProvider.types';

interface TutorialProviderInnerProps {
  customStepComponents?: Array<CustomTutorialComponent>;
}

const TutorialProviderInner: FC<TutorialProviderInnerProps> = ({
  customStepComponents,
}) => {
  const { pathname } = useLocation();
  const brokenTutorialDialogRef = useRef<HTMLDialogElement | null>(null);
  const {
    activeTutorial,
    setActiveTutorial,
    dialogRef,
    elementToHighlight,
    tutorialShortNameFromParams,
  } = useTutorial();
  const hasStartedTutorial = useRef(false);
  const appTutorials = useGetTutorialsForApp();

  const hasRelevantCustomSteps = useMemo(() => {
    if (!activeTutorial) return;
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
    if (!elementToHighlight) return;

    const highlighterBoundingClient =
      elementToHighlight.getBoundingClientRect();

    return {
      top: highlighterBoundingClient.top - HIGHLIGHT_PADDING + window.scrollY,
      left: highlighterBoundingClient.left - HIGHLIGHT_PADDING,
      height: highlighterBoundingClient.height + HIGHLIGHT_PADDING * 2,
      width: highlighterBoundingClient.width + HIGHLIGHT_PADDING * 2,
    };
  }, [elementToHighlight]);

  const tutorialsForPath = useMemo(() => {
    return appTutorials.filter((item) => item.path === pathname);
  }, [appTutorials, pathname]);

  const runTutorial = useCallback(
    (tutorialToRun: Tutorial) => {
      if (!tutorialShortNameFromParams || hasStartedTutorial.current) return;
      setActiveTutorial(tutorialToRun);
      hasStartedTutorial.current = true;
      dialogRef.current?.showModal();
      localStorage.setItem(tutorialShortNameFromParams, 'true');
      // TODO: keep this when deploying
      // searchParams.delete(TUTORIAL_SEARCH_PARAM_KEY);
      // setSearchParams(searchParams);
    },
    [dialogRef, setActiveTutorial, tutorialShortNameFromParams]
  );

  useEffect(() => {
    if (!hasRelevantCustomSteps) {
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
      (item) => localStorage.getItem(item.shortName) !== 'true'
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
          The tutorial you tried to open is broken. Please submit this feedback
          using the Resources menu in the topbar
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
