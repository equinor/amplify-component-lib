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
  },
  args: {
    label: 'Label here',
    selectableParent: true,
    sortValues: true,
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

const FAKE_GROUPS = new Array(3).fill(0).map(() => ({
  title: faker.animal.lion(),
  items: new Array(5).fill(0).map(() => ({
    label: faker.animal.fish(),
    value: faker.string.uuid(),
  })),
}));

const FAKE_ITEMS_WITH_CHILDREN = [
  {
    label: faker.animal.fish(),
    value: faker.string.uuid(),
    children: new Array(faker.number.int({ min: 1, max: 5 }))
      .fill(0)
      .map(() => ({
        label: faker.animal.fish(),
        value: faker.string.uuid(),
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
      label={args.label}
      disabled={args.disabled}
      loading={args.loading}
      items={FAKE_ITEMS}
      value={value}
      onSelect={handleOnSelect}
      sortValues={args.sortValues}
    />
  );
};

export const ComboBoxWithMultiSelect: StoryFn<ComboBoxComponentProps<Item>> = (
  args
) => {
  const [values, setValues] = useState<ComboBoxOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption<Item>[],
    selectedValue: ComboBoxOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      label={args.label}
      disabled={args.disabled}
      loading={args.loading}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
      sortValues={args.sortValues}
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
      label={args.label}
      disabled={args.disabled}
      loading={args.loading}
      value={value}
      groups={FAKE_GROUPS}
      onSelect={handleOnSelect}
      sortValues={args.sortValues}
    />
  );
};

export const ComboBoxWithGroupsAndMultiSelect: StoryFn<
  ComboBoxComponentProps<Item>
> = (args) => {
  const [values, setValues] = useState<ComboBoxOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption<Item>[],
    selectedValue: ComboBoxOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      label={args.label}
      disabled={args.disabled}
      loading={args.loading}
      values={values}
      groups={FAKE_GROUPS}
      onSelect={handleOnSelect}
      sortValues={args.sortValues}
    />
  );
};

export const ComboBoxParentedWithMultiSelect: StoryFn<
  ComboBoxComponentProps<Item> & ComboBoxProps<Item>
> = (args) => {
  const [values, setValues] = useState<ComboBoxOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption<Item>[],
    selectedValue: ComboBoxOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <ComboBox
      label={args.label}
      selectableParent={
        (args as MultiComboBoxCommon<Item>)?.selectableParent || false
      }
      disabled={args.disabled}
      loading={args.loading}
      items={FAKE_ITEMS_WITH_CHILDREN}
      values={values}
      onSelect={handleOnSelect}
      sortValues={args.sortValues}
    />
  );
};
