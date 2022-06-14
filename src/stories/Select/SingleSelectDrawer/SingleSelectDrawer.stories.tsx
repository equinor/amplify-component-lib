import { Meta, Story } from '@storybook/react';
import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from '../../../components/Select/SingleSelectDrawer';
import { ValueType, items } from '../SelectUtils';

import { SelectItem } from '../../../components/Select';
import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

export default {
  title: 'Select/SingleSelectDrawer',
  component: SingleSelectDrawer,
} as Meta;

const initialItem = '22';

const Template: Story<SingleSelectDrawerProps<ValueType>> = () => {
  const [selectedItem, setSelectedItem] = useState<
    SelectItem<ValueType> | undefined
  >(items.find((item) => item.id === initialItem));

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
          initialItem={initialItem}
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
