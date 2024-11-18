import { faker } from '@faker-js/faker';

import StatusChip from 'src/deprecated/Workflow/StatusChip';
import { render, screen } from 'src/tests/browsertest-utils';

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
  expect(chip).toHaveStyle(`border: 0.063em solid ${props.color}`);
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
