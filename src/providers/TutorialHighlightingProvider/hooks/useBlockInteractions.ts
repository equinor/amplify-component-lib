import { RefObject, useEffect } from 'react';

const BLOCKED_ATTRIBUTE = 'data-tutorial-blocked';
const INTERACTION_EVENTS = [
  'pointerdown',
  'pointerup',
  'mousedown',
  'mouseup',
  'click',
  'dblclick',
  'contextmenu',
  'touchstart',
  'touchend',
  'keydown',
];
const SCROLL_EVENTS = ['wheel', 'touchmove'];
const EVENT_OPTIONS = { capture: true, passive: false };

/**
 * Disables pointer events on the content, which also takes care of hover,
 * text selection and cursor styling. Only direct children are disabled so the content
 * itself stays scrollable, and the tutorial popover re-enables pointer events on itself
 */
function blockingStyles(selector: string) {
  return `
    [${BLOCKED_ATTRIBUTE}] > * {
      pointer-events: none;
    }
    ${
      selector
        ? `[${BLOCKED_ATTRIBUTE}] :is(${selector}) {
      pointer-events: auto;
    }`
        : ''
    }
  `;
}

interface UseBlockInteractionsProps {
  enabled: boolean;
  /** Element wrapping the app content, interactions inside it are blocked */
  contentRef: RefObject<HTMLElement | null>;
  /** Element that always stays interactive, usually the tutorial popover */
  allowedRef: RefObject<HTMLElement | null>;
  /** CSS selectors for elements that should stay interactive */
  allowedSelectors: string[];
  allowScrolling: boolean;
}

/**
 * Blocks interactions and scrolling outside of the tutorial popover while a tutorial
 * is showing, so the user can't interact with the app until the tutorial is done.
 *
 * Tabbing is left alone so keyboard users can still reach the popover
 */
export function useBlockInteractions({
  enabled,
  contentRef,
  allowedRef,
  allowedSelectors,
  allowScrolling,
}: UseBlockInteractionsProps) {
  const selector = allowedSelectors.join(', ');

  useEffect(() => {
    const content = contentRef.current;
    /* v8 ignore next */
    if (!enabled || !content) return;

    const style = document.createElement('style');
    style.textContent = blockingStyles(selector);
    content.setAttribute(BLOCKED_ATTRIBUTE, '');
    document.head.append(style);

    // Events are blocked as well, since styling can't reach elements rendered in
    // portals outside the content, and pointer events don't cover the keyboard
    const blockEvent = (event: Event) => {
      if ((event as KeyboardEvent).key === 'Tab') return;

      const target = event.target;
      if (target instanceof Element) {
        if (allowedRef.current?.contains(target)) return;
        if (selector && target.closest(selector)) return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    const eventTypes = allowScrolling
      ? INTERACTION_EVENTS
      : [...INTERACTION_EVENTS, ...SCROLL_EVENTS];

    for (const type of eventTypes) {
      document.addEventListener(type, blockEvent, EVENT_OPTIONS);
    }

    return () => {
      content.removeAttribute(BLOCKED_ATTRIBUTE);
      style.remove();
      for (const type of eventTypes) {
        document.removeEventListener(type, blockEvent, EVENT_OPTIONS);
      }
    };
  }, [allowScrolling, allowedRef, contentRef, enabled, selector]);
}
