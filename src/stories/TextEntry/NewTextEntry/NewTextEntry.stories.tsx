import { Meta, Story } from '@storybook/react';
import NewTextEntry, {
  NewTextEntryProps,
} from '../../../components/TextEntry/NewTextEntry/NewTextEntry';

export default {
  title: 'TextEntry/NewTextEntry',
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
