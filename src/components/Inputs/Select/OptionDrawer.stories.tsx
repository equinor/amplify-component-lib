import { Meta, Story } from '@storybook/react';
import OptionDrawer, { OptionDrawerProps } from './OptionDrawer';
import { useState } from 'react';
import { ValueType, items } from './SelectUtils';

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
          onToggle={(object, toggle) =>
            setSelectedItems((s) =>
              toggle ? [...s, object] : [...s.filter((val) => val !== object)]
            )
          }
          item={item}
          selectedItems={selectedItems}
        />
      ))}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
