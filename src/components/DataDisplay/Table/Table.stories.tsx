import { Typography } from '@equinor/eds-core-react';
import { EdsDataGridProps } from '@equinor/eds-data-grid-react';
import { Meta, StoryFn } from '@storybook/react';
import { createColumnHelper } from '@tanstack/react-table';

import { data } from './stories/data';
import Table from './Table';

const meta: Meta = {
  title: 'Data Display/Table',
  component: Table,
};

interface StoryBookData {
  id: string;
  albumId: string;
  title: string;
  url: string;
}

const helper = createColumnHelper<StoryBookData>();

meta.args = {
  rows: data,
  columns: [
    {
      accessorKey: 'id',
      id: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'albumId',
      id: 'albumId',
      header: 'Album',
    },
    {
      accessorKey: 'title',
      id: 'title',
      header: 'Title',
    },
    helper.accessor('url', {
      header: 'URL',
      id: 'url',
      cell: (cell) => <a href={cell.getValue()}>Open</a>,
    }),
  ],
};

export default meta;

export const Primary: StoryFn<EdsDataGridProps<StoryBookData>> = (args) => {
  return (
    <>
      <Typography variant="h3">
        This is just a re-styling of the{' '}
        <a href="https://storybook.eds.equinor.com/?path=/docs/@equinor/eds-data-grid-react_eds-data-grid--docs">
          EDS Data Grid
        </a>{' '}
        component
      </Typography>
      <br />
      <Table {...args} />
    </>
  );
};
