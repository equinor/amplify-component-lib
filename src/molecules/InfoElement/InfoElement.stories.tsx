import { Meta, StoryFn } from '@storybook/react';

import {
  InfoElement,
  InfoElementProps,
} from 'src/molecules/InfoElement/InfoElement';

const meta: Meta<typeof InfoElement> = {
  title: 'Molecules/InfoElement',
  component: InfoElement,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    copyableContent: { control: 'boolean' },
    capitalizeContent: { control: 'boolean' },
  },
  args: {
    title: 'Title',
    content: 'Content',
  },
};

export default meta;

const Template: StoryFn<InfoElementProps> = (args) => <InfoElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const WithCopyTextTrue = Template.bind({});
WithCopyTextTrue.args = { copyableContent: true, capitalizeContent: false };
