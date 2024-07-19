import { power_button, power_button_off } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import IconToggleButton, {
  IconToggleButtonProps,
} from 'src/deprecated/IconToggleButton';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeProps(withToolTip = false): IconToggleButtonProps {
  return {
    toggleOn: {
      icon: power_button,
      onClick: vi.fn(),
      tooltip: withToolTip
        ? {
            title: faker.animal.bird(),
            placement: 'top',
          }
        : undefined,
    },
    toggleOff: {
      icon: power_button_off,
      onClick: vi.fn(),
      tooltip: withToolTip
        ? {
            title: faker.animal.cow(),
            placement: 'top',
          }
        : undefined,
    },
  };
}

test('Shows correct icon before and after click', async () => {
  const props = fakeProps();
  render(<IconToggleButton {...props} />);

  const user = userEvent.setup();
  const button = screen.getByRole('button');

  const path = screen.getByTestId('eds-icon-path');

  expect(path).toHaveAttribute('d', props.toggleOff.icon.svgPathData);

  await user.click(button);

  expect(path).toHaveAttribute('d', props.toggleOn.icon.svgPathData);
  expect(props.toggleOff.onClick).toHaveBeenCalledTimes(1);
});

test('Works with tooltip', async () => {
  const props = fakeProps(true);
  render(<IconToggleButton {...props} />);

  const user = userEvent.setup();
  const button = screen.getByRole('button');

  const path = screen.getByTestId('eds-icon-path');

  expect(path).toHaveAttribute('d', props.toggleOff.icon.svgPathData);

  await user.click(button);

  expect(path).toHaveAttribute('d', props.toggleOn.icon.svgPathData);
  expect(props.toggleOff.onClick).toHaveBeenCalledTimes(1);
});

test('OnClick gets called when clicking the button', async () => {
  const props = fakeProps();
  const onClick = vi.fn();
  render(<IconToggleButton {...props} onClick={onClick} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');

  await user.click(button);

  expect(props.toggleOff.onClick).toHaveBeenCalledTimes(1);

  await user.click(button);

  expect(props.toggleOn.onClick).toHaveBeenCalledTimes(1);

  expect(onClick).toHaveBeenCalledTimes(2);
});
