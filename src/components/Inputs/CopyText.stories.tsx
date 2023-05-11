import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import CopyText, { CopyTextProps } from './CopyText';

export default {
  title: 'Inputs/CopyText',
  component: CopyText,
} as Meta;

const Template: StoryFn<CopyTextProps> = (args) => (
  <CopyText {...args}>Some text</CopyText>
);

export const Primary = Template.bind({});
Primary.args = {
  textToCopy: 'Some text',
  iconRightPos: '50px',
};
