import { Story, Meta } from '@storybook/react';

import InfoElement, { InfoElementProps } from '../../components/InfoElement';

export default {
  title: 'InfoElement',
  component: InfoElement,
  argTypes: {
    title: { control: 'text', defaultValue: 'Title' },
    content: { control: 'text', defaultValue: 'Content' },
  },
} as Meta;

const Template: Story<InfoElementProps> = (args) => <InfoElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
