import { act, ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { faker } from '@faker-js/faker';

import { useSearchParameter } from './useSearchParameter';
import { renderHook } from 'src/tests/jsdomtest-utils';

test('Gets expected value from URL', async () => {
  const randomKey = faker.book.title();
  const randomValue = faker.airline.airline().name;
  const { result } = renderHook(
    () =>
      useSearchParameter<string>({
        key: randomKey,
      }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <RouterProvider
          router={createMemoryRouter(
            [
              {
                path: '/',
                index: true,
                element: children,
              },
            ],
            {
              initialEntries: [
                `?${randomKey}=${encodeURIComponent(randomValue)}`,
              ],
            }
          )}
        />
      ),
    }
  );
  expect(result.current[0]).toBe(randomValue);
});
