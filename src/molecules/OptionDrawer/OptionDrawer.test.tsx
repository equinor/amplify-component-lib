import { faker } from '@faker-js/faker';

import {
  OptionDrawer,
  OptionDrawerProps,
  ToggleEventProps,
} from 'src/molecules/OptionDrawer/OptionDrawer';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

interface FakeType {
  id: string;
  label: string;
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

test('Animation works correctly when toggling parent with no child', async () => {
  const props = fakeProps(false, false);
  const user = userEvent.setup();
  const { rerender } = render(<OptionDrawer {...props} animateCheck={true} />);

  const parentElement = screen.getByText(props.item.label);

  await user.click(parentElement);

  await waitFor(
    () =>
      expect(
        screen.getByTestId('animated-' + props.item.id).parentElement
      ).toBeInTheDocument(),
    { timeout: 500 }
  );

  rerender(
    <OptionDrawer
      {...props}
      selectedItems={[props.item]}
      animateUncheck={true}
    />
  );

  await user.click(parentElement);

  await waitFor(
    () =>
      expect(
        screen.getByTestId('animated-' + props.item.id).parentElement
      ).toBeInTheDocument(),
    { timeout: 500 }
  );
});

test('Children does not trigger animation if you check all but one sibling', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const children = props.item.children ?? [props.item];
  const childrenExpectLast = children.slice(0, -1);

  render(<OptionDrawer {...props} animateCheck={true} openAll />);

  for (const child of childrenExpectLast) {
    await user.click(screen.getByText(child.label));
  }

  expect(screen.queryByTestId('animated-' + props.item.id)).toBeNull();
  expect(props.onToggle).toHaveBeenCalledTimes(childrenExpectLast.length);
});

test('Children does not trigger animation if you uncheck all but one sibling', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const children = props.item.children ?? [props.item];
  const childrenExpectLast = children.slice(0, -1);

  render(
    <OptionDrawer
      {...props}
      selectedItems={children}
      animateUncheck={true}
      openAll
    />
  );

  for (const child of childrenExpectLast) {
    await user.click(screen.getByText(child.label));
  }

  expect(screen.queryByTestId('animated-' + props.item.id)).toBeNull();
  expect(props.onToggle).toHaveBeenCalledTimes(childrenExpectLast.length);
});

test('Animation works correctly when checking all children', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const children = props.item.children ?? [props.item];

  const { rerender } = render(
    <OptionDrawer
      {...props}
      selectedItems={[
        ...children.filter(
          (child) => child.id !== children[children.length - 1].id
        ),
      ]}
      animateCheck={true}
      openAll
    />
  );

  await user.click(screen.getByText(children[children.length - 1].label));

  await waitFor(
    () =>
      expect(
        screen.getByTestId('animated-' + props.item.id).parentElement
      ).toBeInTheDocument(),
    { timeout: 500 }
  );

  rerender(
    <OptionDrawer
      {...props}
      selectedItems={[...children]}
      animateCheck={true}
      openAll
    />
  );

  expect(
    screen.getByText(props.item.label).children[0].children[0]
  ).toBeChecked();
});

test('Animation works correctly when unchecking all children', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const children = props.item.children ?? [props.item];

  const { rerender } = render(
    <OptionDrawer
      {...props}
      selectedItems={[children[children.length - 1]]}
      animateUncheck={true}
      openAll
    />
  );
  await user.click(screen.getByText(children[children.length - 1].label));

  await waitFor(
    () =>
      expect(
        screen.getByTestId('animated-' + props.item.id).parentElement
      ).toBeInTheDocument(),
    { timeout: 500 }
  );

  rerender(
    <OptionDrawer {...props} selectedItems={[]} animateCheck={true} openAll />
  );

  expect(
    screen.getByText(props.item.label).children[0].children[0]
  ).not.toBeChecked();
});

test('onToggle is called after check animation', async () => {
  const props = fakeProps(false, false);
  const user = userEvent.setup();

  render(<OptionDrawer {...props} animateCheck={true} />);

  await user.click(screen.getByText(props.item.label));
  await waitFor(() => expect(props.onToggle).toHaveBeenCalledTimes(1), {
    timeout: 800,
  });
});

test('onToggle is called after uncheck animation', async () => {
  const props = fakeProps(false, false);
  const user = userEvent.setup();

  render(
    <OptionDrawer
      {...props}
      selectedItems={[props.item]}
      animateUncheck={true}
    />
  );

  await user.click(screen.getByText(props.item.label));
  await waitFor(() => expect(props.onToggle).toHaveBeenCalledTimes(1), {
    timeout: 800,
  });
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
