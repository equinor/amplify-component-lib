import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import { Actions } from './Actions';

test('Render children in a wrapper', () => {
  const name = faker.animal.cow();
  render(
    <Actions>
      <p>{name}</p>
    </Actions>
  );

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(name)).toBeVisible();
});
