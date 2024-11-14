import { renderHook } from '@testing-library/react';

import { StepperProvider, useStepper } from 'src/providers/StepperProvider';
import { render } from 'src/tests/browsertest-utils';

test('"useStepper" throws error if used outside of provider', async () => {
  console.error = vi.fn();

  expect(() => renderHook(() => useStepper())).toThrowError();
});

test('Providing illegal initial step throws error', async () => {
  console.error = vi.fn();

  expect(() =>
    render(
      <StepperProvider
        steps={[
          {
            label: 'test',
          },
          {
            label: 'test2',
          },
        ]}
        initialStep={-1}
      >
        <p>children</p>
      </StepperProvider>
    )
  ).toThrowError();

  expect(() =>
    render(
      <StepperProvider
        steps={[
          {
            label: 'test',
          },
          {
            label: 'test2',
          },
        ]}
        initialStep={2}
      >
        <p>children</p>
      </StepperProvider>
    )
  ).toThrowError();
});
