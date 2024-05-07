import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { actions } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { ComboBox, ComboBoxComponentProps } from './ComboBox';
import {
  ComboBoxOption,
  ComboBoxProps,
  MultiComboBoxCommon,
} from './ComboBox.types';

export default {
  title: 'Inputs/ComboBox',
  component: ComboBox,
  argTypes: {
    label: { control: 'text' },
    selectableParent: { control: 'boolean' },
    sortValues: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  args: {
    label: 'Label here',
    selectableParent: true,
    sortValues: true,
    clearable: true,
  },
};

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

export const ComboBoxWithSingleSelect: StoryFn<ComboBoxComponentProps<Item>> = (
  args
) => {
  const [value, setValue] = useState<ComboBoxOption<Item> | undefined>(
    undefined
  );

  const handleOnSelect = (selectedValue: ComboBoxOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <ComboBox
      {...args}
      items={FAKE_ITEMS}
      value={value}
      onSelect={handleOnSelect}
    />
  );
};

export const ComboBoxWithMultiSelect: StoryFn<ComboBoxComponentProps<Item>> = (
  args
) => {
  const [values, setValues] = useState<ComboBoxOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption<Item>[],
    selectedValue?: ComboBoxOption<Item>
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

export const ComboBoxWithGroupsAndSingleSelect: StoryFn<
  ComboBoxComponentProps<Item>
> = (args) => {
  const [value, setValue] = useState<ComboBoxOption<Item> | undefined>(
    undefined
  );

  const handleOnSelect = (selectedValue: ComboBoxOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <ComboBox
      {...args}
      value={value}
      groups={FAKE_GROUPS}
      onSelect={handleOnSelect}
    />
  );
};

export const ComboBoxWithGroupsAndMultiSelect: StoryFn<
  ComboBoxComponentProps<Item>
> = (args) => {
  const [values, setValues] = useState<ComboBoxOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption<Item>[],
    selectedValue?: ComboBoxOption<Item>
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

export const ComboBoxParentedWithMultiSelect: StoryFn<
  ComboBoxComponentProps<Item> & ComboBoxProps<Item>
> = (args) => {
  const [values, setValues] = useState<ComboBoxOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption<Item>[],
    selectedValue?: ComboBoxOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      label={args.label}
      placeholder={args.placeholder}
      loading={args.loading}
      disabled={args.disabled}
      underlineHighlight={args.underlineHighlight}
      lightBackground={args.lightBackground}
      clearable={args.clearable}
      sortValues={args.sortValues}
      selectableParent={
        (args as MultiComboBoxCommon<Item>)?.selectableParent ?? false
      }
      items={FAKE_ITEMS_WITH_CHILDREN}
      values={values}
      onSelect={handleOnSelect}
    />
  );
};
