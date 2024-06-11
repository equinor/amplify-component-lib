import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { actions } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { SelectOption } from '../Select.types';
import { SingleSelect } from './SingleSelect';

export default {
  title: 'Inputs/Select/SingleSelect',
  component: SingleSelect,
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
    meta: 'Meta label here',
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

export const SingleSelectWithGroups: StoryFn = (args) => {
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

export const ComboBoxParented: StoryFn = (args) => {
  const [value, setValue] = useState<SelectOption<Item> | undefined>(undefined);

  const handleOnSelect = (selectedValue: SelectOption<Item> | undefined) => {
    actions('onSelect').onSelect(selectedValue);
    setValue(selectedValue);
  };

  return (
    <SingleSelect
      {...args}
      items={FAKE_ITEMS_WITH_CHILDREN}
      value={value}
      onSelect={handleOnSelect}
    />
  );
};
