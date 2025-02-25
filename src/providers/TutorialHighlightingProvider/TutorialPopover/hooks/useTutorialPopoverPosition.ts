import { useReversedScrollY } from 'src/providers/TutorialHighlightingProvider/hooks/useReversedScrollY';

import { MotionStyle, useTransform } from 'framer-motion';

const CARET_OFFSET = 16;

interface UseTutorialPopoverPositionArgs {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  popoverSize?: {
    width: number;
    height: number;
  };
}

export interface UseTutorialPopoverPositionReturn {
  style: MotionStyle;
  highlightingElement: boolean;
  highlightDirection: 'top' | 'bottom' | 'left' | 'right';
}

export function useTutorialPopoverPosition({
  top,
  left,
  width,
  height,
  popoverSize,
}: UseTutorialPopoverPositionArgs): UseTutorialPopoverPositionReturn {
  const reversedScrollY = useReversedScrollY();
  let usingTop = top && height ? top + height + CARET_OFFSET : undefined;
  let usingLeft = left && width ? left + width / 2 : undefined;
  const highlightingElement = !!usingTop && !!usingLeft;
  let highlightDirection: UseTutorialPopoverPositionReturn['highlightDirection'] =
    'top';

  // Overflowing to the bottom
  if (
    popoverSize &&
    top &&
    height &&
    usingTop &&
    usingTop + popoverSize.height > window.innerHeight
  ) {
    usingTop = top - popoverSize.height - height - CARET_OFFSET * 2.5;
    highlightDirection = 'bottom';
  }

  // Overflowing to the left
  if (
    top &&
    height &&
    left &&
    width &&
    popoverSize &&
    usingLeft &&
    usingLeft - popoverSize.width / 2 < 0
  ) {
    usingLeft = left + width + popoverSize.width / 2 + CARET_OFFSET;
    usingTop = top - popoverSize.height / 2 - CARET_OFFSET / 4;
    highlightDirection = 'left';
  }

  if (
    top &&
    height &&
    left &&
    width &&
    popoverSize &&
    usingLeft &&
    usingLeft + popoverSize.width > window.innerWidth
  ) {
    usingLeft = left - popoverSize.width / 2 - CARET_OFFSET;
    usingTop = top - popoverSize.height / 2 - CARET_OFFSET / 4;
    highlightDirection = 'right';
  }

  const transformedTop = useTransform(reversedScrollY, (value) => {
    if (!highlightingElement || !usingTop) return null;
    return value + usingTop;
  });

  return {
    style: {
      position: highlightingElement ? 'absolute' : undefined,
      top: transformedTop,
      left: usingLeft,
    },
    highlightingElement,
    highlightDirection,
  };
}
