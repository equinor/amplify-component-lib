import type { Editor } from '@tiptap/react';
import * as tiptapReact from '@tiptap/react';
import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from '@tiptap/suggestion';

import { MentionListRef } from 'src/organisms/Comments/mentions/MentionList';
import {
  getSuggestions,
  updatePosition,
} from 'src/organisms/Comments/mentions/suggestions';

interface MockRenderer {
  element: HTMLElement;
  ref: MentionListRef | undefined;
  updateProps: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
}

const { mockInstances } = vi.hoisted(() => ({
  mockInstances: [] as MockRenderer[],
}));

vi.mock('@tiptap/react', () => {
  class ReactRenderer implements MockRenderer {
    element = document.createElement('div');
    ref: MentionListRef | undefined = { onKeyDown: vi.fn(() => true) };
    updateProps = vi.fn();
    destroy = vi.fn();

    constructor() {
      mockInstances.push(this);
    }
  }

  const posToDOMRect = vi.fn(
    () => ({ left: 10, top: 100, bottom: 120, right: 60 }) as DOMRect
  );

  return { ReactRenderer, posToDOMRect, Editor: class {} };
});

const posToDOMRect = vi.mocked(tiptapReact.posToDOMRect);

const fakeEditor = {
  view: {},
  state: { selection: { from: 0, to: 0 } },
} as unknown as Editor;

function setViewport(width: number, height: number) {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    configurable: true,
    value: width,
  });
  Object.defineProperty(document.documentElement, 'clientHeight', {
    configurable: true,
    value: height,
  });
}

function makeElement(width: number, height: number): HTMLElement {
  const element = document.createElement('div');
  element.getBoundingClientRect = vi.fn(() => ({ width, height }) as DOMRect);
  return element;
}

function fakeProps(
  clientRect: SuggestionProps<string>['clientRect']
): SuggestionProps<string> {
  return {
    editor: fakeEditor,
    clientRect,
    query: '',
    text: '',
    range: { from: 0, to: 0 },
    command: vi.fn(),
    decorationNode: null,
    items: [],
  } as unknown as SuggestionProps<string>;
}

const rect = () => ({}) as DOMRect;

const keyDownProps = (key: string): SuggestionKeyDownProps =>
  ({ event: { key } }) as unknown as SuggestionKeyDownProps;

beforeEach(() => {
  mockInstances.length = 0;
  posToDOMRect.mockClear();
});

describe('updatePosition', () => {
  test('keeps default placement when the element fits', () => {
    posToDOMRect.mockReturnValueOnce({
      left: 10,
      top: 100,
      bottom: 120,
      right: 60,
    } as DOMRect);
    setViewport(1000, 800);
    const element = makeElement(50, 30);

    updatePosition(fakeEditor, element);

    expect(element.style.left).toBe('10px');
    expect(element.style.top).toBe('120px');
  });

  test('flips vertically and clamps horizontally when out of bounds', () => {
    posToDOMRect.mockReturnValueOnce({
      left: 990,
      top: 600,
      bottom: 780,
      right: 1040,
    } as DOMRect);
    setViewport(1000, 800);
    const element = makeElement(1200, 500);

    updatePosition(fakeEditor, element);

    expect(element.style.left).toBe('0px');
    expect(element.style.top).toBe('100px');
  });
});

describe('getSuggestions', () => {
  test('filters items case-insensitively and caps at 3', () => {
    const suggestion = getSuggestions(
      ['Ada', 'Alan', 'Albert', 'Alfred', 'Bob'],
      0
    )[0];

    expect(suggestion.items({ query: 'al' })).toEqual([
      'Alan',
      'Albert',
      'Alfred',
    ]);
  });

  test('onStart appends the element and sets zIndex', () => {
    const render = getSuggestions(['Ada'], 5)[0].render();

    render.onStart!(fakeProps(rect));

    const component = mockInstances[0];
    expect(document.body.contains(component.element)).toBe(true);
    expect(component.element.style.zIndex).toBe('6');
    expect(posToDOMRect).toHaveBeenCalled();
  });

  test('onStart returns early without a clientRect', () => {
    const render = getSuggestions(['Ada'], undefined)[0].render();

    render.onStart!(fakeProps(null));

    const component = mockInstances[0];
    expect(document.body.contains(component.element)).toBe(false);
    expect(component.element.style.zIndex).toBe('');
  });

  test('onUpdate updates props and repositions when a clientRect exists', () => {
    const renderer = getSuggestions(['Ada'], 0)[0].render();
    renderer.onStart!(fakeProps(rect));
    posToDOMRect.mockClear();

    const props = fakeProps(rect);
    renderer.onUpdate!(props);

    const component = mockInstances[0];
    expect(component.updateProps).toHaveBeenCalledWith(props);
    expect(posToDOMRect).toHaveBeenCalled();
  });

  test('onUpdate returns early without a clientRect', () => {
    const renderer = getSuggestions(['Ada'], 0)[0].render();
    renderer.onStart!(fakeProps(rect));
    posToDOMRect.mockClear();

    renderer.onUpdate!(fakeProps(null));

    expect(posToDOMRect).not.toHaveBeenCalled();
  });

  test('onKeyDown destroys the component on Escape', () => {
    const renderer = getSuggestions(['Ada'], 0)[0].render();
    renderer.onStart!(fakeProps(rect));

    const result = renderer.onKeyDown!(keyDownProps('Escape'));

    expect(result).toBe(true);
    expect(mockInstances[0].destroy).toHaveBeenCalled();
  });

  test('onKeyDown delegates other keys to the list ref', () => {
    const renderer = getSuggestions(['Ada'], 0)[0].render();
    renderer.onStart!(fakeProps(rect));

    const result = renderer.onKeyDown!(keyDownProps('ArrowDown'));

    expect(result).toBe(true);
    expect(mockInstances[0].ref?.onKeyDown).toHaveBeenCalled();
  });

  test('onKeyDown returns false when the list ref is missing', () => {
    const renderer = getSuggestions(['Ada'], 0)[0].render();
    renderer.onStart!(fakeProps(rect));
    mockInstances[0].ref = undefined;

    const result = renderer.onKeyDown!(keyDownProps('ArrowDown'));

    expect(result).toBe(false);
  });

  test('onExit destroys the component', () => {
    const renderer = getSuggestions(['Ada'], 0)[0].render();
    renderer.onStart!(fakeProps(rect));

    renderer.onExit!();

    expect(mockInstances[0].destroy).toHaveBeenCalled();
  });
});
