import { faker } from '@faker-js/faker';

import { colors } from 'src/atoms/style';
import {
  ContentMenu,
  ContentMenuProps,
} from 'src/molecules/ContentMenu/ContentMenu';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

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

test('Children render as they should', async () => {
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

  expect(childButton).toHaveStyle(
    `background: ${colors.interactive.primary__hover_alt.rgba}`
  );
});
