import InfoElement, { InfoElementProps } from '../../components/InfoElement';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'InfoElement',
  component: InfoElement,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
  args: {
    title: 'Title',
    content: 'Content',
  },
} as Meta;

const Template: Story<InfoElementProps> = (args) => <InfoElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
