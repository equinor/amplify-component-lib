import { ReactElement } from 'react';

import { renderHook } from '../tests/test-utils';
import TutorialStepsProvider, {
  useTutorialSteps,
} from './TutorialStepsProvider';

const TutorialStepsProviderWithStartOpen = ({
  children,
}: {
  children: ReactElement;
}) => {
  return <TutorialStepsProvider startOpen>{children}</TutorialStepsProvider>;
};

test('startOpen = false works as expected', () => {
  const { result } = renderHook(() => useTutorialSteps(), {
    wrapper: TutorialStepsProvider,
  });

  expect(result.current.showTutorialIntro).toBe(false);
});

test('startOpen = true works as expected', () => {
  const { result } = renderHook(() => useTutorialSteps(), {
    wrapper: TutorialStepsProviderWithStartOpen,
  });

  expect(result.current.showTutorialIntro).toBe(true);
});

test("'useTutorialSteps' hook throws error if using outside of context", () => {
  // Hides console errors since this test explicitly tests for thrown errors
  console.error = vi.fn();
  expect(() => renderHook(() => useTutorialSteps())).toThrow(
    'useTutorialSteps must be used within a TutorialStepsProvider'
  );
});
