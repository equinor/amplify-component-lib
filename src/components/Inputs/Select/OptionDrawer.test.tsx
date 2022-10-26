import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../test-utils';
import OptionDrawer, { OptionDrawerProps } from './OptionDrawer';

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
    onToggle: jest.fn(),
    singleSelect,
  };
}

test('Works correctly when clicking item with no children', async () => {
  const props = fakeProps(false, false);
  const user = userEvent.setup();
  render(<OptionDrawer {...props} />);

  const parent = screen.getByText(props.item.label);
  await user.click(parent);

  expect(props.onToggle).toHaveBeenCalledWith(props.item, true);
});

test('Works correctly when clicking children', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<OptionDrawer {...props} />);

  const parent = screen.getByText(props.item.label);
  await user.click(parent);

  for (const child of props.item.children ?? []) {
    await user.click(screen.getByText(child.label));
    expect(props.onToggle).toHaveBeenCalledWith(child, true);
  }
  expect(props.onToggle).toHaveBeenCalledTimes(
    props.item.children?.length ?? 0
  );
});

test('Works correctly when clicking grand child', async () => {
  const props = fakeProps(false, true, true);
  const user = userEvent.setup();
  render(<OptionDrawer {...props} />);

  const parent = screen.getByText(props.item.label);
  await user.click(parent);

  // First child has grand child
  const label = props.item.children?.[0].label ?? 'failed';
  const grandChildren = props.item.children?.[0].children ?? [];
  await user.click(screen.getByText(label));

  expect(grandChildren.length).toBeGreaterThanOrEqual(1);
  for (const grandChild of grandChildren) {
    await user.click(screen.getByText(grandChild.label));
    expect(props.onToggle).toHaveBeenCalledWith(
      { id: grandChild.id, label: grandChild.label },
      true
    );
  }

  expect(props.onToggle).toHaveBeenCalledTimes(grandChildren.length);
});
