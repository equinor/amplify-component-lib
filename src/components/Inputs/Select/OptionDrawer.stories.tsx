import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import OptionDrawer, { OptionDrawerProps } from './OptionDrawer';
import { items, ValueType } from 'src/components/Inputs/Select/stories/data';

export default {
  title: 'Inputs/Select/OptionDrawer',
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
    indeterminateToggleOff: {
      control: 'boolean',
    },
    excludeChildrenOnParentSelection: {
      control: 'boolean',
    },
  },
  args: {
    singleSelect: true,
    animateCheck: false,
    animateUncheck: false,
    shouldToggleOffOnIndeterminateState: true,
    excludeChildrenOnParentSelection: true,
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
          singleSelect={args.singleSelect}
          animateCheck={args.animateCheck}
          animateParent={args.animateParent}
          animateUncheck={args.animateUncheck}
          shouldToggleOffOnIndeterminateState={
            args.shouldToggleOffOnIndeterminateState
          }
          excludeChildrenOnParentSelection={
            args.excludeChildrenOnParentSelection
          }
        />
      ))}
    </div>
  );
};
