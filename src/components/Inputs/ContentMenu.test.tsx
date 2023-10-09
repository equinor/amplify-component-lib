import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../tests/test-utils';
import ContentMenu, { ContentMenuProps } from './ContentMenu';

const { colors } = tokens;

function fakeItem(): { label: string; value: string } {
  return {
    label: faker.string.uuid(),
    value: faker.string.uuid(),
  };
}

function fakeProps(): ContentMenuProps {
  const items = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
    items.push(fakeItem());
  }
  return {
    items,
    value: items[faker.number.int({ min: 0, max: items.length - 1 })].value,
    onChange: vi.fn(),
  };
}

test('All labels are visible', async () => {
  const props = fakeProps();
  render(<ContentMenu {...props} />);

  for (const item of props.items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }
});

test('Clicking menu item calls onChange', async () => {
  const user = userEvent.setup();
  const props = fakeProps();
  render(<ContentMenu {...props} />);

  const randomItem = faker.number.int({
    min: 0,
    max: props.items.length - 1,
  });

  await user.click(screen.getByText(props.items[randomItem].label));

  expect(props.onChange).toHaveBeenCalledWith(props.items[randomItem].value);
  expect(props.onChange).toHaveBeenCalledTimes(1);
});

test('Show isLoading correctly', async () => {
  const props = fakeProps();
  const { rerender } = render(<ContentMenu {...props} isLoading />);

  // Expects menu to have 5 skeletons
  expect(screen.getByTestId('content-menu-container').children.length).toBe(5);

  rerender(<ContentMenu {...props} isLoading={false} />);

  expect(screen.getByTestId('content-menu-container').children.length).toBe(
    props.items.length
  );
});

test('Parents open and close as expected', async () => {
  const user = userEvent.setup();
  const child = fakeItem();
  const props = fakeProps();
  props.items[0].children = [child];
  render(<ContentMenu {...props} />);

  await user.click(screen.getByRole('button', { name: props.items[0].label }));

  expect(screen.getByRole('button', { name: child.label })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: child.label })).toBeVisible();

  await user.click(screen.getByRole('button', { name: props.items[0].label }));

  expect(
    screen.queryByRole('button', { name: child.label })
  ).not.toBeInTheDocument();
});

test('Children render and function as they should', async () => {
  const user = userEvent.setup();
  const child = fakeItem();
  const props = fakeProps();
  props.items[0].children = [child];
  const { rerender } = render(<ContentMenu {...props} />);

  await user.click(screen.getByRole('button', { name: props.items[0].label }));

  const childButton = screen.getByRole('button', {
    name: props.items[0].children[0].label,
  });

  expect(childButton).toBeInTheDocument();
  expect(childButton).toBeVisible();

  await user.click(childButton);

  expect(props.onChange).toHaveBeenCalledWith(child.value);
  rerender(<ContentMenu {...props} value={child.value} />);

  expect(childButton).toHaveStyleRule(
    'background',
    colors.interactive.primary__hover_alt.hex
  );
});
