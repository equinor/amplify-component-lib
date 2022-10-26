import React, { useState } from 'react';

import { Meta, Story } from '@storybook/react';

import ChippedMultiSelect, {
  ChippedMultiSelectProps,
} from './ChippedMultiSelect';

export default {
  title: 'Inputs/ChippedMultiSelect',
  component: ChippedMultiSelect,
  argTypes: {
    label: {
      control: 'text',
    },

    placeholder: { control: 'text' },
    items: { control: 'array' },
  },
  args: {
    label: 'Label',
    items: ['Item 1', 'Item 2', 'Item 3'],
    onSelect: () => null,
  },
} as Meta;

export const Primary: Story<ChippedMultiSelectProps> = (args) => {
  const [values, setValues] = useState(['Item 1']);
  return (
    <ChippedMultiSelect
      {...args}
      values={values}
      onSelect={(selectedItems) => {
        setValues(selectedItems);
      }}
    />
  );
};
