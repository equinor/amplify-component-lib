import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import {
  OptionDrawer,
  OptionDrawerProps,
} from 'src/molecules/OptionDrawer/OptionDrawer';
import { items, ValueType } from 'src/molecules/OptionDrawer/stories/data';

const meta: Meta<typeof OptionDrawer> = {
  title: 'Organisms/OptionDrawer',
  component: OptionDrawer,
};

export default meta;

export const Primary: StoryFn<OptionDrawerProps<ValueType>> = () => {
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
          singleSelect={true}
          showIntermediateParent={true}
          parentHasNestedItems={true}
        />
      ))}
    </div>
  );
};
