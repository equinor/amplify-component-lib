import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import SimpleMultiSelectDrawer, {
  SimpleMultiSelectDrawerProps,
} from '../../../components/Select/SimpleMultiSelectDrawer';
import { ValueType, items } from '../SelectUtils';

import { Typography } from '@equinor/eds-core-react';

export default {
  title: 'Select/SimpleMultiSelectDrawer',
  component: SimpleMultiSelectDrawer,
} as Meta;

const Template: Story<SimpleMultiSelectDrawerProps<ValueType>> = () => {
  const [selectedItems, setSelectedItems] = useState<ValueType[]>([
    items[0],
    items[3],
  ]);

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
        <SimpleMultiSelectDrawer<ValueType>
          items={items}
          label="Test"
          onChange={(val) => setSelectedItems(val)}
          placeholder="Select..."
          selectedItems={selectedItems}
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
