import { faker } from '@faker-js/faker';

import { DataGrid } from 'src/organisms/DataGrid/DataGrid';
import { data } from 'src/organisms/DataGrid/stories/data';
import { render, screen, userEvent } from 'src/tests/test-utils';

const columns = [
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
];

test('Renders rows and header', async () => {
  render(<DataGrid rows={data} columns={columns} />);
  const user = userEvent.setup();

  const wrapper = screen.getByTestId('table-wrapper');

  await user.hover(wrapper);

  expect(wrapper).toHaveStyleRule('cursor', 'default');

  await user.unhover(wrapper);

  for (const column of columns) {
    const header = screen.getByRole('columnheader', { name: column.header });
    expect(header).toBeInTheDocument();
  }

  for (const row of data) {
    expect(screen.getAllByText(row.title).length).toBeGreaterThan(0);
  }
});

test('Shows icon when clicking to sort', async () => {
  render(<DataGrid rows={data} columns={columns} enableSorting />);

  const user = userEvent.setup();

  const randomColumn = faker.helpers.arrayElement(columns).header;

  const header = screen.getByRole('columnheader', {
    name: randomColumn,
  });
  await user.click(header);

  expect(screen.getByTestId('eds-icon-path')).toBeInTheDocument();
});
