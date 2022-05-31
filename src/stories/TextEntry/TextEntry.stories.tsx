import { Meta, Story } from '@storybook/react';
import TextEntry, { TextEntryProps } from '../../components/TextEntry';

export default {
  title: 'TextEntry/TextEntry',
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
