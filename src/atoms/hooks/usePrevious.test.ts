import { useEffect, useState } from 'react';

import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';

import { usePrevious } from 'src/atoms/hooks/usePrevious';

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
