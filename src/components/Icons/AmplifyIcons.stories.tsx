import { Icon } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import { amplify_wellbore } from './AmplifyIcons';

const allIcons = {
  amplify_wellbore: amplify_wellbore,
};

interface StoryProps {
  data: string;
  size: 16 | 18 | 24 | 32 | 40 | 48 | undefined;
  color?: string;
}

export default {
  title: 'Icons/AmplifyIcons',
  component: Icon,
  argTypes: {
    color: {
      control: 'color',
    },
    size: { control: 'radio', options: [16, 18, 24, 32, 40, 48] },
    rotation: { control: 'radio', options: [0, 90, 180, 270] },
    data: { control: 'radio', options: ['amplify_wellbore'] },
  },
  args: {
    data: 'amplify_wellbore',
    size: 96,
  },
} as Meta;

export const Primary: Story<StoryProps> = (args) => {
  return (
    <Icon
      size={args.size}
      color={args.color}
      data={(allIcons as any)[args.data]}
    />
  );
};
