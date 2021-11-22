import { Story, Meta } from '@storybook/react';
import DataCardSkeleton from '../../../components/DataCard/Skeleton/DataCardSkeleton';

export default {
  title: 'DataTypeCard/Skelleton',
  component: DataCardSkeleton,
} as Meta;

const Template: Story = (args) => <DataCardSkeleton {...args} />;
export const Primary = Template.bind({});
