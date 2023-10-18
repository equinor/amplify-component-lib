import { Meta, StoryFn } from '@storybook/react';

import InfoElement, { InfoElementProps } from './InfoElement';

export default {
  title: 'DataDisplay/InfoElement',
  component: InfoElement,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    copyableContent: { control: 'boolean' },
    capitalizedContent: { control: 'boolean' },
  },
  args: {
    title: 'Title',
    content: 'Content',
  },
} as Meta;

const Template: StoryFn<InfoElementProps> = (args) => <InfoElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const WithCopyTextTrue = Template.bind({});
WithCopyTextTrue.args = { copyableContent: true, capitalizeContent: false };
