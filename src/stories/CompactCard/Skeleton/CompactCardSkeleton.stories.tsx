import { Story, Meta } from '@storybook/react';
import CompactCardSkeleton from '../../../components/CompactCard/Skeleton/CompactCardSkeleton';

export default {
  title: 'CompactCard/Skelleton',
  component: CompactCardSkeleton,
} as Meta;

const Template: Story = (args) => <CompactCardSkeleton {...args} />;
export const Primary = Template.bind({});
