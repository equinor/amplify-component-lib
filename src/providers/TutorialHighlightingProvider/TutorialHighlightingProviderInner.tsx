import { FC, ReactElement, RefObject, useEffect, useState } from 'react';

import { useTutorials } from '@equinor/subsurface-app-management';
import { useIsFetching } from '@tanstack/react-query';

import { useReversedScrollY } from './hooks/useReversedScrollY';
import { TutorialPopover } from './TutorialPopover/TutorialPopover';
import { TUTORIAL_HIGHLIGHT_ANIMATION_PROPS } from './TutorialHighlightingProvider.constants';
import { spacings } from 'src/atoms/style';
import {
  getHighlightElementBoundingBox,
  TutorialHighlight,
} from 'src/atoms/utils/tutorials';

import { motion } from 'motion/react';
import styled from 'styled-components';

const CustomScrimSvg = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999999;
  background: none;
  pointer-events: none;
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
  background: none;
  pointer-events: none;
`;

interface TutorialHighlightingProviderInnerProps {
  children: ReactElement | ReactElement[];
  contentRef: RefObject<HTMLElement | null>;
}

export const TutorialHighlightingProviderInner: FC<
  TutorialHighlightingProviderInnerProps
> = ({ children, contentRef }) => {
  const { activeTutorial, activeStep, unseenTutorialsOnThisPage } =
    useTutorials();
  const isFetching = useIsFetching() > 0;
  const reversedScrollY = useReversedScrollY(contentRef);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleOnResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleOnResize);
    return () => window.removeEventListener('resize', handleOnResize);
  }, []);

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

        if (highlight) {
          return setHighlightedTutorials([highlight]);
        }
        return setHighlightedTutorials([]);
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

  const activeTutorials = activeTutorial
    ? [activeTutorial]
    : unseenTutorialsOnThisPage.filter(
        (tutorial) =>
          (tutorial.steps[0].highlightElement &&
            highlightedTutorials.some((tutorial) => tutorial.id)) ||
          !tutorial.steps[0].highlightElement
      );

  if (activeTutorials.length > 0) {
    return (
      <>
        {children}
        <Centered>
          {activeTutorials.map((tutorial) => {
            const highlight = highlightedTutorials.find(
              (item) => item.id === tutorial.id
            );

            return (
              <TutorialPopover
                key={tutorial.id}
                isHighlighting={highlightedTutorials.length > 0}
                contentRef={contentRef}
                {...tutorial}
                {...highlight}
              />
            );
          })}
        </Centered>
        <CustomScrimSvg>
          <mask id="tutorials-rectangles">
            <rect width="100%" height="100%" fill="white" />
            <motion.g
              style={{
                translateY: reversedScrollY,
              }}
            >
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
            </motion.g>
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
