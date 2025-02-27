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

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right';

export interface UseTutorialPopoverPositionReturn {
  style: MotionStyle;
  highlightingElement: boolean;
  caretPosition:
    | VerticalPosition
    | HorizontalPosition
    | `${VerticalPosition}-${HorizontalPosition}`;
}

export function useTutorialPopoverPosition({
  top,
  left,
  width,
  height,
  popoverSize,
}: UseTutorialPopoverPositionArgs): UseTutorialPopoverPositionReturn {
  const reversedScrollY = useReversedScrollY();
  // Default position of the popover is that it's under the highlighted element
  let usingTop = top && height ? top + height + CARET_OFFSET : undefined;
  let usingLeft = left && width ? left + width / 2 : undefined;
  const highlightingElement = !!usingTop && !!usingLeft;
  let caretPosition: UseTutorialPopoverPositionReturn['caretPosition'] = 'top';

  const minLeft = (popoverSize?.width ?? 0) / 2 + CARET_OFFSET;
  const minTop = CARET_OFFSET * 2;
  const maxLeft = window.innerWidth - CARET_OFFSET;
  const maxTop = window.innerHeight - CARET_OFFSET;

  const overflowingLeft =
    top !== undefined &&
    height !== undefined &&
    left !== undefined &&
    width !== undefined &&
    usingLeft !== undefined &&
    popoverSize !== undefined &&
    usingLeft < popoverSize.width / 2;
  const overflowingRight =
    top !== undefined &&
    height !== undefined &&
    left !== undefined &&
    width !== undefined &&
    usingLeft !== undefined &&
    popoverSize !== undefined &&
    usingLeft + popoverSize.width > window.innerWidth;

  if (overflowingLeft) {
    usingLeft = left + width + popoverSize.width / 2 + CARET_OFFSET;
    usingTop = top - popoverSize.height / 2 - CARET_OFFSET / 4;
    caretPosition = 'left';
  } else if (overflowingRight) {
    usingLeft = left - popoverSize.width / 2 - CARET_OFFSET;
    usingTop = top - popoverSize.height / 2 - CARET_OFFSET / 4;
    caretPosition = 'right';
  }

  const overflowingBottom =
    top !== undefined &&
    height !== undefined &&
    usingTop !== undefined &&
    popoverSize !== undefined &&
    usingTop + popoverSize.height > window.innerHeight;
  const overflowingTop =
    top !== undefined &&
    height !== undefined &&
    usingTop !== undefined &&
    popoverSize !== undefined &&
    usingTop < popoverSize.height;

  if (overflowingTop && overflowingLeft) {
    usingTop = top + height + CARET_OFFSET;
    usingLeft = left + popoverSize?.width / 2;
    caretPosition = 'top-left';
  } else if (overflowingTop && overflowingRight) {
    // need to position bottom to bottom left
    usingTop = top + height + CARET_OFFSET;
    usingLeft = left + width - popoverSize?.width / 2;
    caretPosition = 'top-right';
  }

  if (overflowingBottom) {
    usingTop = top - height * 2 - popoverSize.height - CARET_OFFSET;
  }

  if (overflowingBottom && overflowingLeft) {
    caretPosition = 'bottom-left';
  } else if (overflowingBottom && overflowingRight) {
    caretPosition = 'bottom-right';
  } else if (overflowingBottom) {
    caretPosition = 'bottom';
  }

  const transformedTop = useTransform(reversedScrollY, (value) => {
    if (!highlightingElement || !usingTop) return null;
    const newValue = value + usingTop;

    if (newValue < minTop) return minTop;
    if (newValue > maxTop) return maxTop;
    return newValue;
  });

  if (usingLeft && usingLeft < minLeft) {
    usingLeft = minLeft;
  } else if (usingLeft && usingLeft > maxLeft) {
    usingLeft = maxLeft;
  }

  return {
    style: {
      position: highlightingElement ? 'absolute' : undefined,
      top: transformedTop,
      left: usingLeft,
    },
    highlightingElement,
    caretPosition,
  };
}
