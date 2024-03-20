import { fast_forward, grid_on, home } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import {
  ExpandableIconButtonProps,
  ExpandingIconButton,
} from './ExpandingIconButton';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeProps(): ExpandableIconButtonProps {
  return {
    text: faker.lorem.paragraph(),
    icon: faker.helpers.arrayElement([grid_on, home, fast_forward]),
    onClick: vi.fn(),
  };
}

test('Fires click event as expected', async () => {
  const props = fakeProps();
  render(<ExpandingIconButton {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button', { name: props.text });

  expect(button).toBeInTheDocument();

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});

test('Works as expected when iconPosition=right', async () => {
  const props = fakeProps();
  render(<ExpandingIconButton {...props} iconPosition="right" />);
  const user = userEvent.setup();

  const button = screen.getByRole('button', { name: props.text });

  expect(button).toBeInTheDocument();

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});
