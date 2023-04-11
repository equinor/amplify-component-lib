import { useEffect, useState } from 'react';

import { faker } from '@faker-js/faker';

import { renderHook } from '../tests/test-utils';
import { usePrevious } from './usePrevious';

test('Returns previous value', async () => {
  const initial = faker.animal.cow();
  const { result } = renderHook(() => {
    const [value, setValue] = useState(initial);
    const prevValue = usePrevious(value);
    useEffect(() => setValue(faker.animal.dog()), []);
    return prevValue;
  });

  expect(result.current).toBe(initial);
});
