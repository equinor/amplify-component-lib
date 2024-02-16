import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

import { useFakeProgress } from './useFakeProgress';
import { renderHook } from 'src/tests/test-utils';

test('Throws error when changing progressMs prop', () => {
  const onDone = vi.fn();
  const fakeProgressMs = faker.number.int({ min: 200, max: 1000 });
  const { rerender } = renderHook(
    ({ progressDelayMs }) => useFakeProgress({ onDone, progressDelayMs }),
    { initialProps: { progressDelayMs: fakeProgressMs } }
  );

  expect(() =>
    rerender({
      progressDelayMs:
        fakeProgressMs + faker.number.int({ min: 100, max: 1000 }),
    })
  ).toThrowError();
  expect(onDone).not.toHaveBeenCalled();
});

test('Throws error when changing finishMs prop', () => {
  const onDone = vi.fn();
  const fakeFinishMs = faker.number.int({ min: 200, max: 1000 });
  const { rerender } = renderHook(
    ({ finishedTimeoutMs }) => useFakeProgress({ onDone, finishedTimeoutMs }),
    { initialProps: { finishedTimeoutMs: fakeFinishMs } }
  );

  expect(() =>
    rerender({
      finishedTimeoutMs:
        fakeFinishMs + faker.number.int({ min: 100, max: 1000 }),
    })
  ).toThrowError();
  expect(onDone).not.toHaveBeenCalled();
});

test('Calls onDone when finished', async () => {
  const onDone = vi.fn();
  renderHook(() =>
    useFakeProgress({
      onDone: onDone,
      progressDelayMs: 100,
      finishedTimeoutMs: 100,
    })
  );

  await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1), {
    timeout: 4000,
  });
});
