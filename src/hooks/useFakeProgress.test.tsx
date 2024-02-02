import { useEffect, useState } from 'react';

import { faker } from '@faker-js/faker';

import { useFakeProgress } from './useFakeProgress';
import { render, waitFor } from 'src/tests/test-utils';

function FakeComponent({
  changeFinishMs,
  changeProgressMs,
}: {
  changeFinishMs: boolean;
  changeProgressMs: boolean;
}) {
  const [fakeFinishMs, setFinishMs] = useState(
    faker.number.int({ min: 1000, max: 4000 })
  );
  const [fakeProgressMs, setProgressMs] = useState(
    faker.number.int({ min: 100, max: 500 })
  );

  const { progress } = useFakeProgress({
    onDone: () => null,
    progressDelayMs: fakeProgressMs,
    finishedTimeoutMs: fakeFinishMs,
  });

  useEffect(() => {
    if (changeProgressMs) {
      setTimeout(() => {
        setProgressMs((prev) => prev + 10);
      }, 100);
    }
  }, [changeProgressMs]);

  useEffect(() => {
    if (changeFinishMs) {
      setTimeout(() => {
        setFinishMs((prev) => prev + 10);
      }, 100);
    }
  }, [changeFinishMs]);

  return <div>{progress}</div>;
}

test('Throws error if changing finish ms during run', async () => {
  console.error = vi.fn();
  render(<FakeComponent changeFinishMs={true} changeProgressMs={false} />);
  await waitFor(() => expect(console.error).toHaveBeenCalled());
});

test('Throws error if changing progress ms during run', async () => {
  console.error = vi.fn();
  render(<FakeComponent changeFinishMs={false} changeProgressMs={true} />);
  await waitFor(() => expect(console.error).toHaveBeenCalled());
});
