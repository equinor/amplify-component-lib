import { faker } from '@faker-js/faker';

import {
  OptionDrawer,
  OptionDrawerProps,
  ToggleEventProps,
} from 'src/molecules/OptionDrawer/OptionDrawer';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

interface FakeType {
  id: string;
  label: string;
  disabled?: boolean;
  children?: FakeType[];
}

function fakeItem(hasChildren: boolean, singleChild: boolean): FakeType {
  const children: FakeType[] = [];
  if (hasChildren && singleChild) {
    return {
      id: faker.string.uuid(),
      label: faker.string.uuid(),
      children: [
        {
          id: faker.string.uuid(),
          label: faker.string.uuid(),
        },
      ],
    };
  }
  if (hasChildren) {
    for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
      children.push({
        id: faker.string.uuid(),
        label: faker.string.uuid(),
      });
    }
  }
  return {
    id: faker.string.uuid(),
    label: faker.string.uuid(),
    children: children.length > 0 ? children : undefined,
  };
}

function fakeProps(
  singleSelect = false,
  hasChildren = true,
  singleChild = false,
  grandChildren = false
): OptionDrawerProps<FakeType> {
  const item = fakeItem(hasChildren, singleChild);
  if (grandChildren && hasChildren && item.children?.[0]) {
    item.children[0].children = [fakeItem(false, false)];
  }

  return {
    item,
    onToggle: vi.fn(),
    singleSelect,
  };
}

interface FakeSelectedItemType {
  id: string;
  label: string;
}

let selectedItems: FakeSelectedItemType[] = [];
const handleOnToggle = (e: ToggleEventProps<FakeSelectedItemType>) => {
  let newItems: FakeSelectedItemType[] = [];
  e.items.forEach((item) => {
    const option: FakeSelectedItemType = {
      id: item.id,
      label: item.label,
    };
    newItems.push(option);
  });

  if (e.toggle) {
    newItems = newItems.filter(
      (item) => !selectedItems.some((selItem) => selItem.id === item.id)
    );
    selectedItems = [...selectedItems, ...newItems];
  } else {
    let newSelectedItems = selectedItems;
    newItems.forEach((item) => {
      newSelectedItems = newSelectedItems.filter((m) => !(m.id === item.id));
    });
    selectedItems = newSelectedItems;
  }
};

test('Works correctly when toggling parent when one child is checked', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  selectedItems = [];

  const children = props.item.children ?? [props.item];

  const randomChild =
    children[
      faker.number.int({
        min: 0,
        max: children.length - 1,
      })
    ];

  const { rerender } = render(
    <OptionDrawer
      {...props}
      selectedItems={[randomChild]}
      onToggle={handleOnToggle}
    />
  );

  const parentCheckbox = screen.getByRole('checkbox');

  await user.click(parentCheckbox);

  rerender(
    <OptionDrawer
      {...props}
      selectedItems={selectedItems}
      onToggle={handleOnToggle}
      openAll
    />
  );

  for (const child of props.item.children ?? []) {
    expect(screen.getByText(child.label).children[0].children[0]).toBeChecked();
  }
});

test('Works correctly when opening parent to show children', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<OptionDrawer {...props} />);

  const parent = screen.getByText(props.item.label);

  await user.click(parent);
  for (const child of props.item.children ?? []) {
    expect(screen.queryByText(child.label)).toBeVisible();
  }
});

test('Shows expected status for parent if singleSelect=true', async () => {
  const props = fakeProps();
  render(
    <OptionDrawer
      {...props}
      singleSelect
      selectedItems={[props.item!.children![0]]}
    />
  );

  expect(screen.getByRole('checkbox')).toHaveAttribute(
    'data-indeterminate',
    'false'
  );
});

test('chevron toggler works as expected', async () => {
  const user = userEvent.setup();

  const props = fakeProps();
  const children = props.item.children ?? [props.item];

  render(<OptionDrawer {...props} selectedItems={children} openAll />);

  const allLabels = children.map((child) => child.label);
  allLabels.forEach((label) =>
    expect(screen.getByText(label)).toBeInTheDocument()
  );

  const toggler = screen.getByTestId('chevron-toggler-option-drawer');
  await user.click(toggler);

  allLabels.forEach((label) =>
    expect(screen.queryByText(label)).not.toBeInTheDocument()
  );
});

test("Doesn't call onToggle if disabled", async () => {
  const user = userEvent.setup();

  const props = fakeProps();
  const onToggle = vi.fn();

  render(
    <OptionDrawer
      {...props}
      item={{ ...props.item, disabled: true }}
      onToggle={onToggle}
    />
  );

  await user.click(screen.getByText(props.item.label));

  expect(onToggle).not.toHaveBeenCalled();
});
