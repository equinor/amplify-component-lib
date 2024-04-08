import { faker } from '@faker-js/faker';

import { act, renderHook, waitFor } from '../tests/test-utils';
import {
  LAST_UPDATED_KEY_SUFFIX,
  updateLocalStorage,
  useLocalStorage,
} from './useLocalStorage';

test('useLocalStorage works as expected', async () => {
  const key = faker.animal.dog();
  const defaultValue = faker.science.chemicalElement().name;
  const newValue = faker.airline.recordLocator();

  const { result } = renderHook(() =>
    useLocalStorage(key, defaultValue, 20000)
  );
  const [, setState] = result.current;
  act(() => {
    setState(newValue);
  });

  await waitFor(
    () => expect(JSON.parse(localStorage.getItem(key)!)).toBe(newValue),
    {
      timeout: 2000,
    }
  );
}, 10000);

test('clear() removes local storage', () => {
  const key = faker.animal.dog();
  const defaultValue = faker.science.chemicalElement().name;
  const newValue = faker.color.human();

  const { result } = renderHook(() =>
    useLocalStorage<string>(key, defaultValue, 20000)
  );
  const [, setState, clear] = result.current;

  act(() => {
    setState(newValue);
    clear();
  });

  expect(localStorage.getItem(key)!).toBe(undefined);
});

test('setting state to undefined removes local storage', () => {
  const key = faker.animal.dog();
  const defaultValue = faker.science.chemicalElement().name;
  const newValue = undefined;

  const { result } = renderHook(() =>
    useLocalStorage<string | undefined>(key, defaultValue, 20000)
  );
  const [, setState] = result.current;
  act(() => {
    setState(newValue);
  });

  expect(localStorage.getItem(key)!).toBe(undefined);
});

test('setting state to null removes local storage', () => {
  const key = faker.animal.dog();
  const defaultValue = faker.science.chemicalElement().name;
  const newValue = null;

  const { result } = renderHook(() =>
    useLocalStorage<string | undefined | null>(key, defaultValue, 20000)
  );
  const [, setState] = result.current;
  act(() => {
    setState(newValue);
  });

  expect(localStorage.getItem(key)!).toBe(undefined);
});

test('useLocalStorage checks localstorage for value before using default', () => {
  const key = faker.animal.dog();
  const defaultValue = faker.science.chemicalElement().name;
  const oldValue = faker.airline.aircraftType();

  updateLocalStorage(key, oldValue);
  updateLocalStorage(
    key + LAST_UPDATED_KEY_SUFFIX,
    new Date().getTime() + 10000
  );

  renderHook(() =>
    useLocalStorage<string | undefined>(key, defaultValue, 20000)
  );

  expect(JSON.parse(localStorage.getItem(key)!)).toBe(oldValue);
});
