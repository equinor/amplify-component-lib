import { useEffect, useState } from 'react';

import { faker } from '@faker-js/faker';

import { usePrevious } from 'src/atoms/hooks/usePrevious';
import { renderHook } from 'src/tests/test-utils';

test('Returns previous value', () => {
  const initial = faker.animal.cow();
  const { result } = renderHook(() => {
    const [value, setValue] = useState(initial);
    const prevValue = usePrevious(value);
    useEffect(() => setValue(faker.animal.dog()), []);
    return prevValue;
  });

  expect(result.current).toBe(initial);
});
