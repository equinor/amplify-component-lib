import { FC, useState } from 'react';

import { Button, Dialog, Icon } from '@equinor/eds-core-react';
import { checkbox, checkbox_outline } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { ComboBoxChip } from '../Select.styles';
import { ComboBox } from './ComboBox';
import { spacings } from 'src/atoms/style';
import {
  SelectedState,
  SelectOption,
  SelectOptionRequired,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';

import { actions } from 'storybook/actions';
import { expect, fn, userEvent, within } from 'storybook/test';
import styled from 'styled-components';

const meta: Meta<typeof ComboBox> = {
  title: 'Molecules/Select/ComboBox',
  component: ComboBox,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    showHelperIcon: { control: 'boolean' },
    syncParentChildSelection: { control: 'boolean' },
    sortValues: { control: 'boolean' },
    clearable: { control: 'boolean' },
    variant: {
      control: 'radio',
      options: [...VARIANT_OPTIONS, undefined],
      description: 'Variants',
    },
  },
  args: {
    label: 'Label here',
    helperText: 'helper text',
    showHelperIcon: true,
    syncParentChildSelection: true,
    sortValues: true,
    clearable: true,
    meta: 'Meta label here',
  },
};

export default meta;

interface Item {
  label: string;
  value: string;
}

const FAKE_ITEMS = new Array(10).fill(0).map(() => ({
  label: faker.animal.fish(),
  value: faker.string.uuid(),
}));

const FAKE_GROUPS = new Array(faker.number.int({ min: 3, max: 6 }))
  .fill(0)
  .map(() => ({
    title: faker.animal.lion(),
    items: new Array(faker.number.int({ min: 1, max: 5 })).fill(0).map(() => ({
      label: faker.animal.fish(),
      value: faker.string.uuid(),
    })),
  }));

const FAKE_ITEMS_WITH_CHILDREN = [
  {
    label: faker.animal.fish(),
    value: faker.string.uuid(),
    children: new Array(3).fill(0).map(() => ({
      label: faker.animal.fish(),
      value: faker.string.uuid(),
      children: new Array(faker.number.int({ min: 3, max: 3 }))
        .fill(0)
        .map(() => ({
          label: faker.animal.fish(),
          value: faker.string.uuid(),
        })),
    })),
  },
  ...new Array(5).fill(0).map(() => ({
    label: faker.animal.fish(),
    value: faker.string.uuid(),
  })),
];

const FAKE_ITEMS_WITH_REALLY_LONG_NAMES = new Array(
  faker.number.int({ min: 3, max: 6 })
)
  .fill(0)
  .map(() => ({
    label: `${faker.airline.airplane().name} ${faker.airline.aircraftType()} ${faker.airline.airport().name}`,
    value: faker.string.uuid(),
  }));

export const BasicComboBox: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
    />
  );
};

export const ReallyLongName: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS_WITH_REALLY_LONG_NAMES}
      values={values}
      onSelect={handleOnSelect}
    />
  );
};

export const Groups: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      values={values}
      groups={FAKE_GROUPS}
      onSelect={handleOnSelect}
    />
  );
};

export const Parented: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS_WITH_CHILDREN}
      values={values}
      onSelect={handleOnSelect}
    />
  );
};

export const InDialog: StoryFn = (args) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState<SelectOption<Item>[]>([]);
  const [openComboBox, setOpenComboBox] = useState(false);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  const handleOnComboboxOpen = (value: boolean) => setOpenComboBox(value);

  const handleDialogOnClose = () => {
    if (!openComboBox) setOpenDialog(false);
  };

  return (
    <>
      <Button onClick={() => setOpenDialog(true)}>Open dialog</Button>
      <Dialog
        open={openDialog}
        onClose={handleDialogOnClose}
        isDismissable
        style={{ width: '40rem ' }}
      >
        <Dialog.Content>
          <ComboBox
            {...args}
            inDialog
            onOpenCallback={handleOnComboboxOpen}
            items={FAKE_ITEMS}
            values={values}
            onSelect={handleOnSelect}
          />
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export const AddFunctionality: StoryFn = (args) => {
  const [items, setItems] = useState([...FAKE_ITEMS]);
  const [values, setValues] = useState<SelectOption<Item>[]>([]);
  const handleOnSelect = (newValues: SelectOptionRequired[]) => {
    actions('onSelect').onSelect(newValues);
    setValues(newValues);
  };

  const handleOnAdd = (value: string) => {
    actions('onItemAdd').onItemAdd(value);
    const newItem = {
      label: value,
      value: faker.string.uuid(),
    };
    // NEW
    setItems((prev) => [...prev, newItem]);
    setValues((prev) => [...prev, newItem]);
  };

  return (
    <ComboBox
      {...args}
      values={values as SelectOptionRequired[]}
      items={items}
      onSelect={handleOnSelect}
      onAddItem={handleOnAdd}
    />
  );
};

const Dot = styled.span`
  background: red;
  border-radius: 50%;
  width: 4px;
  height: 4px;
`;

const CustomValueElement: FC<{
  item: SelectOption<Item>;
  onDelete: () => void;
  tryingToRemove: boolean;
}> = ({ item, onDelete, tryingToRemove }) => (
  <ComboBoxChip
    className="amplify-combo-box-chip"
    onDelete={onDelete}
    $tryingToRemove={tryingToRemove}
  >
    <Dot />
    {item.label}
  </ComboBoxChip>
);

export const CustomizableValueElement: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
      customValueComponent={CustomValueElement}
    />
  );
};

export const SelectedValuesAsText: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
      showSelectedAsText
    />
  );
};

export const CustomSelectedValuesAsTextFunction: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
      showSelectedAsText={({ selectedAmount, totalAmount }) =>
        `${selectedAmount} of ${totalAmount} fishes selected`
      }
    />
  );
};

const CustomMenuItem: FC<{
  item: SelectOption<Item>;
  selectedState: SelectedState;
}> = ({ item, selectedState }) => (
  <>
    <Icon data={selectedState === 'selected' ? checkbox : checkbox_outline} />
    <Dot />
    {item.label}
  </>
);

export const CustomizableMenuItem: StoryFn = (args) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
      showSelectedAsText={({ selectedAmount, totalAmount }) =>
        `${selectedAmount} of ${totalAmount} fishes selected`
      }
      CustomMenuItemComponent={CustomMenuItem}
    />
  );
};

// Test Stories
type Story = StoryObj<typeof ComboBox>;

const TEST_ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
];

const TEST_ITEMS_WITH_CHILDREN = [
  {
    label: 'Fruits',
    value: 'fruits',
    children: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    value: 'vegetables',
    children: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
    ],
  },
];

const TEST_GROUPS = [
  {
    title: 'Group A',
    items: [
      { label: 'Item A1', value: 'a1' },
      { label: 'Item A2', value: 'a2' },
    ],
  },
  {
    title: 'Group B',
    items: [
      { label: 'Item B1', value: 'b1' },
      { label: 'Item B2', value: 'b2' },
    ],
  },
];

export const TestRendersPlaceholder: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [],
    placeholder: 'Select items',
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Select items')).toBeInTheDocument();
  },
};

export const TestDataTestId: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [],
    onSelect: fn(),
    'data-testid': 'my-combo-box',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('my-combo-box')).toBeInTheDocument();
  },
};

export const TestSelectItemsWithClicks: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [],
    label: 'Select Items',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    // Items should be visible
    for (const item of TEST_ITEMS) {
      await expect(canvas.getByText(item.label)).toBeInTheDocument();
    }

    // Click first item
    await userEvent.click(canvas.getByText(TEST_ITEMS[0].label));

    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await expect(args.onSelect).toHaveBeenCalledWith(
      [TEST_ITEMS[0]],
      TEST_ITEMS[0]
    );
  },
};

export const TestOnAddItemWithEnter: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [],
    onSelect: fn(),
    onAddItem: fn(),
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'New Item');
    await userEvent.keyboard('{Enter}');

    await expect(
      'onAddItem' in args ? args.onAddItem : null
    ).toHaveBeenCalledWith('New Item');
  },
};

export const TestOnAddItemWithClick: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [],
    onSelect: fn(),
    onAddItem: fn(),
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'New Tag');

    const newTagMenuItem = canvas.getByRole('menuitem');
    await expect(newTagMenuItem).toBeInTheDocument();

    await userEvent.click(newTagMenuItem);

    const handleOnAddItemClick = 'onAddItem' in args ? args.onAddItem : null;
    await expect(handleOnAddItemClick).toHaveBeenCalledWith('New Tag');
    await expect(handleOnAddItemClick).toHaveBeenCalledTimes(1);
  },
};

export const TestGroupsPreselected: Story = {
  tags: ['test-only'],
  args: {
    groups: TEST_GROUPS,
    values: [TEST_GROUPS[0].items[0]],
    label: 'Select Group Items',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    await userEvent.click(
      canvas.getByRole('menuitem', { name: TEST_GROUPS[0].items[0].label })
    );

    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await expect(args.onSelect).toHaveBeenCalledWith(
      [],
      TEST_GROUPS[0].items[0]
    );
  },
};

export const TestGroupsPreselectedSelectedAsText: Story = {
  tags: ['test-only'],
  args: {
    groups: TEST_GROUPS,
    values: [TEST_GROUPS[0].items[0]],
    label: 'Select Group Items',
    onSelect: fn(),
    showSelectedAsText: true,
  },
  play: async ({ canvas, args }) => {
    const groups = args.groups ?? [];
    await expect(
      canvas.getByText(`1/${groups.flatMap((g) => g.items).length} Selected`)
    ).toBeInTheDocument();
  },
};

export const TestFilteringGroups: Story = {
  tags: ['test-only'],
  args: {
    groups: TEST_GROUPS,
    values: [],
    label: 'Filter Groups',
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    const searchField = canvas.getByRole('combobox');
    await userEvent.type(searchField, TEST_GROUPS[0].items[0].label);

    await expect(canvas.queryByText('Group B')).not.toBeInTheDocument();
    await expect(canvas.getByText('Group A')).toBeInTheDocument();
  },
};

export const TestParentChildSelection: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS_WITH_CHILDREN,
    values: [],
    label: 'Parent Child',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    // Click parent
    await userEvent.click(canvas.getByText('Fruits'));

    await expect(args.onSelect).toHaveBeenCalledWith(
      [TEST_ITEMS_WITH_CHILDREN[0]],
      TEST_ITEMS_WITH_CHILDREN[0]
    );
  },
};

export const TestParentChildSelectionSyncParentFalse: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS_WITH_CHILDREN,
    values: [TEST_ITEMS_WITH_CHILDREN[1].children[0]],
    label: 'Parent Child',
    syncParentChildSelection: false,
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    // Click parent
    await userEvent.click(canvas.getByText('Fruits'));

    await expect(args.onSelect).toHaveBeenCalledWith(
      [TEST_ITEMS_WITH_CHILDREN[0], TEST_ITEMS_WITH_CHILDREN[0].children[0]],
      TEST_ITEMS_WITH_CHILDREN[0]
    );
  },
};

export const TestParentChildSelectionSyncParent: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS_WITH_CHILDREN,
    values: [TEST_ITEMS_WITH_CHILDREN[1]],
    label: 'Parent Child',
    syncParentChildSelection: true,
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    // Click parent
    await userEvent.click(canvas.getByText('Fruits'));

    await expect(args.onSelect).toHaveBeenCalledWith(
      [TEST_ITEMS_WITH_CHILDREN[0]],
      TEST_ITEMS_WITH_CHILDREN[0]
    );
  },
};

export const TestParentChildSelectionSyncParentSelectedChild: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS_WITH_CHILDREN,
    values: [TEST_ITEMS_WITH_CHILDREN[0].children[0]],
    label: 'Parent Child',
    syncParentChildSelection: true,
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    // Click parent
    await userEvent.click(canvas.getByText('Fruits'));

    await expect(args.onSelect).toHaveBeenCalledWith(
      [TEST_ITEMS_WITH_CHILDREN[0]],
      TEST_ITEMS_WITH_CHILDREN[0]
    );
  },
};

export const TestNestedChildLabel: Story = {
  tags: ['test-only'],
  render: () => {
    const items = [
      {
        label: 'level 1',
        value: 'level-1',
        children: [
          {
            label: 'level 2',
            value: 'level-2',
            children: [{ label: 'level 3', value: 'level-3' }],
          },
        ],
      },
    ];

    return (
      <ComboBox
        label="Nested Test"
        items={items}
        values={[{ ...items[0].children[0].children[0], children: [] }]}
        onSelect={() => {}}
      />
    );
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('combobox'));
    await expect(canvas.getByText('level 3')).toBeInTheDocument();
  },
};

export const TestNestedChildPadding: Story = {
  tags: ['test-only'],
  render: () => {
    const items = [
      {
        label: 'Parent Item',
        value: 'parent',
        children: [{ label: 'Child Item', value: 'child' }],
      },
    ];

    return (
      <ComboBox
        label="Padding Test"
        items={items}
        values={[]}
        onSelect={() => {}}
      />
    );
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    const parentMenuItem = canvas.getByRole('menuitem', {
      name: 'Parent Item',
    });
    await expect(parentMenuItem.parentElement).toHaveAttribute(
      'style',
      `padding-left: ${spacings.small};`
    );
  },
};

export const TestRemoveWithBackspace: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [TEST_ITEMS[0]],
    label: 'Backspace Test',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const searchField = canvas.getByRole('combobox');

    await userEvent.click(searchField);
    await userEvent.keyboard('{Backspace}');
    await userEvent.keyboard('{Backspace}');

    await expect(args.onSelect).toHaveBeenCalledWith([], TEST_ITEMS[0]);
  },
};

const TestCustomValueElement: FC<{
  item: SelectOptionRequired;
  onDelete: () => void;
  tryingToRemove: boolean;
}> = ({ item, onDelete, tryingToRemove }) => (
  <ComboBoxChip
    className="amplify-combo-box-chip"
    onDelete={onDelete}
    $tryingToRemove={tryingToRemove}
  >
    <span>custom</span>
    {item.label}
  </ComboBoxChip>
);

export const TestCustomValueComponentRenders: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [TEST_ITEMS[0]],
    label: 'Custom Value',
    onSelect: fn(),
    customValueComponent: TestCustomValueElement,
  },
  play: async ({ canvas }) => {
    const customChip = canvas
      .getByText('custom')
      .closest('.amplify-combo-box-chip');
    await expect(customChip).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.keyboard('{Backspace}');
  },
};

export const TestCustomValueRemovalByClick: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [TEST_ITEMS[0]],
    label: 'Custom Value Click',
    onSelect: fn(),
    customValueComponent: TestCustomValueElement,
  },
  play: async ({ canvas, args }) => {
    const customChip = canvas
      .getByText('custom')
      .closest('.amplify-combo-box-chip');

    await userEvent.click(customChip!);

    await expect(args.onSelect).toHaveBeenCalledWith([], TEST_ITEMS[0]);
  },
};

export const TestShowSelectedAsText: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [TEST_ITEMS[0]],
    label: 'Selected As Text',
    onSelect: fn(),
    showSelectedAsText: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(`1/${TEST_ITEMS.length} Selected`)
    ).toBeInTheDocument();
  },
};

export const TestCustomShowSelectedAsText: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [TEST_ITEMS[0]],
    label: 'Custom Selected Text',
    onSelect: fn(),
    showSelectedAsText: ({ selectedAmount, totalAmount }) =>
      `${selectedAmount} of ${totalAmount} selected`,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(`1 of ${TEST_ITEMS.length} selected`)
    ).toBeInTheDocument();
  },
};

export const TestCustomMenuItemComponent: Story = {
  tags: ['test-only'],
  render: () => {
    const items = [
      {
        label: 'Parent',
        value: 'parent',
        children: [
          { label: 'Child 1', value: 'child1' },
          { label: 'Child 2', value: 'child2' },
        ],
      },
    ];

    return (
      <ComboBox
        label="Custom Menu Item"
        items={items}
        values={[items[0].children[0]]}
        onSelect={() => {}}
        CustomMenuItemComponent={({ item }) => (
          <span>custom item - {item.value}</span>
        )}
      />
    );
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    const parentMenuItem = canvas.getByRole('menuitem', {
      name: 'custom item - parent',
    });

    await userEvent.click(
      within(parentMenuItem.parentElement!).getByTestId('toggle-button')
    );

    await expect(canvas.getByText('custom item - child1')).toBeInTheDocument();
  },
};

export const TestSortsValues: Story = {
  tags: ['test-only'],
  args: {
    items: TEST_ITEMS,
    values: [TEST_ITEMS[3], TEST_ITEMS[1], TEST_ITEMS[0]],
    label: 'Sorted Values',
    onSelect: fn(),
    sortValues: true,
  },
  play: async ({ canvas }) => {
    // Sorted order should be: Apple (0), Banana (1), Date (3)
    const sortedOrder = [TEST_ITEMS[0], TEST_ITEMS[1], TEST_ITEMS[3]];

    for (let i = 1; i < sortedOrder.length; i++) {
      const first = canvas.getByText(sortedOrder[i - 1].label);
      const second = canvas.getByText(sortedOrder[i].label);

      await expect(first.compareDocumentPosition(second)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    }
  },
};

export const TestKeyboardNavigation: Story = {
  tags: ['test-only'],
  args: {
    values: [],
    items: FAKE_ITEMS_WITH_CHILDREN,
    label: 'Keyboard Navigation',
    onSelect: fn(),
  },
  play: async ({ canvas, args, step }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    const parentItem = (args.items ?? [])[0];
    await step(
      'Navigate to second item using keyboard and select it',
      async () => {
        await userEvent.keyboard('{ArrowDown}'); // First item
        await userEvent.keyboard('{ArrowLeft}'); // Open children
        for (let i = 0; i < parentItem.children!.length + 1; i++) {
          await userEvent.keyboard('{ArrowDown}');
        }
        await userEvent.keyboard('{ArrowUp}'); // First item
        await userEvent.keyboard('{ArrowLeft}'); // Open children
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowUp}'); // First item
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{Enter}');
      }
    );
    const selectedItem = parentItem.children![0];
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await expect(args.onSelect).toHaveBeenCalledWith(
      [selectedItem],
      selectedItem
    );
  },
};

export const TestSortValuesFalse: Story = {
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    values: [FAKE_ITEMS[3], FAKE_ITEMS[1], FAKE_ITEMS[0]],
    label: 'Select Item',
    sortValues: false,
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    const elements = canvas.getAllByTestId('amplify-combobox-chip');
    for (let i = 1; i < elements.length; i++) {
      const firstElement = elements[i - 1];
      const secondElement = elements[i];
      await expect(firstElement.compareDocumentPosition(secondElement)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    }
  },
};

export const TestOnOpenCallback: Story = {
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    values: [],
    label: 'Select Item',
    sortValues: false,
    onSelect: fn(),
    onOpenCallback: fn(),
    helperText: undefined,
    showHelperIcon: false,
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByTestId('eds-icon-path'));

    await expect(
      'onOpenCallback' in args ? args.onOpenCallback : null
    ).toHaveBeenCalledTimes(2);
    await expect(
      'onOpenCallback' in args ? args.onOpenCallback : null
    ).toHaveBeenCalledWith(true);

    await userEvent.click(canvas.getAllByTestId('eds-icon-path')[0]);
    await expect(
      'onOpenCallback' in args ? args.onOpenCallback : null
    ).toHaveBeenCalledTimes(3);
    await expect(
      'onOpenCallback' in args ? args.onOpenCallback : null
    ).toHaveBeenCalledWith(false);
  },
};

export const TestOnClear: Story = {
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    values: [FAKE_ITEMS[0]],
    label: 'Select Item',
    sortValues: false,
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByTestId('clearBtn'));

    await expect(args.onSelect).toHaveBeenNthCalledWith(1, []);
  },
};

export const TestOpenWithKeyboard: Story = {
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    values: [],
    label: 'Select Item',
    sortValues: false,
    onSelect: fn(),
  },
  play: async ({ canvas, args, step }) => {
    const combobox = canvas.getByRole('combobox');
    combobox.focus();

    await step('Open and close the combobox using keyboard', async () => {
      await userEvent.keyboard('{Space}');

      for (const item of args.items ?? []) {
        await expect(canvas.getByText(item.label)).toBeInTheDocument();
      }
    });

    await step('Moves focus to search field', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowUp}');
      await expect(canvas.getByRole('combobox')).toHaveFocus();
    });

    await step('Close the combobox using keyboard', async () => {
      await userEvent.keyboard('{Escape}');
      for (const item of args.items ?? []) {
        await expect(canvas.queryByText(item.label)).not.toBeInTheDocument();
      }
    });
  },
};
