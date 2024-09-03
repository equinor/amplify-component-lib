import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { actions } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import {
  SelectOption,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';

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

export const SingleSelectWithReallyLongName: StoryFn = (args) => {
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
