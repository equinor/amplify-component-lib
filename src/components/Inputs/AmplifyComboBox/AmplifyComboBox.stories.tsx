import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { actions } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import AmplifyComboBox, {
  AmplifyComboBoxComponentProps,
} from './AmplifyComboBox';
import { ComboBoxOption } from './AmplifyComboBox.types';

export default {
  title: 'Inputs/AmplifyComboBox',
  component: AmplifyComboBox,
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Label here',
  },
};

type Item = {
  label: string;
  value: string;
};

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

export const ComboBoxWithSingleSelect: StoryFn<
  AmplifyComboBoxComponentProps<Item>
> = (args) => {
  const [value, setValue] = useState<ComboBoxOption | undefined>(undefined);

  const handleOnSelect = (selectedValue: ComboBoxOption | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <AmplifyComboBox
      label={args.label}
      items={FAKE_ITEMS}
      value={value}
      onSelect={handleOnSelect}
    />
  );
};

export const ComboBoxWithMultiSelect: StoryFn<
  AmplifyComboBoxComponentProps<Item>
> = (args) => {
  const [values, setValues] = useState<ComboBoxOption[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption[],
    selectedValue: ComboBoxOption
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <AmplifyComboBox
      label={args.label}
      items={FAKE_ITEMS}
      values={values}
      onSelect={handleOnSelect}
    />
  );
};

export const ComboBoxWithGroupsAndSingleSelect: StoryFn<
  AmplifyComboBoxComponentProps<Item>
> = (args) => {
  const [value, setValue] = useState<ComboBoxOption | undefined>(undefined);

  const handleOnSelect = (selectedValue: ComboBoxOption | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <AmplifyComboBox
      label={args.label}
      value={value}
      groups={FAKE_GROUPS}
      onSelect={handleOnSelect}
    />
  );
};

export const ComboBoxWithGroupsAndMultiSelect: StoryFn<
  AmplifyComboBoxComponentProps<Item>
> = (args) => {
  const [values, setValues] = useState<ComboBoxOption[]>([]);

  const handleOnSelect = (
    selectedValues: ComboBoxOption[],
    selectedValue: ComboBoxOption
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <AmplifyComboBox
      label={args.label}
      values={values}
      groups={FAKE_GROUPS}
      onSelect={handleOnSelect}
    />
  );
};
