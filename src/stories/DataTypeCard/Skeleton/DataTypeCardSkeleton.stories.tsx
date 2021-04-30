import { Story, Meta } from "@storybook/react";
import DataTypeCardSkeleton from "./DataTypeCardSkeleton";

export default {
  title: "DataTypeCard/Skelleton",
  component: DataTypeCardSkeleton,
} as Meta;

const Template: Story = (args) => <DataTypeCardSkeleton {...args} />;
export const Primary = Template.bind({});
