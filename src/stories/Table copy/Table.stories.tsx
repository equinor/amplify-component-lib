import { Typography } from "@equinor/eds-core-react";
import { file, folder, link } from "@equinor/eds-icons";
import { Story, Meta } from "@storybook/react";
import styled from "styled-components";

import Table, { TableProps } from "./Table";
import TableItem, { TableItemProps } from "./TableItem";

export default {
  title: "Table2",
  component: Table,
} as Meta;

const LinkData: TableItemProps[] = [
  {
    data: [
      { value: "D23 Webwiz Model", icon: link },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
    ],
    onClick: () => console.log("clicked"),
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: link },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
    ],
    onClick: () => console.log("clicked"),
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: link },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
    ],
    onClick: () => console.log("clicked"),
  },
];

const FileData: TableItemProps[] = [
  {
    data: [
      { value: "D23 Webwiz Model", icon: file },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: file },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: file },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
];

const FolderData: TableItemProps[] = [
  {
    data: [
      { value: "D23 Webwiz Model", icon: folder },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: folder },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: folder },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
  {
    data: [
      { value: "D23 Webwiz Model", icon: folder },
      { value: "Gavin McQueen" },
      { value: "02.05.2021" },
      { value: "23 MB" },
    ],
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TableStory: Story<TableProps> = () => (
  <Container>
    <Typography variant="h3">Tables</Typography>
    <Table
      title="Web Link"
      data={LinkData}
      headers={["Name", "owner", "date"]}
      grow={[2, 1, 1]}
    />
    <Table
      title="File"
      data={FileData}
      headers={["Name", "owner", "date", "size"]}
      grow={[2, 1, 1, 1]}
    />
    <Table
      title="Zip Folder"
      data={FolderData}
      headers={["Name", "owner", "date", "size"]}
      grow={[2, 1, 1, 1]}
    />
  </Container>
);

export const Tables = TableStory.bind({});

const TableItemStory: Story<TableItemProps> = () => (
  <Container>
    <Typography variant="h3">Table item</Typography>
    <TableItem {...LinkData[0]} />
  </Container>
);

export const TableItems = TableItemStory.bind({});
