import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../test-utils';
import OptionDrawer, {
  OptionDrawerProps,
  ToggleEventProps,
} from './OptionDrawer';

type FakeType = {
  id: string;
  label: string;
  children?: FakeType[];
};

function fakeItem(hasChildren: boolean): FakeType {
  const children: FakeType[] = [];
  if (hasChildren) {
    for (let i = 0; i < faker.datatype.number({ min: 1, max: 10 }); i++) {
      children.push({
        id: faker.datatype.uuid(),
        label: faker.datatype.uuid(),
      });
    }
  }
  return {
    id: faker.datatype.uuid(),
    label: faker.datatype.uuid(),
    children: children.length > 0 ? children : undefined,
  };
}

function fakeProps(
  singleSelect = false,
  hasChildren = true,
  grandChildren = false
): OptionDrawerProps<FakeType> {
  const item = fakeItem(hasChildren);
  if (grandChildren && hasChildren && item.children && item.children[0]) {
    item.children[0].children = [fakeItem(false)];
  }

  return {
    item,
    onToggle: vi.fn(),
    singleSelect,
  };
}

test('Works correctly when clicking item with no children', async () => {
  const props = fakeProps(false, false);
  const user = userEvent.setup();
  let items: { id: string; label: string }[] = [{ id: '', label: '' }];
  let toggle: boolean | undefined = undefined;
  const handleOnToggle = (
    event: ToggleEventProps<{ id: string; label: string }>
  ) => {
    items = event.items;
    toggle = event.toggle;
  };
  render(<OptionDrawer {...props} onToggle={handleOnToggle} />);

  const parent = screen.getByText(props.item.label);
  await user.click(parent);

  expect(items[0].id).toBe(props.item.id);
  expect(toggle).toBe(true);
});

test('Works correctly when clicking children', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const counter = vi.fn();
  let items: { id: string; label: string }[] = [{ id: '', label: '' }];
  let toggle: boolean | undefined = undefined;
  const handleOnToggle = (
    event: ToggleEventProps<{ id: string; label: string }>
  ) => {
    items = event.items;
    toggle = event.toggle;
    counter();
  };
  render(<OptionDrawer {...props} onToggle={handleOnToggle} />);

  const parent = screen.getByText(props.item.label);
  await user.click(parent);

  for (const child of props.item.children ?? []) {
    await user.click(screen.getByText(child.label));
    expect(items[0].id).toBe(child.id);
    expect(toggle).toBe(true);
  }

  expect(counter).toHaveBeenCalledTimes(props.item.children?.length ?? 0);
});

test('Works correctly when clicking grand child', async () => {
  const props = fakeProps(false, true, true);
  const user = userEvent.setup();
  const counter = vi.fn();
  let items: { id: string; label: string }[] = [{ id: '', label: '' }];
  let toggle: boolean | undefined = undefined;
  const handleOnToggle = (
    event: ToggleEventProps<{ id: string; label: string }>
  ) => {
    items = event.items;
    toggle = event.toggle;
    counter();
  };

  render(<OptionDrawer {...props} onToggle={handleOnToggle} />);

  const parent = screen.getByText(props.item.label);
  await user.click(parent);

  // First child has grand child
  const label = props.item.children?.[0].label ?? 'failed';
  const grandChildren = props.item.children?.[0].children ?? [];
  await user.click(screen.getByText(label));

  expect(grandChildren.length).toBeGreaterThanOrEqual(1);
  for (const grandChild of grandChildren) {
    await user.click(screen.getByText(grandChild.label));
    expect(items[0].id).toBe(grandChild.id);
    expect(toggle).toBe(true);
  }

  expect(counter).toHaveBeenCalledTimes(grandChildren.length);
});

test('Animation working correctly when clicking item with no children', async () => {
  const props = fakeProps(false, false);
  const user = userEvent.setup();

  render(<OptionDrawer {...props} onToggle={props.onToggle} />);

  const parent = screen.getByText(props.item.label);
  user.click(parent);

  const animatedElement = parent.parentElement;
  let style = window.getComputedStyle(parent);
  if (animatedElement) {
    style = window.getComputedStyle(animatedElement);
  }
  setTimeout(() => {
    expect(style.opacity).toBe(0);
  }, 450);
});
