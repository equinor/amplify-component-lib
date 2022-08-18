import ChippedMultiSelect, {
  ChippedMultiSelectProps,
} from './ChippedMultiSelect';
import { Meta, Story } from '@storybook/react';

import React from 'react';

export default {
  title: 'Inputs/ChippedMultiSelect',
  component: ChippedMultiSelect,
} as Meta;

const Template: Story<ChippedMultiSelectProps> = (args) => (
  <ChippedMultiSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Chipped multi select',
  placeholder: 'Select some items',
  items: ['Item 1', 'Item 2', 'Item 3'],
  onSelect: () => null,
  values: ['Item 1'],
};
