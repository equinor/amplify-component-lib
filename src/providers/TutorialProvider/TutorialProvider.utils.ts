import { DIALOG_EDGE_MARGIN } from './TutorialProvider.const';
import { Tutorial, TutorialDialogPosition } from './TutorialProvider.types';

export const getMarginCss = (type: string) => {
  return `margin-${type}: ${DIALOG_EDGE_MARGIN}px; `;
};

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
  position: TutorialDialogPosition
) => {
  const isBottomPosition =
    position === TutorialDialogPosition.BOTTOM_RIGHT ||
    position === TutorialDialogPosition.BOTTOM_LEFT;

  const isRightPosition =
    position === TutorialDialogPosition.TOP_RIGHT ||
    position === TutorialDialogPosition.BOTTOM_RIGHT;

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
        TutorialDialogPosition.BOTTOM_RIGHT
      )
    )
  ) {
    return TutorialDialogPosition.BOTTOM_RIGHT;
  } else if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialDialogPosition.BOTTOM_LEFT
      )
    )
  ) {
    return TutorialDialogPosition.BOTTOM_LEFT;
  } else if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialDialogPosition.TOP_RIGHT
      )
    )
  ) {
    return TutorialDialogPosition.TOP_RIGHT;
  } else if (
    !doesBoundingRectOverlap(
      highlightedBoundingRect,
      getDialogBoundingRectForPosition(
        dialogBoundingRect,
        TutorialDialogPosition.TOP_LEFT
      )
    )
  ) {
    return TutorialDialogPosition.TOP_LEFT;
  }
  return TutorialDialogPosition.CENTER;
};

export const getAllElementsToHighlight = (activeTutorial: Tutorial) => {
  return activeTutorial.steps.map((_, index) =>
    document.getElementById(`${activeTutorial.shortName}-${index}`)
  );
};
