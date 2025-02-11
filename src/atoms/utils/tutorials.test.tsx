import { faker } from '@faker-js/faker';

import { highlightTutorialElementID } from './tutorials';

test('Throws error if stepNumber is less than 0', async () => {
  expect(() =>
    highlightTutorialElementID(faker.string.uuid(), -1)
  ).toThrowError();
});
