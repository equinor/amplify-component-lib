import { Meta, Story } from '@storybook/react';
import OptionDrawer, {
  OptionDrawerProps,
} from '../../../components/Select/OptionDrawer';
import { ValueType, items } from '../SelectUtils';

import { SelectItem } from '../../../components/Select';
import { useState } from 'react';

export default {
  title: 'Select/OptionDrawer',
  component: OptionDrawer,
} as Meta;

const Template: Story<OptionDrawerProps<ValueType>> = () => {
  const [selectedItems, setSelectedItems] = useState<SelectItem<ValueType>[]>(
    []
  );

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
