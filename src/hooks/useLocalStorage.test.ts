import { faker } from '@faker-js/faker';

import { renderHook } from '../tests/test-utils';
import { updateLocalStorage, useLocalStorage } from './useLocalStorage';

test('useLocalStorage works as expected', () => {
  const key = faker.animal.dog();
  const value = faker.science.chemicalElement().name;

  renderHook(() => useLocalStorage(key, value));

  expect(JSON.parse(localStorage.getItem(key) as string)).toBe(value);
});

test('useLocalStorage works as expected when localstorage has value', () => {
  const key = faker.animal.dog();
  const value = faker.science.chemicalElement().name;
  const defaultState = faker.science.chemicalElement().symbol;

  localStorage.setItem(key, JSON.stringify(value));

  renderHook(() => useLocalStorage(key, defaultState));

  expect(JSON.parse(localStorage.getItem(key) as string)).toBe(value);
});

test('updateLocalStorage works as expected', () => {
  const key = faker.animal.dog();
  const value = faker.science.chemicalElement().name;

  updateLocalStorage(key, value);

  expect(JSON.parse(localStorage.getItem(key) as string)).toBe(value);
});
