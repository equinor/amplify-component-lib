import { Story, Meta } from '@storybook/react';
import React from 'react';
import CopyText, { CopyTextProps } from './CopyText';

export default {
  title: 'Inputs/CopyText',
  component: CopyText,
} as Meta;

const Template: Story<CopyTextProps> = (args) => (
  <CopyText {...args}>Some text</CopyText>
);

export const Primary = Template.bind({});
Primary.args = {
  textToCopy: 'Some text',
  iconRightPos: '50px',
};
