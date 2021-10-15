import { Story, Meta } from '@storybook/react';
import styled from 'styled-components';

import ProgressBar, { ProgressBarProps } from '../../components/ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: { control: 'number', defaultValue: 25 },
    backgroundColor: { control: 'color', defaultValue: '#e5e5e5' },
    fillColor: { control: 'color', defaultValue: 'slateblue' },
    displayValue: { control: 'number', defaultValue: 25 },
    valueUnit: { control: 'text', defaultValue: '%' },
    displayValueInBar: { control: 'boolean', defaultValue: true },
    valueColor: { control: 'color', defaultValue: 'black' },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProgressOnly = (args) => <ProgressBar progress={35} />;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledProgressBarWidthAndHeight = (args) => (
  <StyledProgress progress={35} />
);
