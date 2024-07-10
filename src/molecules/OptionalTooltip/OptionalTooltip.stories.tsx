import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

export default {
  title: 'Data Display/OptionalTooltip',
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
} as Meta;

export const Primary: StoryFn = (args) => (
  <OptionalTooltip {...args}>
    <Icon data={folder} />
  </OptionalTooltip>
);
