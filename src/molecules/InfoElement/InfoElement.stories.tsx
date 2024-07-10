import { Meta, StoryFn } from '@storybook/react';

import {
  InfoElement,
  InfoElementProps,
} from 'src/molecules/InfoElement/InfoElement';

export default {
  title: 'Data Display/InfoElement',
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
