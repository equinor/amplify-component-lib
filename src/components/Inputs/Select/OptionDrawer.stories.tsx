import { useState } from 'react';

import { Meta, Story } from '@storybook/react';

import OptionDrawer, { OptionDrawerProps } from './OptionDrawer';
import { items, ValueType } from './SelectUtils';

export default {
  title: 'Inputs/Select/OptionDrawer',
  component: OptionDrawer,
} as Meta;

const Template: Story<OptionDrawerProps<ValueType>> = () => {
  const [selectedItems, setSelectedItems] = useState<ValueType[]>([]);

  return (
    <div style={{ width: '300px' }}>
      {items.map((item) => (
        <OptionDrawer
          key={item.id}
          onToggle={(e) => {
            e.items.forEach((item) => {
              setSelectedItems((s) =>
                e.toggle ? [...s, item] : [...s.filter((val) => val !== item)]
              );
            });
          }}
          item={item}
          selectedItems={selectedItems}
        />
      ))}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
