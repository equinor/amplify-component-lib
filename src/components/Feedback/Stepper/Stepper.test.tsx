import { check } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import Stepper, { StepperProps } from './Stepper';

const { colors } = tokens;

function fakeProps(): StepperProps {
  const steps: string[] = [];
  let i = 0;
  const stepAmount = faker.number.int({ min: 2, max: 30 });
  while (i < stepAmount) {
    i += 1;
    steps.push(faker.string.uuid());
  }
  return {
    current: 0,
    setCurrent: vi.fn(),
    steps,
  };
}

test('Displays icon/number correctly', async () => {
  const props = fakeProps();
  const { rerender } = render(<Stepper {...props} />);

  // Current does not have color attribute
  const firstElement = screen.getByText(props.steps[0]);
  expect(firstElement).toHaveStyleRule(
    'color',
    colors.text.static_icons__default.hex
  );

  for (const step of props.steps.slice(1)) {
    expect(screen.getByText(step)).toHaveStyleRule(
      'color',
      colors.interactive.disabled__text.hex
    );
  }
  rerender(<Stepper {...props} current={1} maxWidth="800px" />);

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

test('onlyShowCurrentStepLabel prop hides other labels', async () => {
  const props = fakeProps();
  render(<Stepper {...props} onlyShowCurrentStepLabel={true} />);

  expect(screen.queryByText(props.steps[1])).toBeNull();
});

test('maxWidth props sets max-width style', () => {
  const width = faker.number.int() + 'px';
  const props = fakeProps();
  render(<Stepper {...props} maxWidth={width} />);

  const container = screen.getByTestId('stepper-container');
  expect(container).toHaveStyleRule('max-width', width);
});
