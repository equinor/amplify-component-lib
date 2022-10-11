import { faker } from '@faker-js/faker';
import url from './url';

const { isValidUrl } = url;

test('isValidUrl returns true on random url', () => {
  const url = faker.internet.url();
  expect(isValidUrl(url)).toBe(true);
});

test('isValidUrl returns false on random string', () => {
  const notUrl = faker.name.fullName();
  expect(isValidUrl(notUrl)).toBe(false);
});
