import { FC, ReactElement, RefObject, useRef } from 'react';

import { useTutorials } from '@equinor/subsurface-app-management';

import { useBlockInteractions } from './hooks/useBlockInteractions';
import { useHighlightedTutorials } from './hooks/useHighlightedTutorials';
import { useReversedScrollY } from './hooks/useReversedScrollY';
import { useWindowSize } from './hooks/useWindowSize';
import { TutorialPopover } from './TutorialPopover/TutorialPopover';
import { TUTORIAL_HIGHLIGHT_ANIMATION_PROPS } from './TutorialHighlightingProvider.constants';
import {
  Centered,
  CustomScrimSvg,
} from './TutorialHighlightingProvider.styles';
import { highlightTutorialElementID } from 'src/atoms/utils/tutorials';

import { motion } from 'motion/react';

interface TutorialHighlightingProviderInnerProps {
  children: ReactElement | ReactElement[];
  contentRef: RefObject<HTMLElement | null>;
  interactiveElementSelectors: string[];
  allowScrolling: boolean;
}

export const TutorialHighlightingProviderInner: FC<
  TutorialHighlightingProviderInnerProps
> = ({ children, contentRef, interactiveElementSelectors, allowScrolling }) => {
  const { activeTutorial, activeStep, unseenTutorialsOnThisPage } =
    useTutorials();
  const popoverRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const reversedScrollY = useReversedScrollY(contentRef);
  const highlightedTutorials = useHighlightedTutorials(windowSize);

  const activeTutorials = activeTutorial
    ? [activeTutorial]
    : unseenTutorialsOnThisPage.filter(
        (tutorial) =>
          (tutorial.steps[0].highlightElement &&
            highlightedTutorials.some((tutorial) => tutorial.id)) ||
          !tutorial.steps[0].highlightElement
      );
  const isShowingTutorial = activeTutorials.length > 0;

  // Interactive tutorials expect the user to click the highlighted element
  const allowedSelectors =
    activeTutorial?.isInteractive && activeStep !== undefined
      ? [
          ...interactiveElementSelectors,
          `#${highlightTutorialElementID(activeTutorial.id, activeStep)}`,
        ]
      : interactiveElementSelectors;

  useBlockInteractions({
    enabled: isShowingTutorial,
    contentRef,
    allowedRef: popoverRef,
    allowedSelectors,
    allowScrolling,
  });

  if (!isShowingTutorial) return <>{children}</>;

  return (
    <>
      {children}
      <Centered ref={popoverRef}>
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
};
