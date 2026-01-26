import { FC, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { boat, car, flight } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { colors, spacings } from 'src/atoms/style';
import {
  SelectedState,
  SelectOption,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';

import { actions } from 'storybook/actions';
import { expect, fn, userEvent, within } from 'storybook/test';

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
  .map(() => ({
    title: faker.animal.lion(),
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

export const BasicSingleSelect: StoryFn = (args) => {
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <SingleSelect
      {...args}
      items={FAKE_ITEMS}
      value={value}
      onSelect={handleOnSelect}
    />
  );
};

export const ReallyLongName: StoryFn = (args) => {
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <SingleSelect
      {...args}
      items={FAKE_ITEMS_WITH_REALLY_LONG_NAMES}
      value={value}
      onSelect={handleOnSelect}
    />
  );
};

export const Groups: StoryFn = (args) => {
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <SingleSelect
      {...args}
      groups={FAKE_GROUPS}
      value={value}
      onSelect={handleOnSelect}
    />
  );
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

export const CustomizableMenuItem: StoryFn = (args) => {
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <SingleSelect
      {...args}
      items={FAKE_ITEMS}
      value={value}
      onSelect={handleOnSelect}
      CustomMenuItemComponent={CustomMenuItem}
    />
  );
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

type Story = StoryObj<typeof SingleSelect>;

export const DisabledSingleSelect: Story = {
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

export const TestRendersPlaceholder: Story = {
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
  tags: ['test-only'],
  args: {
    items: FAKE_ITEMS,
    value: undefined,
    label: 'Select Item',
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText('Select Item')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('combobox'));

    // Items should be visible
    for (const item of FAKE_ITEMS) {
      await expect(canvas.getByText(item.label)).toBeInTheDocument();
    }

    // Click an item
    await userEvent.click(canvas.getByText(FAKE_ITEMS[0].label));

    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await expect(args.onSelect).toHaveBeenCalledWith(FAKE_ITEMS[0]);
  },
};

export const TestDeselectItem: Story = {
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
