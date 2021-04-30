import { Button, Chip, Icon } from "@equinor/eds-core-react";
import { Story, Meta } from "@storybook/react";
import { more_vertical, account_circle } from "@equinor/eds-icons";
import DataTypeCard, { DataTypeCardProps } from "./DataTypeCard";
import styled from "styled-components";

const DataTypeCardBody = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 4em;
`;

export default {
  title: "DataTypeCard/Card",
  component: DataTypeCard,
} as Meta;

const Template: Story<DataTypeCardProps> = (args) => <DataTypeCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  datatype: { dataType: "dataType", discipline: "discipline" },
};

export const Body = Template.bind({});
Body.args = {
  datatype: { dataType: "dataType", discipline: "discipline" },
  headerRight: <Icon data={account_circle} />,
  body: (
    <DataTypeCardBody>
      <Chip>{"Responsible user"}</Chip>
      <Button variant="ghost_icon">
        <Icon data={more_vertical} />
      </Button>
    </DataTypeCardBody>
  ),
};
