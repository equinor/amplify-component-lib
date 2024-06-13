import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import OptionDrawer, { OptionDrawerProps } from './OptionDrawer';
import {
  items,
  ValueType,
} from 'src/components/Inputs/SelectDrawer/stories/data';

export default {
  title: 'Inputs/SelectDrawer/OptionDrawer',
  component: OptionDrawer,
  argTypes: {
    singleSelect: {
      control: 'boolean',
    },
    animateCheck: {
      control: 'boolean',
    },
    animateUncheck: {
      control: 'boolean',
    },
  },
  args: {
    singleSelect: false,
    animateCheck: false,
    animateUncheck: false,
  },
} as Meta;

export const Primary: StoryFn<OptionDrawerProps<ValueType>> = (args) => {
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
          animateCheck={args.animateCheck}
          animateParent={args.animateParent}
          animateUncheck={args.animateUncheck}
          parentHasNestedItems={true}
        />
      ))}
    </div>
  );
};
