import { faker } from '@faker-js/faker';

import {
  ContentMenu,
  ContentMenuProps,
} from 'src/molecules/ContentMenu/ContentMenu';
import {
  render,
  screen,
  testingLibUserEvent,
} from 'src/tests/browsertest-utils';

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

test('All labels are visible', () => {
  const props = fakeProps();
  render(<ContentMenu {...props} />);

  for (const item of props.items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }
});

test('Clicking menu item calls onChange', async () => {
  const user = testingLibUserEvent.setup();
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

test('Show isLoading correctly', () => {
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
  const user = testingLibUserEvent.setup();
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

test('Children function as they should', async () => {
  const user = testingLibUserEvent.setup();
  const child = fakeItem();
  const props = fakeProps();
  props.items[0].children = [child];
  render(<ContentMenu {...props} />);

  await user.click(screen.getByRole('button', { name: props.items[0].label }));

  const childButton = screen.getByRole('button', {
    name: props.items[0].children[0].label,
  });

  expect(childButton).toBeInTheDocument();
  expect(childButton).toBeVisible();

  await user.click(childButton);

  expect(props.onChange).toHaveBeenCalledWith(child.value);
});
