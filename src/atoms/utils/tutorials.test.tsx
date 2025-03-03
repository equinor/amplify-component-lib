import { faker } from '@faker-js/faker';

import {
  getHighlightElementBoundingBox,
  highlightTutorialElementID,
} from './tutorials';
import { render } from 'src/tests/jsdomtest-utils';

test('Throws error if stepNumber is less than 0', async () => {
  expect(() =>
    highlightTutorialElementID(faker.string.uuid(), -1)
  ).toThrowError();
});

test('logs error if element is not found', async () => {
  render(<p>some stuff</p>);

  const spy = vi.spyOn(console, 'warn');
  await getHighlightElementBoundingBox(faker.animal.dog(), 0, {
    width: 100,
    height: 100,
  });

  expect(spy).toHaveBeenCalled();
});
