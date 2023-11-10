import { faker } from '@faker-js/faker';

import { renderHook, waitFor } from '../tests/test-utils';
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
  setState(newValue);

  await waitFor(
    () =>
      expect(JSON.parse(localStorage.getItem(key) as string)).toBe(newValue),
    {
      timeout: 2000,
    }
  );
}, 10000);

test('setting state to undefined removes local storage', async () => {
  const key = faker.animal.dog();
  const defaultValue = faker.science.chemicalElement().name;
  const newValue = undefined;

  const { result } = renderHook(() =>
    useLocalStorage<string | undefined>(key, defaultValue, 20000)
  );
  const [, setState] = result.current;
  setState(newValue);

  expect(localStorage.getItem(key) as string).toBe(undefined);
});

test('useLocalStorage checks localstorage for value before using default', async () => {
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

  expect(JSON.parse(localStorage.getItem(key) as string)).toBe(oldValue);
});
