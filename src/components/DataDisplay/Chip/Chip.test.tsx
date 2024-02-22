import { faker } from '@faker-js/faker';

import { Chip } from './Chip';
import { render, screen } from 'src/tests/test-utils';

test('Shows chip', async () => {
  const someText = faker.animal.crocodilia();
  render(<Chip>{someText}</Chip>);
  expect(screen.getByText(someText)).toBeInTheDocument();
});
