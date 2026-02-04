import { FC, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { boat, car, error_outlined, flight } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { colors, spacings } from 'src/atoms/style';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { SelectedState, SelectOption, VARIANT_OPTIONS, } from 'src/molecules/Select/Select.types';
import { SingleSelect, SingleSelectProps, } from 'src/molecules/Select/SingleSelect/SingleSelect';

import { actions } from 'storybook/actions';
import { expect, fn, screen, userEvent, within } from 'storybook/test';

const meta: Meta<typeof SingleSelect> = {
  title: 'Molecules/Select/SingleSelect',
  component: SingleSelect,
  argTypes: {
    variant: {
      control: 'radio',
      options: [...VARIANT_OPTIONS, undefined],
      description: 'Variants',
    },
    helperText: { control: 'text' },
    showHelperIcon: { control: 'boolean' },
  },
  args: {
    label: 'Label here',
    helperText: 'helper text',
    sortValues: true,
    clearable: true,
    meta: 'Meta label here',
  },
};

export default meta;

type Story = StoryObj<typeof SingleSelect>;

interface Item {
  label: string;
  value: string;
}

const FAKE_ITEMS = new Array(5).fill(0).map(() => ({
  label: faker.animal.fish(),
  value: faker.string.uuid(),
}));

const FAKE_GROUPS = new Array(faker.number.int({ min: 3, max: 6 }))
  .fill(0)
  .map((_, index) => ({
    title: `${faker.animal.lion()} Group ${index + 1}`,
    items: new Array(faker.number.int({ min: 1, max: 5 })).fill(0).map(() => ({
      label: faker.animal.fish(),
      value: faker.string.uuid(),
    })),
  }));

const FAKE_ITEMS_WITH_REALLY_LONG_NAMES = new Array(
  faker.number.int({ min: 3, max: 6 })
)
  .fill(0)
  .map(() => ({
    label: `${faker.airline.airplane().name} ${faker.airline.aircraftType()} ${faker.airline.airport().name}`,
    value: faker.string.uuid(),
  }));

function SingleSelectStateful(args: SingleSelectProps<Item>) {
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return <SingleSelect {...args} value={value} onSelect={handleOnSelect} />;
}

export const BasicSingleSelect: Story = {
  render: SingleSelectStateful,
  args: {
    items: FAKE_ITEMS,
  },
};

export const Explanation: Story = {
  render: SingleSelectStateful,
  args: {
    items: FAKE_ITEMS,
    explanation:
      'This is an explanation text providing more details about the select field.',
    explanationPosition: 'top',
  },
  play: async ({ canvas, args }) => {
    // First icon will be the explanation icon
    await userEvent.hover(canvas.getAllByTestId('eds-icon-path')[0]);
    await expect(
      await screen.findByText(args.explanation as string)
    ).toBeInTheDocument();
  },
};

export const ReallyLongName: Story = {
  render: SingleSelectStateful,
  args: {
    items: FAKE_ITEMS_WITH_REALLY_LONG_NAMES,
  },
};

export const Groups: Story = {
  render: SingleSelectStateful,
  args: {
    groups: FAKE_GROUPS,
  },
};

export const AddFunctionality: StoryFn = (args) => {
  const [items, setItems] = useState([...FAKE_ITEMS]);
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  const handleOnAdd = (value: string) => {
    actions('onItemAdd').onItemAdd(value);
    const newItem = {
      label: value,
      value: faker.string.uuid(),
    };
    // NEW
    setItems((prev) => [...prev, newItem]);
    setValue(newItem);
  };

  return (
    <SingleSelect
      {...args}
      items={items}
      value={value}
      onSelect={handleOnSelect}
      onAddItem={handleOnAdd}
    />
  );
};

const CustomMenuItem: FC<{
  item: SelectOption<Item>;
  selectedState: SelectedState;
}> = ({ item, selectedState }) => (
  <>
    {selectedState === 'selected' && 'selected: '}
    {item.label}
  </>
);

export const CustomizableMenuItem: Story = {
  render: SingleSelectStateful,
  args: {
    items: FAKE_ITEMS,
    CustomMenuItemComponent: CustomMenuItem,
  },
};

function getIcon(value: 'car' | 'airplane' | 'boat') {
  switch (value) {
    case 'car':
      return car;
    case 'airplane':
      return flight;
    case 'boat':
      return boat;
  }
}

const CustomValueComponent: FC<{
  item: {
    value: 'car' | 'airplane' | 'boat';
    label: 'Car' | 'Airplane' | 'Boat';
  };
}> = ({ item }) => {
  return (
    <div
      style={{ display: 'flex', gap: spacings.x_small, alignItems: 'center' }}
    >
      <Icon
        data={getIcon(item.value)}
        color={colors.text.static_icons__tertiary.rgba}
      />
      {item.label}
    </div>
  );
};

export const CustomizableValueComponent: StoryFn = (args) => {
  const [value, setValue] = useState<
    SelectOption<{
      value: 'car' | 'airplane' | 'boat';
      label: 'Car' | 'Airplane' | 'Boat';
    }>
  >({
    value: 'car',
    label: 'Car',
  });

  const handleOnSelect = (
    selectedValue:
      | SelectOption<{
          value: 'car' | 'airplane' | 'boat';
          label: 'Car' | 'Airplane' | 'Boat';
        }>
      | undefined
  ) => {
    if (selectedValue === undefined) return;

    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <SingleSelect
      {...args}
      items={[
        {
          value: 'car',
          label: 'Car',
        },
        {
          value: 'airplane',
          label: 'Airplane',
        },
        {
          value: 'boat',
          label: 'Boat',
        },
      ]}
      value={value}
      onSelect={handleOnSelect}
      customValueComponent={CustomValueComponent}
      clearable={false}
    />
  );
};

export const DisabledSingleSelect: Story = {
  render: SingleSelectStateful,
  args: {
    disabled: true,
    items: FAKE_ITEMS,
    value: FAKE_ITEMS[0],
    onSelect: () => {},
  },
  play: async ({ canvas, step }) => {
    await step('Verify that the select is disabled', () => {
      expect(canvas.getByRole('combobox')).toBeDisabled();
    });
    await step('Verify that the clear button is disabled', () => {
      expect(canvas.getByTestId('clearBtn')).toBeDisabled();
    });
  },
};

export const TestDirtyVariant: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    variant: 'dirty',
    helperText: 'This is the helper text',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const rgbValue = `rgb${VARIANT_COLORS['dirty'].split(', rgba')[1].split(',').slice(0, 3).join(',')})`;
    await expect(canvas.getByText(args.helperText ?? '')).toHaveStyle({
      color: rgbValue,
    });
  },
};

export const TestRendersPlaceholder: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    placeholder: 'Select an item',
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Select an item')).toBeInTheDocument();
  },
};

export const TestDataTestId: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    onSelect: fn(),
    'data-testid': 'my-single-select',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('my-single-select')).toBeInTheDocument();
  },
};

export const TestHelperText: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    helperText: 'This is helper text',
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This is helper text')).toBeInTheDocument();
  },
};

export const TestHelperTextWithVariant: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    helperText: 'Error helper text',
    variant: 'error',
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    const helperTextElement = canvas.getByText('Error helper text');
    await expect(helperTextElement).toBeInTheDocument();
    const helperIcon = within(
      helperTextElement.parentElement!.parentElement!
    ).getByTestId('eds-icon-path');
    await expect(helperIcon).toBeInTheDocument();
  },
};

export const TestOnlyMetaLabel: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    meta: 'Meta label only',
    label: undefined,
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Meta label only')).toBeInTheDocument();
  },
};

export const TestClickingItems: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS.map((item, index) => ({
      ...item,
      label: item.label + index,
    })),
    value: undefined,
    label: 'Select Item',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText('Select Item')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('combobox'));

    // Items should be visible
    for (const item of args.items ?? []) {
      await expect(canvas.getByText(item.label)).toBeInTheDocument();
    }

    // Click an item
    await userEvent.click(canvas.getByText((args.items ?? [])[0].label));

    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await expect(args.onSelect).toHaveBeenCalledWith((args.items ?? [])[0]);
  },
};

export const TestDeselectItem: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: FAKE_ITEMS[0],
    label: 'Select Item',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('combobox'));

    // Click the same item to deselect
    await userEvent.click(
      canvas.getByRole('menuitem', { name: FAKE_ITEMS[0].label })
    );

    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await expect(args.onSelect).toHaveBeenCalledWith(undefined);
  },
};

const CustomMenuItemComponent: FC<{ item: SelectOption<Item> }> = ({
  item,
}) => <span>custom item - {item.value}</span>;

export const TestCustomMenuItem: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: FAKE_ITEMS[0],
    label: 'Custom Menu',
    onSelect: fn(),
    CustomMenuItemComponent,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('combobox'));
    await expect(
      canvas.getByText(`custom item - ${FAKE_ITEMS[0].value}`)
    ).toBeInTheDocument();
  },
};

export const TestCustomFilterFn: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    label: 'Filter Items',
    onSelect: fn(),
    onSearchFilter: fn(),
  },
  play: async ({ canvas, args }) => {
    const searchField = canvas.getByRole('combobox');
    const search = faker.book.title();
    await userEvent.type(searchField, search);
    for (const item of args.items ?? []) {
      await expect(args.onSearchFilter).toHaveBeenCalledWith(search, item);
    }
  },
};

export const TestCustomFilterFnGroups: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    groups: FAKE_GROUPS,
    value: undefined,
    label: 'Filter Groups',
    onSelect: fn(),
    onSearchFilter: fn(),
  },
  play: async ({ canvas, args }) => {
    const searchField = canvas.getByRole('combobox');
    const groups = args.groups ?? [];
    const search = faker.book.title();
    await userEvent.type(searchField, search);
    const items = groups.flatMap((group) => group.items ?? []);
    for (const item of items) {
      await expect(args.onSearchFilter).toHaveBeenCalledWith(search, item);
    }
  },
};

export const TestFilteringGroups: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    groups: FAKE_GROUPS,
    value: undefined,
    label: 'Filter Groups',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const searchField = canvas.getByRole('combobox');
    const groups = args.groups ?? [];
    await userEvent.type(searchField, groups[0].items[0].label);

    await expect(
      canvas.queryByText(groups[1].title ?? '')
    ).not.toBeInTheDocument();
    await expect(canvas.getByText(groups[0].title ?? '')).toBeInTheDocument();
  },
};

export const TestFilteringGroupsNoMatch: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    groups: FAKE_GROUPS,
    value: undefined,
    label: 'Filter Groups',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const searchField = canvas.getByRole('combobox');
    const groups = args.groups ?? [];
    await userEvent.type(searchField, faker.airline.airplane().name);

    for (const group of groups) {
      await expect(
        canvas.queryByText(group.title ?? '')
      ).not.toBeInTheDocument();
    }

    await expect(canvas.getByText(/no items found/i)).toBeInTheDocument();
  },
};

export const TestFilteringListNoMatch: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    label: 'Filter items',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const searchField = canvas.getByRole('combobox');
    const items = args.items ?? [];
    await userEvent.type(searchField, faker.book.title());

    for (const item of items) {
      await expect(canvas.queryByText(item.label)).not.toBeInTheDocument();
    }

    await expect(canvas.getByText(/no items found/i)).toBeInTheDocument();
  },
};

export const TestAddItem: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    label: 'Label goes here',
    onAddItem: fn(),
    onSelect: fn(),
    itemSingularWord: 'plane',
  },
  play: async ({ canvas, args, step }) => {
    const searchField = canvas.getByRole('combobox');
    await userEvent.type(searchField, faker.book.title());

    await expect(
      canvas.getByText(
        new RegExp(
          `no ${'itemSingularWord' in args ? args.itemSingularWord : ''} for`,
          'i'
        )
      )
    ).toBeInTheDocument();
    await step('Add item via keyboard', async () => {
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}{Enter}');
    });
    await expect(
      'onAddItem' in args ? args.onAddItem : fn()
    ).toHaveBeenCalledTimes(1);
  },
};

export const TestWithoutHelperIcon: Story = {
  render: SingleSelectStateful,
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    label: 'Label goes here',
    onSelect: fn(),
    showHelperIcon: false,
    variant: 'error',
    helperText: 'There is an error',
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByTestId('eds-icon-path')).not.toHaveAttribute(
      'd',
      error_outlined.svgPathData as string
    );
    await expect(canvas.getByText(args.helperText ?? '')).toBeInTheDocument();
  },
};
