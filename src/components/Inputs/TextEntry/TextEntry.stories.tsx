import { Meta, Story } from '@storybook/react';

import TextEntry, { TextEntryProps } from './TextEntry';

export default {
  title: 'Inputs/TextEntry/TextEntry',
  component: TextEntry,
  argTypes: {
    body: { control: 'text' },
  },
  args: {
    body: 'Value',
  },
} as Meta;

const Template: Story<TextEntryProps> = (args) => <TextEntry {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
