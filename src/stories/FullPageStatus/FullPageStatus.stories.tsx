import { Story, Meta } from '@storybook/react';

import FullPageStatus, {
  FullPageStatusProps,
} from '../../components/FullPageStatus';

export default {
  title: 'FullPageStatus',
  component: FullPageStatus,
} as Meta;

const Template: Story<FullPageStatusProps> = (args) => (
  <FullPageStatus {...args} />
);

export const Loading = Template.bind({});
Loading.args = { loading: true, error: true, errorMessage: 'ERROR' };

export const Error = Template.bind({});
Error.args = { error: true, errorMessage: 'ERROR' };
