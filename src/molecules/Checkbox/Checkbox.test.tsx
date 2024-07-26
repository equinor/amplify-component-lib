import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { Checkbox } from './Checkbox';
import { render, screen } from 'src/tests/test-utils';

const { colors } = tokens;

test('Renders as expected', () => {
  const label = faker.animal.dog();
  render(<Checkbox label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('Renders as expected with outlined=true', () => {
  const label = faker.animal.dog();
  render(<Checkbox label={label} outlined />);

  const container = screen.getByText(label).parentElement;

  expect(container).toBeInTheDocument();
  expect(container).toHaveStyleRule(
    'outline',
    `1px solid ${colors.ui.background__medium.rgba}`
  );
});
