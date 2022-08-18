import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from './SingleSelectDrawer';
import { ValueType, items } from './SelectUtils';

import { Typography } from '@equinor/eds-core-react';

export default {
  title: 'Inputs/Select/SingleSelectDrawer',
  component: SingleSelectDrawer,
} as Meta;

const Template: Story<SingleSelectDrawerProps<ValueType>> = () => {
  const [selectedItem, setSelectedItem] = useState<ValueType | undefined>(
    items[0]
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
        <SingleSelectDrawer<ValueType>
          label="Test"
          items={items}
          initialItem={items[0]}
          placeholder="Select..."
          onChange={(item) => setSelectedItem(item)}
        />
      </div>
      <div>
        <Typography variant="h3">{selectedItem?.label}</Typography>
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
