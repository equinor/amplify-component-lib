import { useState } from 'react';

import { Button, Dialog } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';
import { actions } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import {
  ListSelectProps,
  SelectOption,
  SelectOptionRequired,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';

const meta: Meta<typeof ComboBox> = {
  title: 'Molecules/Select/ComboBox',
  component: ComboBox,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    selectableParent: { control: 'boolean' },
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
    selectableParent: true,
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

export const ComboBoxWithReallyLongName: StoryFn = (args) => {
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

export const ComboBoxWithGroups: StoryFn = (args) => {
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

export const ComboBoxParented: StoryFn = (args) => {
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

export const ComboBoxInDialog: StoryFn = (args) => {
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

export const ComboBoxWithAdd: StoryObj<typeof ComboBox> = {
  args: { items: FAKE_ITEMS, values: [] },
  render: function Render(args) {
    const [{ values, items }, updateArgs] = useArgs();
    const handleOnSelect = (newValues: SelectOptionRequired[]) => {
      updateArgs({ values: newValues });
    };

    const handleOnAdd = (value: string) => {
      actions('onItemAdd').onItemAdd(value);
      const newItem = {
        label: value,
        value: faker.string.uuid(),
      };

      updateArgs({
        values: [...(values as SelectOptionRequired[]), newItem],
        items: [
          ...(args as ListSelectProps<SelectOptionRequired>).items,
          newItem,
        ],
      });
    };

    return (
      <ComboBox
        {...args}
        values={values as SelectOptionRequired[]}
        items={items as SelectOptionRequired[]}
        groups={undefined}
        onSelect={handleOnSelect}
        onAddItem={handleOnAdd}
      />
    );
  },
};
