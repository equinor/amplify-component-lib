import { Story, Meta } from "@storybook/react";
import styled from "styled-components";

import Table, { TableProps } from "./Table";
import { TableItemProps } from "./TableItem";

export default {
  title: "Table",
  component: Table,
} as Meta;

const LinkData: TableItemProps[] = [
  {
    icon: "Link",
    name: "D23 Webwiz Model",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    onClick: () => console.log("clicked"),
  },
  {
    icon: "Link",
    name: "D23 Webwiz Model",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    onClick: () => console.log("clicked"),
  },
  {
    icon: "Link",
    name: "D23 Webwiz Model",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    onClick: () => console.log("clicked"),
  },
];

const FileData: TableItemProps[] = [
  {
    icon: "File",
    name: "Fiber_data_file_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
  },
  {
    icon: "File",
    name: "Fiber_data_file_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
  },
  {
    icon: "File",
    name: "Fiber_data_file_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
  },
];

const FolderData: TableItemProps[] = [
  {
    icon: "Folder",
    name: "Fiber_data_folder_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    size: "23 GB",
  },
  {
    icon: "Folder",
    name: "Fiber_data_folder_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    size: "23 GB",
  },
  {
    icon: "Folder",
    name: "Fiber_data_folder_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    size: "23 GB",
  },
  {
    icon: "Folder",
    name: "Fiber_data_folder_d23",
    owner: "Gavin McQueen",
    publishedDate: "02.05.2021",
    size: "23 GB",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Template: Story<TableProps> = () => (
  <Container>
    <Table title="Web Link" data={LinkData} />
    <Table title="File" data={FileData} />
    <Table title="Zip Folder" data={FolderData} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};
