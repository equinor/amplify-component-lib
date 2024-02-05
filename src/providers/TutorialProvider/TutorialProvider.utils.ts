import { DIALOG_EDGE_MARGIN } from './TutorialProvider.const';
import { Tutorial, TutorialPosition } from 'src/api';
/* c8 ignore start */
const doesBoundingRectOverlap = (
  boundingRect1: DOMRect,
  boundingRect2: DOMRect
) => {
  return !(
    boundingRect1.top > boundingRect2.bottom ||
    boundingRect1.bottom < boundingRect2.top ||
    boundingRect1.right < boundingRect2.left ||
    boundingRect1.left > boundingRect2.right
  );
};

const getDialogBoundingRectForPosition = (
  dialogBoundingRect: DOMRect,
  position: TutorialPosition
) => {
  const isBottomPosition =
    position === TutorialPosition.BOTTOM_RIGHT ||
    position === TutorialPosition.BOTTOM_LEFT;

  const isRightPosition =
    position === TutorialPosition.TOP_RIGHT ||
    position === TutorialPosition.BOTTOM_RIGHT;

  const rightPositionX =
    innerWidth - DIALOG_EDGE_MARGIN - dialogBoundingRect.width;
  const bottomPositionY =
    innerHeight - DIALOG_EDGE_MARGIN - dialogBoundingRect.height;

  return new DOMRect(
    isRightPosition ? rightPositionX : DIALOG_EDGE_MARGIN,
    isBottomPosition ? bottomPositionY : DIALOG_EDGE_MARGIN,
    dialogBoundingRect.width,
    dialogBoundingRect.height
  );
};

export const getBestPositionWithoutOverlap = (
  highlightedBoundingRect: DOMRect,
  dialogBoundingRect: DOMRect
) => {
  if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialPosition.BOTTOM_RIGHT
      )
    )
  ) {
    return TutorialPosition.BOTTOM_RIGHT;
  } else if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialPosition.BOTTOM_LEFT
      )
    )
  ) {
    return TutorialPosition.BOTTOM_LEFT;
  } else if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialPosition.TOP_RIGHT
      )
    )
  ) {
    return TutorialPosition.TOP_RIGHT;
  } else if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialPosition.TOP_LEFT
      )
    )
  ) {
    return TutorialPosition.TOP_LEFT;
  }
  return TutorialPosition.BOTTOM_RIGHT;
};
/* c8 ignore end */

export const getAllElementsToHighlight = (activeTutorial: Tutorial) => {
  return activeTutorial.steps.map((_, index) =>
    document.getElementById(`${activeTutorial.shortName}-${index}`)
  );
};
