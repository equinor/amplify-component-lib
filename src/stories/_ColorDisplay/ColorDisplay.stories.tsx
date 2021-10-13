import { Story, Meta } from '@storybook/react';

import ColorDisplay from '../../components/_ColorDisplay';

export default {
  title: 'ColorDisplay',
  component: ColorDisplay,
} as Meta;

const Template: Story = () => <ColorDisplay />;

export const Primary = Template.bind({});
