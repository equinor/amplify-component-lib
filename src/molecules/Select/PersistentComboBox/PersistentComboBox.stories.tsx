import { FC, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { checkbox, checkbox_outline } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ComboBoxChip } from '../Select.styles';
import {
  PersistentComboBox,
  PersistentComboBoxProps,
} from './PersistentComboBox';
import { spacings } from 'src/atoms';
import {
  SelectedState,
  SelectOption,
  SelectOptionRequired,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';

import { actions } from 'storybook/actions';
import styled from 'styled-components';

const FAKE_ITEMS = new Array(10).fill(0).map(() => ({
  label: faker.animal.fish(),
  value: faker.string.uuid(),
}));

const meta: Meta<typeof PersistentComboBox> = {
  title: 'Molecules/Select/PersistentComboBox',
  component: PersistentComboBox,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    meta: { control: 'text' },
    maxHeight: { control: 'text' },
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
    syncParentChildSelection: true,
    sortValues: true,
    clearable: true,
    maxHeight: undefined,
    showSelectedAsText: false,
    items: FAKE_ITEMS,
  },
};

export default meta;

interface Item {
  label: string;
  value: string;
}

const FAKE_GROUPS = new Array(faker.number.int({ min: 2, max: 4 }))
  .fill(0)
  .map(() => ({
    title: faker.animal.lion(),
    items: new Array(faker.number.int({ min: 2, max: 4 })).fill(0).map(() => ({
      label: faker.animal.fish(),
      value: faker.string.uuid(),
    })),
  }));

const FAKE_ITEMS_WITH_CHILDREN = [
  {
    label: faker.animal.fish(),
    value: faker.string.uuid(),
    children: new Array(faker.number.int({ min: 3, max: 3 }))
      .fill(0)
      .map(() => ({
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

type Story = StoryObj<typeof PersistentComboBox>;

const PersistentComboBoxWithState = (
  args: PersistentComboBoxProps<SelectOptionRequired>
) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <PersistentComboBox {...args} values={values} onSelect={handleOnSelect} />
  );
};

const PersistentComboBoxWithAddState = (
  args: PersistentComboBoxProps<SelectOptionRequired>
) => {
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
    <PersistentComboBox
      {...args}
      items={items}
      values={values}
      onSelect={handleOnSelect}
      groups={undefined}
      onAddItem={handleOnAdd}
    />
  );
};

export const BasicPersistentComboBox: Story = {
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithSmallParent: Story = {
  render: (args) => (
    <div
      style={{
        height: '500px',
        padding: spacings.large,
        backgroundColor: 'lightcyan',
      }}
    >
      <PersistentComboBoxWithState {...args} />
    </div>
  ),
};

export const PersistentComboBoxWithLargeParent: Story = {
  render: (args) => (
    <div
      style={{
        height: '1000px',
        padding: spacings.large,
        backgroundColor: 'lightcyan',
      }}
    >
      <PersistentComboBoxWithState {...args} />
    </div>
  ),
};

export const PersistentComboBoxWithMaxHeight: Story = {
  args: {
    maxHeight: '400px',
  },
  render: (args) => (
    <div
      style={{
        height: '1000px',
        padding: spacings.large,
        backgroundColor: 'lightcyan',
      }}
    >
      <PersistentComboBoxWithState {...args} />
    </div>
  ),
};

export const PersistentComboBoxWithReallyLongName: Story = {
  args: {
    items: FAKE_ITEMS_WITH_REALLY_LONG_NAMES,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithLabelsAndHelperText: Story = {
  args: {
    label: 'Label here',
    helperText: 'helper text',
    meta: 'Meta label here',
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithGroups: Story = {
  args: {
    groups: FAKE_GROUPS,
    items: undefined,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxParented: Story = {
  args: {
    items: FAKE_ITEMS_WITH_CHILDREN,
  },
  render: (args) => {
    console.log(args.items);
    return <PersistentComboBoxWithState {...args} />;
  },
};

export const PersistentComboBoxWithAdd: Story = {
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
};

export const PersistentComboBoxWithSelectedValuesAsText: Story = {
  args: { showSelectedAsText: true },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithCustomSelectedValuesAsTextFunction: Story = {
  args: {
    showSelectedAsText: ({ selectedAmount, totalAmount }) =>
      `${selectedAmount} of ${totalAmount} fishes selected`,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

const Dot = styled.div`
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

export const PersistentComboBoxWithCustomValueElements: Story = {
  args: {
    customValueComponent: CustomValueElement,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
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

export const PersistentComboBoxWithCustomizableSelectMenuItem: Story = {
  args: {
    CustomMenuItemComponent: CustomMenuItem,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};
