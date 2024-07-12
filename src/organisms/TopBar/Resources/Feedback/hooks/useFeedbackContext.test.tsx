import { renderHook } from '@testing-library/react';

import { useFeedbackContext } from './useFeedbackContext';

console.error = vi.fn();
test('throws error when used outside context', () => {
  expect(() => {
    renderHook(() => useFeedbackContext());
  }).toThrow('"useFeedbackContext" must be used within provider!');
});
