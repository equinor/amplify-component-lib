import { createMemoryRouter, RouterProvider } from 'react-router';

import { renderHook } from '@testing-library/react';

import { StepperProvider, useStepper } from 'src/providers/StepperProvider';
import { render } from 'src/tests/jsdomtest-utils';

test('"useStepper" throws error if used outside of provider', async () => {
  console.error = vi.fn();

  expect(() => renderHook(() => useStepper())).toThrowError();
});

test('Providing initial step < 0 throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  render(
    <RouterProvider
      router={createMemoryRouter([
        {
          path: '/',
          element: (
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
          ),
        },
      ])}
    />
  );

  expect(spy).toHaveBeenCalled();
});

test('Providing initial step >= steps.length throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  render(
    <RouterProvider
      router={createMemoryRouter([
        {
          path: '/',
          element: (
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
          ),
        },
      ])}
    />
  );

  expect(spy).toHaveBeenCalled();
});

test('Providing step in url that is NaN throws error', async () => {
  const spy = vi.spyOn(console, 'error');

  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: '/:step',
            element: (
              <StepperProvider
                syncToURLParam
                steps={[
                  {
                    label: 'test',
                  },
                  {
                    label: 'test2',
                  },
                ]}
              >
                <p>children</p>
              </StepperProvider>
            ),
          },
        ],
        { initialEntries: ['/test'] }
      )}
    />
  );

  expect(spy).toHaveBeenCalled();
});
