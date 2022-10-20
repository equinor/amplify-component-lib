import { faker } from '@faker-js/faker';

import string from './string';

test('capitalize function works as expected', () => {
  const templateString = faker.lorem.words(
    faker.datatype.number({ min: 1, max: 10 })
  );

  const formatted = string.capitalize(templateString);

  const regexMatch = new RegExp(/([A-Z0-9]\w+)/gm);

  expect(regexMatch.exec(formatted)).not.toBe(null);
});
