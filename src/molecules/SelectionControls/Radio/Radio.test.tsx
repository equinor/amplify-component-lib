import { faker } from '@faker-js/faker';

import { Radio } from './Radio';
import { render, screen } from 'src/tests/browsertest-utils';

test('Renders as expected', () => {
  const label = faker.animal.dog();
  render(<Radio label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});
