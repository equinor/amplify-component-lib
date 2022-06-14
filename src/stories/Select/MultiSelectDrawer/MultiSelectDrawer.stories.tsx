import { Meta, Story } from '@storybook/react';
import MultiSelectDrawer, {
  MultiSelectDrawerProps,
} from '../../../components/Select/MultiSelectDrawer';
import { ValueType, items } from '../SelectUtils';

import { SelectItem } from '../../../components/Select';
import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

export default {
  title: 'Select/MultiSelectDrawer',
  component: MultiSelectDrawer,
} as Meta;

const initialItems: string[] = ['22', '31'];

const Template: Story<MultiSelectDrawerProps<ValueType>> = () => {
  const [selectedItems, setSelectedItems] = useState<SelectItem<ValueType>[]>(
    items.filter((item) => initialItems.includes(item.id))
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <div
        style={{
          width: '300px',
        }}
      >
        <MultiSelectDrawer<ValueType>
          items={items}
          label="Test"
          onChange={(val) => setSelectedItems(val)}
          placeholder="Select..."
          initialItems={initialItems}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {selectedItems.map((value) => (
          <Typography key={value.id} variant="h3">
            {value.label}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
