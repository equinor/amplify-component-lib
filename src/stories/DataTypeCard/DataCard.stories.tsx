import { Button, Chip, Icon } from "@equinor/eds-core-react";
import { Story, Meta } from "@storybook/react";
import { more_vertical, account_circle } from "@equinor/eds-icons";
import DataCard, { DataTypeCardProps } from "./DataCard";
import styled from "styled-components";

const DataTypeCardBody = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 4em;
`;

export default {
  title: "DataCard/Card",
  component: DataCard,
} as Meta;

const Template: Story<DataTypeCardProps> = (args) => <DataCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Composite",
  headerText: "PETROPHYSICIST",
};

export const Body = Template.bind({});
Body.args = {
  title: "Composite",
  headerText: "PETROPHYSICIST",
  headerRightElement: (
      <Icon data={account_circle} />
  ),
  body: (
    <DataTypeCardBody>
      <Chip>{"Responsible user"}</Chip>
      <Button variant="ghost_icon">
        <Icon data={more_vertical} />
      </Button>
    </DataTypeCardBody>
  ),
};
