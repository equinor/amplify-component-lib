import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';

import {
  CARET_OFFSET,
  useTutorialPopoverPosition,
} from './useTutorialPopoverPosition';

test("Caps top if it's more than max", () => {
  const { result } = renderHook(() =>
    useTutorialPopoverPosition({
      contentRef: { current: null },
      top: window.innerHeight + 200000,
      left: 1000,
      width: 100,
      height: 100,
      popoverSize: { width: 200, height: 300 },
    })
  );

  expect(result.current.style.top).toHaveProperty(
    'current',
    window.innerHeight - CARET_OFFSET
  );
});

test("Caps top if it's less than min", () => {
  const { result } = renderHook(() =>
    useTutorialPopoverPosition({
      contentRef: { current: null },
      top: -100,
      left: 1000,
      width: 100,
      height: 100,
      popoverSize: { width: 200, height: 300 },
    })
  );

  expect(result.current.style.top).toHaveProperty('current', CARET_OFFSET * 2);
});

test("Caps left if it's less than min", () => {
  const popoverSize = {
    width: faker.number.int({ min: 100, max: 400 }),
    height: faker.number.int({ min: 100, max: 400 }),
  };
  const { result } = renderHook(() =>
    useTutorialPopoverPosition({
      contentRef: { current: null },
      top: 100,
      left: -1000,
      width: 100,
      height: 100,
      popoverSize,
    })
  );

  expect(result.current.style.left).toBe(CARET_OFFSET + popoverSize.width / 2);
});

test("Caps left if it's more than max", () => {
  const popoverSize = {
    width: faker.number.int({ min: 100, max: 400 }),
    height: faker.number.int({ min: 100, max: 400 }),
  };
  const { result } = renderHook(() =>
    useTutorialPopoverPosition({
      contentRef: { current: null },
      top: 100,
      left: window.innerWidth + 10000,
      width: 100,
      height: 100,
      popoverSize,
    })
  );

  expect(result.current.style.left).toBe(window.innerWidth - CARET_OFFSET);
});
