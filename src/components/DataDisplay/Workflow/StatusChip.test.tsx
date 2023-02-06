import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import StatusChip from './StatusChip';

function fakeProps(disabled = false) {
  return {
    color: faker.color.rgb(),
    backgroundColor: faker.color.rgb(),
    disabled,
    childText: faker.animal.fish(),
  };
}

test('Renders correctly when not disabled', async () => {
  const props = fakeProps();
  render(
    <StatusChip {...props}>
      <p>{props.childText}</p>
    </StatusChip>
  );

  const chip = screen.getByTestId('status-chip');
  expect(chip).toHaveAttribute('color', props.color);
  expect(screen.getByText(props.childText)).toBeInTheDocument();
});

test('Renders correctly when disabled', async () => {
  const props = fakeProps(true);
  render(
    <StatusChip {...props}>
      <p>{props.childText}</p>
    </StatusChip>
  );

  expect(screen.getByTestId('status-chip')).not.toHaveAttribute(
    'color',
    props.color
  );
  expect(screen.getByText(props.childText)).toBeInTheDocument();
});
