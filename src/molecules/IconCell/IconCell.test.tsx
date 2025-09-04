import { cake, check } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import {
  IconCell,
  RegularIconCellProps,
} from 'src/molecules/IconCell/IconCell';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeProps(): RegularIconCellProps {
  return {
    label: faker.food.dish(),
    icon: cake,
    onClick: vi.fn(),
  };
}

test('Renders label as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const cell = screen.getByRole('button');

  expect(cell).toBeInTheDocument();
});

test('Renders icons as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} helperIcon={check} />);
  const allIcons = screen.getAllByTestId('eds-icon-path');

  expect(allIcons[0]).toHaveAttribute('d', cake.svgPathData);
  expect(allIcons[1]).toHaveAttribute('d', check.svgPathData);
});

test('Renders custom content as expected', () => {
  const props = fakeProps();
  const helperText = 'helper';
  const iconText = 'icon';

  render(
    <IconCell
      {...props}
      helperIcon={<div>{helperText}</div>}
      icon={<div>{iconText}</div>}
    />
  );

  expect(screen.getByText(helperText)).toBeInTheDocument();
  expect(screen.getByText(iconText)).toBeInTheDocument();
});

test('Clicking calls onClick', async () => {
  const props = fakeProps();

  render(<IconCell {...props} />);

  const user = userEvent.setup();

  const cell = screen.getByRole('button');

  await user.click(cell);

  expect(props.onClick).toHaveBeenCalledOnce();
});
