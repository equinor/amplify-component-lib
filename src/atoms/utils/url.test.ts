import { faker } from '@faker-js/faker';

import { isValidUrl } from './url';

test('isValidUrl returns true on random url', () => {
  const url = faker.internet.url();
  expect(isValidUrl(url)).toBe(true);
});

test('isValidUrl returns false on random string', () => {
  const notUrl = faker.person.fullName();
  expect(isValidUrl(notUrl)).toBe(false);
});
