import { FC, useState } from 'react';

import { Button, Dialog, Icon } from '@equinor/eds-core-react';
import { checkbox, checkbox_outline } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { ComboBoxChip } from '../Select.styles';
import { ComboBox, ComboBoxProps } from './ComboBox';
import {
  SelectedState,
  SelectOption,
  SelectOptionRequired,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';

import { actions } from 'storybook/actions';
import { expect, screen, userEvent } from 'storybook/test';
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

type Story = StoryObj<typeof ComboBox>;

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

function ComboBoxStateful(args: ComboBoxProps<Item>) {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return <ComboBox {...args} values={values} onSelect={handleOnSelect} />;
}

export const BasicComboBox: Story = {
  render: ComboBoxStateful,
  args: {
    items: FAKE_ITEMS,
  },
};

export const Explanation: Story = {
  render: ComboBoxStateful,
  args: {
    items: FAKE_ITEMS,
    explanation: 'This is an explanation text providing more details.',
  },
  play: async ({ canvas, args }) => {
    await userEvent.hover(canvas.getAllByTestId('eds-icon-path')[0]);
    await expect(
      screen.getByText(args.explanation as string)
    ).toBeInTheDocument();
  },
};

export const ReallyLongName: Story = {
  render: ComboBoxStateful,
  args: {
    items: FAKE_ITEMS_WITH_REALLY_LONG_NAMES,
  },
};

export const Groups: Story = {
  render: ComboBoxStateful,
  args: {
    groups: FAKE_GROUPS,
  },
};

export const Parented: Story = {
  render: ComboBoxStateful,
  args: {
    items: FAKE_ITEMS_WITH_CHILDREN,
  },
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

export const CustomizableValueElement: Story = {
  render: ComboBoxStateful,
  args: {
    items: FAKE_ITEMS,
    customValueComponent: CustomValueElement,
  },
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

export const CustomSelectedValuesAsTextFunction: Story = {
  render: ComboBoxStateful,
  args: {
    items: FAKE_ITEMS,
    showSelectedAsText: ({ selectedAmount, totalAmount }) =>
      `${selectedAmount} of ${totalAmount} fishes selected`,
  },
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

export const CustomizableMenuItem: Story = {
  render: ComboBoxStateful,
  args: {
    CustomMenuItemComponent: CustomMenuItem,
  },
};
