import { check } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent, vi } from '../../../test-utils';
import Stepper, { StepperProps } from './Stepper';

function fakeProps(): StepperProps {
  return {
    current: 0,
    setCurrent: vi.fn(),
    steps: new Array(faker.datatype.number({ min: 3 }))
      .fill(0)
      .map(() => faker.datatype.uuid()),
  };
}

test('Displays icon/number correctly', async () => {
  const props = fakeProps();
  const { rerender } = render(<Stepper {...props} />);

  // Current does not have color attribute
  expect(screen.getByText(props.steps[0])).not.toHaveAttribute('color');

  for (const step of props.steps.slice(1)) {
    expect(screen.getByText(step)).toHaveAttribute('color');
  }
  rerender(<Stepper {...props} current={1} />);
  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    check.svgPathData
  );
});

test('Fires onClick when clicking steps that are in the past', async () => {
  const user = userEvent.setup();
  const props = fakeProps();
  render(<Stepper {...props} current={1} />);

  const steps = screen.getAllByTestId('step');

  await user.click(steps[0]);

  // 0 is the index of the element we clicked
  expect(props.setCurrent).toHaveBeenCalledWith(0);
  expect(props.setCurrent).toHaveBeenCalledTimes(1);
});
