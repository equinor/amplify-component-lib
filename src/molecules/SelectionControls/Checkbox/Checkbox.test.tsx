import { faker } from '@faker-js/faker';

import { Checkbox } from './Checkbox';
import { render, screen } from 'src/tests/browsertest-utils';

test('Renders as expected', () => {
  const label = faker.animal.dog();
  render(<Checkbox label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});
