import { list, view_module } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import IconToggleButton, {
  IconToggleButtonProps,
} from 'src/deprecated/IconToggleButton';

export default {
  title: 'Deprecated/IconToggleButton',
  component: IconToggleButton,
  argTypes: {
    initialState: { control: 'boolean' },
    onClick: { action: 'Fired onClick event' },
  },
  args: {
    toggleOn: { icon: list, tooltip: { title: 'List', placement: 'right' } },
    toggleOff: {
      icon: view_module,
      tooltip: { title: 'Grid', placement: 'right' },
    },
  },
} as Meta;

export const Primary: StoryFn<IconToggleButtonProps> = (args) => (
  <IconToggleButton {...args} />
);
