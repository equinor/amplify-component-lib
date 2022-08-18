import { Story, Meta } from '@storybook/react';
import { TooltipProps } from '@equinor/eds-core-react';

import OptionalTooltip from './OptionalTooltip';
import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';

export default {
  title: 'DataDisplay/OptionalTooltip',
  component: OptionalTooltip,
} as Meta;

const Template: Story<TooltipProps> = (args) => (
  <OptionalTooltip {...args}>
    <Icon data={folder} />
  </OptionalTooltip>
);

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'WithTitle',
};

export const TitleUndefined = Template.bind({});
TitleUndefined.args = {
  title: undefined,
};
