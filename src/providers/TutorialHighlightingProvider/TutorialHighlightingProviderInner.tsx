import { FC, ReactElement, useCallback, useEffect, useState } from 'react';

import {
  MyTutorialDto,
  useTutorials,
} from '@equinor/subsurface-app-management';

import { TutorialPopover } from './TutorialPopover/TutorialPopover';
import { TUTORIAL_HIGHLIGHT_ANIMATION_PROPS } from './TutorialHighlightingProvider.constants';
import { spacings } from 'src/atoms/style';
import {
  getHighlightElementBoundingBox,
  TutorialHighlight,
} from 'src/atoms/utils/tutorials';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const CustomScrimSvg = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999999;
  pointer-events: none;
`;

const Wrapper = styled.div`
  max-width: inherit;
  max-height: inherit;
`;

const Centered = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  z-index: 99999999;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

interface TutorialHighlightingProviderInnerProps {
  children: ReactElement | ReactElement[];
}

export const TutorialHighlightingProviderInner: FC<
  TutorialHighlightingProviderInnerProps
> = ({ children }) => {
  const { activeTutorial, activeStep, unseenTutorialsOnThisPage } =
    useTutorials();
  const [highlightedTutorials, setHighlightedTutorials] = useState<
    TutorialHighlight[]
  >([]);

  const activeTutorials = activeTutorial
    ? [activeTutorial]
    : unseenTutorialsOnThisPage;

  const handleSetHighlighted = useCallback(
    async ({
      currentActiveTutorial,
      currentActiveStep,
      currentUnseenTutorials,
    }: {
      currentActiveTutorial: MyTutorialDto | undefined;
      currentActiveStep: number | undefined;
      currentUnseenTutorials: MyTutorialDto[];
    }) => {
      if (currentActiveTutorial && currentActiveStep !== undefined) {
        if (!currentActiveTutorial.steps[currentActiveStep].highlightElement)
          return [];

        const highlight = await getHighlightElementBoundingBox(
          currentActiveTutorial.id,
          currentActiveStep
        );

        if (highlight !== undefined) {
          setHighlightedTutorials([highlight]);
        } else {
          setHighlightedTutorials([]);
        }

        return;
      }

      const newHighlights = await Promise.all(
        currentUnseenTutorials.map(async (tutorial) => {
          if (!tutorial.steps.at(0)?.highlightElement) return undefined;

          return getHighlightElementBoundingBox(tutorial.id, 0);
        })
      ).then((result) => result.filter((value) => value !== undefined));

      setHighlightedTutorials(newHighlights);
    },

    []
  );

  useEffect(() => {
    handleSetHighlighted({
      currentActiveTutorial: activeTutorial,
      currentActiveStep: activeStep,
      currentUnseenTutorials: unseenTutorialsOnThisPage,
    });
  }, [
    activeStep,
    activeTutorial,
    handleSetHighlighted,
    unseenTutorialsOnThisPage,
  ]);

  if (activeTutorials.length > 0) {
    return (
      <>
        <Wrapper>{children}</Wrapper>
        <Centered>
          {activeTutorials.map((tutorial) => {
            const highlight = highlightedTutorials.find(
              (item) => item.id === tutorial.id
            );

            return (
              <TutorialPopover
                key={tutorial.id}
                isHighlighting={highlightedTutorials.length > 0}
                {...tutorial}
                {...highlight}
              />
            );
          })}
        </Centered>
        <CustomScrimSvg>
          <mask id="tutorials-rectangles">
            <rect width="100%" height="100%" fill="white" />
            {highlightedTutorials.map((tutorial) => (
              <motion.path
                key={tutorial.id}
                data-testid={`tutorial-mask-${tutorial.id}`}
                initial={{
                  opacity: 0,
                  d: `M ${tutorial.left} ${tutorial.top} h ${tutorial.width} v ${tutorial.height} h -${tutorial.width} Z`,
                }}
                animate={{
                  opacity: 1,
                  d: `M ${tutorial.left} ${tutorial.top} h ${tutorial.width} v ${tutorial.height} h -${tutorial.width} Z`,
                }}
                fill="black"
              />
            ))}
          </mask>

          <motion.rect
            width="100%"
            height="100%"
            fill="rgba(111, 111, 111, 0.35)"
            mask="url(#tutorials-rectangles)"
            {...TUTORIAL_HIGHLIGHT_ANIMATION_PROPS}
          />
        </CustomScrimSvg>
      </>
    );
  }

  return <>{children}</>;
};
