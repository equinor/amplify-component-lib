import { faker } from '@faker-js/faker';

import Item from './Item';
import { render, screen } from 'src/tests/test-utils';

import { expect } from 'vitest';

test('Renders Item correctly', () => {
  const title = faker.animal.lion();
  const childText = faker.animal.dog();
  render(
    <Item title={title}>
      <p>{childText}</p>
    </Item>
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(childText)).toBeInTheDocument();
});
