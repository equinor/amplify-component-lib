import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { Radio } from './Radio';
import { render, screen } from 'src/tests/browsertest-utils';

const { colors } = tokens;

test('Renders as expected', () => {
  const label = faker.animal.dog();
  render(<Radio label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('Renders as expected with outlined=true', () => {
  const label = faker.animal.dog();
  render(<Radio label={label} outlined />);

  const computedStyle = window.getComputedStyle(
    screen.getByText(label).parentElement!
  ).outline;

  expect(computedStyle).toBe(`1px solid ${colors.ui.background__medium.rgba}`);
});
