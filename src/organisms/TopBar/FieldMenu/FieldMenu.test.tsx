import { faker } from '@faker-js/faker';
import { within } from '@testing-library/dom';

import {
  FieldMenu,
  FieldMenuProps,
} from 'src/organisms/TopBar/FieldMenu/FieldMenu';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

function fakeField() {
  return {
    name: faker.string.uuid(),
    uuid: faker.string.uuid(),
    country: faker.location.country(),
  };
}

function fakeProps(): FieldMenuProps {
  const fields = new Array(5).fill(0).map(() => fakeField());
  return {
    currentField: fields[0],
    availableFields: fields,
    onSelect: vi.fn(),
  };
}

test('Opens/closes as it should, also with useOutsideClick', async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  for (const field of props.availableFields) {
    const name = field?.name?.toLowerCase() ?? 'not-found';
    const contextMenu = within(screen.getByRole('menu'));

    expect(contextMenu.getByText(name)).toBeInTheDocument();
    expect(contextMenu.getByText(name)).toBeVisible();
  }

  await user.click(button);
  expect(screen.queryByText('Field Selection')).not.toBeInTheDocument();

  await user.click(button);

  for (const field of props.availableFields) {
    const name = field?.name?.toLowerCase() ?? 'not-found';
    const contextMenu = within(screen.getByRole('menu'));
    expect(contextMenu.getByText(name)).toBeInTheDocument();
    expect(contextMenu.getByText(name)).toBeVisible();
  }

  await user.click(document.body);

  expect(screen.queryByText('field-name')).not.toBeInTheDocument();
});

test('field selector do not shown when field isnt selected', () => {
  const noSelectedField = {
    currentField: undefined,
    availableFields: fakeProps().availableFields,
    onSelect: vi.fn(),
  };
  render(<FieldMenu {...noSelectedField} />);
  expect(
    screen.queryByTestId('field-selector-top-bar-button')
  ).not.toBeInTheDocument();
});

test('Runs onSelect function once when clicking an item', async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const secondItem = screen.getByText(
    new RegExp(props.availableFields[1].name ?? '', 'i')
  );
  await user.click(secondItem);

  expect(props.onSelect).toHaveBeenCalledWith(props.availableFields[1]);
  expect(props.onSelect).toHaveBeenCalledTimes(1);
});

test('Doesnt run onSelect function when clicking already selected item', async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const currentFieldName = props?.currentField?.name ?? 'name';
  const contextMenu = within(screen.getByRole('menu'));
  const selected = contextMenu.getByText(currentFieldName);
  await user.click(selected);
  expect(props.onSelect).toHaveBeenCalledTimes(0);
});

test('Filters values when using search', async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const search = screen.getByRole('textbox');

  const randomFieldName =
    props.availableFields[
      faker.number.int({ min: 0, max: props.availableFields.length })
    ]?.name ?? 'not-found';
  await user.type(search, randomFieldName);
  for (const field of props.availableFields) {
    if (field.name && field.name === randomFieldName) {
      expect(
        screen.getByRole('heading', { name: field.name.toLowerCase() })
      ).toBeInTheDocument();
    } else if (field.name) {
      expect(
        screen.queryByRole('heading', { name: field.name.toLowerCase() })
      ).not.toBeInTheDocument();
    }
  }
});

test("Shows 'No results' text when searching for something that doesn't exist", async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const search = screen.getByRole('textbox');

  const randomSearchValue = faker.internet.ipv4();
  await user.type(search, randomSearchValue);
  for (const field of props.availableFields) {
    expect(
      screen.queryByRole('heading', { name: field.name?.toLowerCase() })
    ).not.toBeInTheDocument();
  }
  expect(
    screen.getByText('No fields matching your search')
  ).toBeInTheDocument();
});

test("Show search input if it's 4 or more fields ", async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);
  const searchFields = screen.getByRole('textbox');

  expect(searchFields).toBeInTheDocument();
});

test('Runs window.open when clicking access it card', async () => {
  const props = fakeProps();
  render(<FieldMenu {...props} />);
  window.open = vi.fn();
  const user = userEvent.setup();

  const button = screen.getByRole('button');
  await user.click(button);

  const accessItMenuItem = screen.getByTestId('access-it-link');

  await user.click(accessItMenuItem);

  expect(window.open).toHaveBeenCalledTimes(1);
  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
});
