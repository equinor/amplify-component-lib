import { Story, Meta } from '@storybook/react';
import DataTypeCardGrid, { DataTypeCardGridProps } from './DataTypeCardGrid';

export default {
  title: 'DataTypeCard/Grid',
  component: DataTypeCardGrid,
} as Meta;

const Template: Story<DataTypeCardGridProps> = (args) => (
  <DataTypeCardGrid {...args} />
);

export const Card = Template.bind({});
Card.args = {
  skelleton: false,
};

export const Skelleton = Template.bind({});
Skelleton.args = {
  skelleton: true,
};
