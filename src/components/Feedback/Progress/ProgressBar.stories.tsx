import { Meta, Story } from '@storybook/react';
import ProgressBar, { ProgressBarProps } from './ProgressBar';

import styled from 'styled-components';

export default {
  title: 'Feedback/Progress/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: { control: 'number' },
    backgroundColor: { control: 'color' },
    fillColor: { control: 'color' },
    displayValue: { control: 'number' },
    valueUnit: { control: 'text' },
    displayValueInBar: { control: 'boolean' },
    valueColor: { control: 'color' },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    progress: 25,
    backgroundColor: '#e5e5e5',
    fillColor: 'slateblue',
    displayValue: 25,
    valueUnit: '%',
    displayValueInBar: true,
    valueColor: 'black',
  },
} as Meta;

const StyledProgress = styled(ProgressBar)`
  width: 50%;
  height: 32px;
`;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

// Ignore lint warnings for renders because args is required by
// Storybook to create correct code examples, but we're not using the args object

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ProgressOnly = (args) => <ProgressBar progress={35} />;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StyledProgressBarWidthAndHeight = (args) => (
  <StyledProgress progress={35} />
);
