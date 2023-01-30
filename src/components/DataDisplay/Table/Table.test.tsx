import { faker } from '@faker-js/faker';

import { render, screen, test } from '../../../test-utils';
import Table from './Table';
import { getIcon, TableItemProps } from './TableItem';

function fakeItem(withSize: boolean): TableItemProps {
  return {
    icon: faker.helpers.arrayElement(['Link', 'File', 'Folder']),
    name: faker.system.fileName(),
    owner: faker.internet.userName(),
    size: withSize ? faker.datatype.uuid() : undefined,
    publishedDate: faker.date.past().toISOString(),
  };
}

function fakeProps(withSize = false) {
  const items: TableItemProps[] = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    items.push(fakeItem(withSize));
  }
  return {
    title: faker.lorem.sentence(),
    data: items,
  };
}

test('Displays correct info in table', async () => {
  const props = fakeProps();
  render(<Table {...props} />);

  // Shows headers
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText('Owner')).toBeInTheDocument();
  expect(screen.getByText('Published')).toBeInTheDocument();

  // Check table item content
  const tableItems = screen.getAllByTestId('table-item');
  const allIcons = screen.getAllByTestId('eds-icon-path');
  for (const [index, tableItem] of tableItems.entries()) {
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].name)
    );
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].owner)
    );
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].publishedDate)
    );
    const expectedIcon = getIcon(props.data[index].icon);
    expect(allIcons[index]).toHaveAttribute(
      'd',
      expectedIcon?.svgPathData ?? 'failed'
    );
  }
});

test('Displays correct info in table with size', async () => {
  const props = fakeProps(true);
  render(<Table {...props} />);

  // Shows headers
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText('Owner')).toBeInTheDocument();
  expect(screen.getByText('Published')).toBeInTheDocument();
  expect(screen.getByText('Size')).toBeInTheDocument();

  // Check table item content
  const tableItems = screen.getAllByTestId('table-item');
  const allIcons = screen.getAllByTestId('eds-icon-path');
  for (const [index, tableItem] of tableItems.entries()) {
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].name)
    );
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].owner)
    );
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].publishedDate)
    );
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].publishedDate)
    );
    expect(tableItem).toContainElement(
      screen.getByText(props.data[index].size ?? 'failed')
    );
    const expectedIcon = getIcon(props.data[index].icon);
    expect(allIcons[index]).toHaveAttribute(
      'd',
      expectedIcon?.svgPathData ?? 'failed'
    );
  }
});
