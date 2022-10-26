import { power_button, power_button_off } from '@equinor/eds-icons';

import { render, screen, userEvent } from '../../test-utils';
import IconToggleButton, { IconToggleButtonProps } from './IconToggleButton';

function fakeProps(): IconToggleButtonProps {
  return {
    toggleOn: {
      icon: power_button,
      onClick: jest.fn(),
    },
    toggleOff: {
      icon: power_button_off,
      onClick: jest.fn(),
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
