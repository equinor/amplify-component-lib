import { Story, Meta } from '@storybook/react';

import TextEntry, { TextEntryProps } from './TextEntry';

export default {
  title: 'TextEntry/TextEntry',
  component: TextEntry,
  argTypes: {
    body: { control: 'text', defaultValue: 'Value' },
  },
} as Meta;

const Template: Story<TextEntryProps> = (args) => <TextEntry {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
