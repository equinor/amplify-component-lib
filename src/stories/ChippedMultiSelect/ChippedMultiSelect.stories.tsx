import ChippedMultiSelect, {
  ChippedMultiSelectProps,
} from '../../components/ChippedMultiSelect';
import { Meta, Story } from '@storybook/react';

import faker from 'faker';
import { useArgs } from '@storybook/addons';

function fakeItems() {
  return new Array(10).fill(0).map(() => faker.lorem.slug());
}

export default {
  title: 'ChippedMultiSelect/ChippedMultiSelect',
  component: ChippedMultiSelect,
  argTypes: {
    label: { control: 'text', defaultValue: 'Item selector' },
    placeholder: { control: 'text', defaultValue: 'Select items' },
    items: { control: 'array', defaultValue: fakeItems() },
    onSelect: {
      defaultValue: (selectedItems) =>
        console.log('onSelect called with: ' + selectedItems),
    },
    values: { control: 'array', defaultValue: [] },
    disabled: { control: 'radio', options: [true, false], defaultValue: false },
  },
} as Meta;

export const Primary: Story<ChippedMultiSelectProps> = (args) => {
  const [{ values }, updateArgs] = useArgs();

  const handleOnSelect = (selectedItems: string[]) => {
    updateArgs({ values: selectedItems });
  };

  return (
    <div>
      <ChippedMultiSelect {...args} values={values} onSelect={handleOnSelect} />
    </div>
  );
};

export const Wrapping: Story<ChippedMultiSelectProps> = (args) => {
  const [{ values }, updateArgs] = useArgs();

  const handleOnSelect = (selectedItems: string[]) => {
    updateArgs({ values: selectedItems });
  };

  return (
    <div style={{ width: '25%' }}>
      <ChippedMultiSelect {...args} values={values} onSelect={handleOnSelect} />
    </div>
  );
};
