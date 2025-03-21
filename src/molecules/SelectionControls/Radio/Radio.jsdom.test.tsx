import { faker } from '@faker-js/faker';

import { Radio } from './Radio';
import { colors } from 'src/atoms';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Renders as expected with outlined=true', () => {
  const label = faker.animal.dog();
  render(<Radio label={label} outlined />);

  const parent = screen.getByLabelText(label).parentElement!.parentElement;

  expect(parent).toHaveStyle(
    `outline: 1px solid ${colors.ui.background__medium.rgba}`
  );
});
