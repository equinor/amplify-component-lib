import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

const meta: Meta<typeof OptionalTooltip> = {
  title: 'Molecules/OptionalTooltip',
  component: OptionalTooltip,
  argTypes: { title: { control: 'text' } },
  args: { title: 'Optional tooltip title' },
  parameters: {
    docs: {
      description: {
        component:
          'This component enables us to show a tooltip optionally, so if the title is either null or empty it hides the tooltip',
      },
    },
  },
};
export default meta;

export const Primary: StoryFn = (args) => (
  <OptionalTooltip {...args}>
    <Icon data={folder} />
  </OptionalTooltip>
);
