import { Story, Meta } from '@storybook/react';
import IconToggleButton, { IconToggleButtonProps } from './';
import { list, view_module } from '@equinor/eds-icons';

export default {
  title: 'IconToggleButton',
  component: IconToggleButton,
} as Meta;

const Template: Story<IconToggleButtonProps> = (args) => (
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
