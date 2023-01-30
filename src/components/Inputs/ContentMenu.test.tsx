import { faker } from '@faker-js/faker';

import { render, screen, userEvent, vi } from '../../test-utils';
import ContentMenu, { ContentMenuProps } from './ContentMenu';

function fakeItem(): { label: string; value: string } {
  return {
    label: faker.animal.dog(),
    value: faker.datatype.uuid(),
  };
}

function fakeProps(): ContentMenuProps {
  const items = [];
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 10 }); i++) {
    items.push(fakeItem());
  }
  return {
    items,
    value:
      items[faker.datatype.number({ min: 0, max: items.length - 1 })].value,
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

  const randomItem = faker.datatype.number({
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
