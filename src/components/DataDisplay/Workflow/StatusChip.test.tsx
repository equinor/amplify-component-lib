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

test('Renders correctly when not disabled', () => {
  const props = fakeProps();
  render(
    <StatusChip {...props}>
      <p>{props.childText}</p>
    </StatusChip>
  );

  const chip = screen.getByTestId('status-chip');
  expect(chip).toHaveStyleRule('border', `0.063em solid ${props.color}`);
  expect(screen.getByText(props.childText)).toBeInTheDocument();
});

test('Renders correctly when disabled', () => {
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
