import { useSurvey } from './hooks/useSurvey';
import { renderHook } from 'src/tests/browsertest-utils';

test("'useSurvey' hook throws error if using outside of context", () => {
  console.error = vi.fn();
  expect(() => renderHook(() => useSurvey())).toThrow(
    "'useSurvey' must be used within provider"
  );
});
