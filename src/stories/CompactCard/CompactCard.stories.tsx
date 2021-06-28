import { Story, Meta } from "@storybook/react";
import DataCard, { CompactCardProps } from "./CompactCard";
import CompactCard from "./CompactCard";

export default {
  title: "CompactCard",
  component: DataCard,
} as Meta;

const Template: Story<CompactCardProps> = (args) => <CompactCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: "Composite",
  headerText: "PETROPHYSICIST",
};
