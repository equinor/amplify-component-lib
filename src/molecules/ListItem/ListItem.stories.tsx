import { boat, car } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react';

import { ListItem } from 'src/molecules/ListItem/ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=4202-107640&m=dev',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    icon: car,
    label: 'Toyota',
  },
};

export const Disabled: Story = {
  args: {
    icon: car,
    label: 'Nissan',
    disabled: true,
  },
};

export const Selected: Story = {
  args: {
    icon: car,
    label: 'Daihatsu',
    selected: true,
  },
};

export const IsChild: Story = {
  args: {
    icon: car,
    label: 'Mazda',
    isChild: true,
  },
};

export const TrailingIcon: Story = {
  args: {
    icon: boat,
    label: 'Buster',
    iconPosition: 'trailing',
  },
};
