import { faker } from '@faker-js/faker';

import { Checkbox } from './Checkbox';
import { colors } from 'src/atoms';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Renders as expected with outlined=true', () => {
  const label = faker.animal.dog();
  render(<Checkbox label={label} outlined />);

  const parent = screen.getByLabelText(label).parentElement!.parentElement;

  expect(parent).toHaveStyle(
    `outline: 1px solid ${colors.ui.background__medium.rgba}`
  );
});

test('Renders as expected with error=true', () => {
  const label = faker.animal.dog();
  render(<Checkbox label={label} error />);

  const labelElement = screen.getByLabelText(label);
  const svgElement = labelElement.parentElement!.children.item(1);

  expect(svgElement).toHaveStyle(
    `fill: ${colors.interactive.danger__resting.rgba}`
  );
});
