import { Meta, Story } from '@storybook/react';
import NewTextEntry, { NewTextEntryProps } from './NewTextEntry';

export default {
  title: 'Inputs/TextEntry/NewTextEntry',
  component: NewTextEntry,
  argTypes: {
    title: { control: 'text' },
  },
  args: {
    title: 'comment',
  },
} as Meta;

const Template: Story<NewTextEntryProps> = (args) => <NewTextEntry {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
