import { FC, useState } from 'react';

import { boat, car, flight } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { actions } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { colors, spacings } from 'src/atoms';
import { Icon } from 'src/molecules';
import {
  SelectedState,
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

export const SingleSelectWithAdd: StoryFn = (args) => {
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

export const SingleSelectWithCustomizableSelectMenuItem: StoryFn = (args) => {
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

export const SingleSelectWithCustomValueComponent: StoryFn = (args) => {
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
