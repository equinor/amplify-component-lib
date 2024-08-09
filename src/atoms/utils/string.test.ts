import { faker } from '@faker-js/faker';

import { capitalize } from './string';

test('capitalize function works as expected', () => {
  const templateString = faker.vehicle.bicycle().toLowerCase();

  const formatted = capitalize(templateString);

  const regexMatch = new RegExp(/([A-Z0-9]\w+)/gm);

  expect(regexMatch.exec(formatted)).not.toBe(null);
});
