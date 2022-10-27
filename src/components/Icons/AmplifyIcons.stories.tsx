import { Icon } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import {
  amplify_lwd,
  amplify_wellbore,
  amplify_wireline,
} from './AmplifyIcons';

const allIcons = {
  amplify_wellbore: amplify_wellbore,
  amplify_wireline: amplify_wireline,
  amplify_lwd: amplify_lwd,
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
    size: { control: 'radio', options: [16, 18, 24, 32, 40, 48, 96] },
    rotation: { control: 'radio', options: [0, 90, 180, 270] },
    data: {
      control: 'radio',
      options: ['amplify_wellbore', 'amplify_wireline', 'amplify_lwd'],
    },
  },
  args: {
    data: 'amplify_wellbore',
    color: '#007979',
    size: 96,
  },
} as Meta;

export const Primary: Story<StoryProps> = (args) => {
  return (
    <Icon
      size={args.size}
      color={args.color}
      data={(allIcons as any)[args.data]}
      fillRule="nonzero"
    />
  );
};
