import { list, view_module } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import IconToggleButton, { IconToggleButtonProps } from './IconToggleButton';

export default {
  title: 'Inputs/IconToggleButton',
  component: IconToggleButton,
} as Meta;

const Template: StoryFn<IconToggleButtonProps> = (args) => (
  <IconToggleButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  toggleOn: { icon: list, tooltip: { title: 'List', placement: 'right' } },
  toggleOff: {
    icon: view_module,
    tooltip: { title: 'Grid', placement: 'right' },
  },
};
