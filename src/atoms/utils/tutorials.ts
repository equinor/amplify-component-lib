/**
 *
 * @param tutorialId - ID of the relevant tutorial in SAM
 * @param stepNum - Which step in the tutorial, starts at 0
 */
export function highlightTutorialElementID(
  tutorialId: string,
  stepNum: number
): string {
  if (stepNum < 0) {
    throw new Error(
      `[TutorialHighlightingProvider]: stepNum must be greater than or equal to 0, received ${stepNum}`
    );
  }
  return `sam-tutorial-${tutorialId}-${stepNum}`;
}

const HIGHLIGHT_OFFSET = 5;

export interface TutorialHighlight
  extends Pick<DOMRect, 'top' | 'left' | 'height' | 'width'> {
  id: string;
}

export async function getHighlightElementBoundingBox(
  tutorialId: string,
  stepNum: number,
  windowSize: { width: number; height: number }
): Promise<TutorialHighlight | undefined> {
  const usingId = highlightTutorialElementID(tutorialId, stepNum);
  let element = document.getElementById(usingId);
  let failed = false;

  while (!element && !failed) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    element = document.getElementById(usingId);
    failed = true;
  }

  if (!element) {
    console.warn(
      `[TutorialHighlightingProvider]: Element with ID ${usingId} not found`
    );
    return;
  }

  const rect = element.getBoundingClientRect();
  // Assume we always have 1 div with id 'content' that scrolls (Template.Content)
  const scrollOffset = document.getElementById('content')!.scrollTop;

  // Subtract scroll offset
  if (
    rect.top <= 0 ||
    rect.left <= 0 ||
    rect.bottom >= windowSize.height ||
    rect.right >= windowSize.width
  ) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return {
    id: tutorialId,
    top: rect.top - HIGHLIGHT_OFFSET + scrollOffset,
    left: rect.left - HIGHLIGHT_OFFSET,
    width: rect.width + HIGHLIGHT_OFFSET * 2,
    height: rect.height + HIGHLIGHT_OFFSET * 2,
  };
}
