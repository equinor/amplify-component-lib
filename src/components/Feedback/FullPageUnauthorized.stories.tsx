import { Meta, Story } from '@storybook/react';

import FullPageUnauthorized, {
  FullPageUnauthorizedProps,
} from './FullPageUnauthorized';

export default {
  title: 'Feedback/FullPageUnauthorized',
  component: FullPageUnauthorized,
} as Meta;

const Template: Story<FullPageUnauthorizedProps> = (args) => (
  <FullPageUnauthorized {...args} />
);

export const Default = Template.bind({});
Default.args = { appName: '{AppName}' };
