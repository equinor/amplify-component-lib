import { Story, Meta } from '@storybook/react';

import ProgressBar, { ProgressBarProps } from '../../components/ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: { control: 'number', defaultValue: 25 },
    unit: { control: 'text', defaultValue: '%' },
    size: {
      control: 'select',
      options: [8, 16, 32, 64],
      defaultValue: 16,
    },
    value: { control: 'text', defaultValue: '25' },
    backgroundColor: { control: 'color', defaultValue: 'lightGreen' },
    fillColor: { control: 'color', defaultValue: 'green' },
  },
} as Meta;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
