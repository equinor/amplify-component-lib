import { Icon } from '@equinor/eds-core-react';
import { car_wash } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../test-utils';
import NotFound from './NotFound';

function fakeProps() {
  return {
    backLabel: faker.lorem.sentence(),
    onBack: vi.fn(),
  };
}

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
    onBack: vi.fn(),
  };

  render(<NotFound {...props} />);

  const icon = screen.getByTestId('eds-icon-path');

  expect(icon).toBeInTheDocument();
});

test('Fires onBack correctly when clicking button', async () => {
  const props = fakeProps();
  render(<NotFound {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  expect(props.onBack).toHaveBeenCalledTimes(1);
});
