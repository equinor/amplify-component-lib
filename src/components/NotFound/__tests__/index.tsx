import { render, screen } from '../../../test-utils';
import faker from 'faker';
import NotFound from '..';
import userEvent from '@testing-library/user-event';
import { Icon } from '@equinor/eds-core-react';
import { car_wash } from '@equinor/eds-icons';

function fakeProps() {
  return {
    backLabel: faker.lorem.sentence(),
    onBack: jest.fn(),
  };
}

test('Renders', () => {
  render(<NotFound {...fakeProps()} />);
});

test('Renders correct label', () => {
  const props = fakeProps();
  render(<NotFound {...props} />);

  expect(screen.getByText(props.backLabel)).toBeInTheDocument();
});

test('Renders react element when given', () => {
  const props = {
    backLabel: (
      <>
        <Icon data={car_wash} />
        Go back
      </>
    ),
    onBack: jest.fn(),
  };

  render(<NotFound {...props} />);

  const icon = screen.getByTestId('eds-icon-path');

  expect(icon).toBeInTheDocument();
});

test('Fires onBack correctly when clicking button', () => {
  const props = fakeProps();
  render(<NotFound {...props} />);

  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(props.onBack).toHaveBeenCalledTimes(1);
});
