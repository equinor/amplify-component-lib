import { faker } from '@faker-js/faker';

import { Switch } from './Switch';
import { render, screen } from 'src/tests/browsertest-utils';

test('Renders as expected', () => {
  const label = faker.animal.dog();
  render(<Switch label={label} checked={false} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});
