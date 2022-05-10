import { Meta, Story } from '@storybook/react';
import OptionDrawer, {
  OptionDrawerProps,
} from '../../../components/Select/OptionDrawer';

import { SelectItem } from '../../../components/Select';
import { useState } from 'react';

export default {
  title: 'Select/OptionDrawer',
  component: OptionDrawer,
} as Meta;

const items: SelectItem[] = [
  {
    value: '1',
    label: 'One',
    items: [
      { value: '11', label: 'One', items: [] },
      { value: '12', label: 'Two', items: [] },
      { value: '13', label: 'Three', items: [] },
    ],
  },
  {
    value: '2',
    label: 'Two',
    items: [
      { value: '21', label: 'One', items: [] },
      { value: '22', label: 'Two', items: [] },
      { value: '23', label: 'Three', items: [] },
    ],
  },
  {
    value: '3',
    label: 'Three',
    items: [
      { value: '31', label: 'One', items: [] },
      { value: '32', label: 'Two', items: [] },
      { value: '33', label: 'Three', items: [] },
    ],
  },
];

const Template: Story<OptionDrawerProps> = (args) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div style={{ width: '300px' }}>
      <OptionDrawer
        {...args}
        label="test"
        onToggle={(value, toggle) =>
          setSelected((s) =>
            toggle ? [...s, value] : [...s.filter((val) => val !== value)]
          )
        }
        items={items}
        selectedItems={selected}
      />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
