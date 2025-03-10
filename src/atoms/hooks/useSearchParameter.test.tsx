import { ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';

import { useSearchParameter } from './useSearchParameter';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <RouterProvider
      router={createMemoryRouter([
        {
          path: '/',
          index: true,
          element: children,
        },
      ])}
    />
  );
}

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

function TestComponent<T>({
  randomKey,
  randomValue,
  parser,
}: {
  randomKey: string;
  randomValue: T;
  parser?: (value: string) => T;
}) {
  const [searchParameters] = useSearchParams();
  const [_, setValue] = useSearchParameter<T | undefined>({
    key: randomKey,
    parser,
  });

  console.log(searchParameters.get(randomKey));

  return (
    <>
      <button onClick={() => setValue(randomValue)}>update</button>
      <button
        onClick={() =>
          setValue((prev) => {
            console.log(prev, randomValue);
            return randomValue;
          })
        }
      >
        callback
      </button>
      <button onClick={() => setValue(undefined)}>remove</button>
    </>
  );
}

test('Sets value to URL', async () => {
  const randomKey = faker.book.title();
  const randomValue = faker.airline.airline().name;
  console.log = vi.fn();
  render(<TestComponent randomValue={randomValue} randomKey={randomKey} />, {
    wrapper: Wrapper,
  });

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: 'update' }));

  expect(console.log).toHaveBeenCalledWith(randomValue);
});

test('Works with callback function', async () => {
  const randomKey = faker.book.title();
  const randomValue = faker.airline.airline().name;
  console.log = vi.fn();
  render(<TestComponent randomValue={randomValue} randomKey={randomKey} />, {
    wrapper: Wrapper,
  });

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: 'callback' }));

  expect(console.log).toHaveBeenCalledWith(undefined, randomValue);
});

test('Works with objects/arrays', async () => {
  const randomKey = faker.book.title();
  const randomValue = { wow: faker.airline.airline().name };
  console.log = vi.fn();
  render(
    <TestComponent
      randomValue={randomValue}
      randomKey={randomKey}
      parser={JSON.parse}
    />,
    {
      wrapper: Wrapper,
    }
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: 'update' }));

  expect(console.log).toHaveBeenCalledWith(JSON.stringify(randomValue));
});

test('Removes as expected', async () => {
  const randomKey = faker.book.title();
  const randomValue = { wow: faker.airline.airline().name };
  console.log = vi.fn();
  render(
    <TestComponent
      randomValue={randomValue}
      randomKey={randomKey}
      parser={JSON.parse}
    />,
    {
      wrapper: Wrapper,
    }
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: 'update' }));

  expect(console.log).toHaveBeenCalledWith(JSON.stringify(randomValue));

  await user.click(screen.getByRole('button', { name: 'remove' }));

  expect(console.log).toHaveBeenCalledWith(null);
});
