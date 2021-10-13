import { Typography } from '@equinor/eds-core-react';
import { Story, Meta } from '@storybook/react';
import styled from 'styled-components';

import Table, { TableProps } from '.';
import TableItem, { TableItemProps } from './TableItem';

export default {
  title: 'Table',
  component: Table,
} as Meta;

const LinkData: TableItemProps[] = [
  {
    icon: 'Link',
    name: 'D23 Webwiz Model',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    onClick: () => console.log('clicked'),
  },
  {
    icon: 'Link',
    name: 'D23 Webwiz Model',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    onClick: () => console.log('clicked'),
  },
  {
    icon: 'Link',
    name: 'D23 Webwiz Model',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    onClick: () => console.log('clicked'),
  },
];

const FileData: TableItemProps[] = [
  {
    icon: 'File',
    name: 'Fiber_data_file_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '23 MB',
  },
  {
    icon: 'File',
    name: 'Fiber_data_file_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '23 MB',
  },
  {
    icon: 'File',
    name: 'Fiber_data_file_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '23 MB',
  },
];

const FolderData: TableItemProps[] = [
  {
    icon: 'Folder',
    name: 'Fiber_data_folder_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '3.8 GB',
  },
  {
    icon: 'Folder',
    name: 'Fiber_data_folder_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '23 GB',
  },
  {
    icon: 'Folder',
    name: 'Fiber_data_folder_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '23 GB',
  },
  {
    icon: 'Folder',
    name: 'Fiber_data_folder_d23',
    owner: 'Gavin McQueen',
    publishedDate: '02.05.2021',
    size: '23GB',
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
    <Table title="Web Link" data={LinkData} />
    <Table title="File" data={FileData} />
    <Table title="Zip Folder" data={FolderData} />
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
