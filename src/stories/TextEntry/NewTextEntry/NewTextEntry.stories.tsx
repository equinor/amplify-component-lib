import { Story, Meta } from '@storybook/react';

import NewTextEntry, { NewTextEntryProps } from './NewTextEntry';

export default {
  title: 'TextEntry/NewTextEntry',
  component: NewTextEntry,
  argTypes: {
    title: { control: 'text', defaultValue: 'comment' },
  },
} as Meta;

const Template: Story<NewTextEntryProps> = (args) => <NewTextEntry {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
