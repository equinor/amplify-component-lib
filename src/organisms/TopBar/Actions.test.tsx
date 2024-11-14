import { faker } from '@faker-js/faker';

import { Actions } from './Actions';
import { render, screen } from 'src/tests/browsertest-utils';

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
