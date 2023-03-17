import { faker } from '@faker-js/faker';

import { render, screen, userEvent, waitFor } from '../../../tests/test-utils';
import { Field } from '../../../types/Field';
import SelectField from './SelectField';

function fakeFields(): Field[] {
  const fields: Field[] = [];
  const amount = faker.datatype.number({ min: 2, max: 15 });
  for (let i = 0; i < amount; i++) {
    fields.push({
      uuid: faker.datatype.uuid(),
      name: faker.datatype.uuid(),
      country: faker.address.country(),
    });
  }
  return fields;
}

test('Selecting field works as expected when country is a string', async () => {
  let field: Field | undefined = undefined;
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = (value: Field) => {
    field = value;
  };

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('textbox');
  await user.click(textField);

  expect(screen.queryAllByRole('busy')).toEqual([]);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  const card = screen.getAllByTestId('selectorCard')[0];

  expect(card).toBeInTheDocument();

  await user.click(card);
  expect(screen.getByTestId('resultMenu')).toBeInTheDocument();

  const selectedItem = screen.getByText(fields[0].name ?? '');
  await user.click(selectedItem);

  const nextButton = screen.getByTestId('nextButton');
  await user.click(nextButton);
  await waitFor(() => screen.getByText(finishedText), { timeout: 10000 });

  await waitFor(() => expect(onChangedField).toHaveBeenCalledTimes(1), {
    timeout: 5000,
  });

  expect(field).not.toBeUndefined();
  const uuid = (field as unknown as Field).uuid;
  expect(uuid).toBe(fields[0].uuid);
}, 15000); // Setting timeout for this test to be 15 seconds

test('Selecting field works as expected when country is null', async () => {
  let field: Field | undefined = undefined;
  const fields = fakeFields().map((field) => ({ ...field, country: null }));
  const finishedText = faker.lorem.sentence();

  const setField = (value: Field) => {
    field = value;
  };

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('textbox');
  await user.click(textField);

  expect(screen.queryAllByRole('busy')).toEqual([]);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  const card = screen.getAllByTestId('selectorCard')[0];

  expect(card).toBeInTheDocument();

  await user.click(card);
  expect(screen.getByTestId('resultMenu')).toBeInTheDocument();

  const selectedItem = screen.getByText(fields[0].name ?? '');
  await user.click(selectedItem);

  const nextButton = screen.getByTestId('nextButton');
  await user.click(nextButton);
  await waitFor(() => screen.getByText(finishedText), { timeout: 10000 });

  await waitFor(() => expect(onChangedField).toHaveBeenCalledTimes(1), {
    timeout: 5000,
  });

  expect(field).not.toBeUndefined();

  const uuid = (field as unknown as Field).uuid;
  expect(uuid).toBe(fields[0].uuid);

  const country = (field as unknown as Field).country;
  expect(country).toBe('');
}, 15000); // Setting timeout for this test to be 15 seconds

test('Searching fields works as expected', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('textbox');
  await user.click(textField);

  expect(screen.queryAllByRole('busy')).toEqual([]);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  await user.type(textField, fields[0]?.name ?? '');

  expect(screen.getAllByTestId('selectorCard').length).toBe(1);

  expect(screen.queryByText(fields[1]?.name ?? '')).not.toBeInTheDocument();

  await user.click(screen.getByTestId(`menu-item-${fields[0].uuid}`));

  await user.click(textField);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }
}, 15000); // Setting timeout for this test to be 15 seconds

test('Can open and close the menu with the arrow button', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const arrowButton = screen.getByTestId('arrow-button');

  await user.click(arrowButton);

  for (const field of fields) {
    expect(screen.getByTestId(`menu-item-${field.uuid}`)).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  }

  await user.click(arrowButton);

  for (const field of fields) {
    expect(screen.getByTestId(`menu-item-${field.uuid}`)).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  }
}, 15000); // Setting timeout for this test to be 15 seconds
test('Clearing field works as expected', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('textbox');
  await user.click(textField);

  await user.click(screen.getByTestId(`menu-item-${fields[0].uuid}`));

  await user.click(textField);

  expect(textField).toHaveDisplayValue(fields[0].name ?? '');

  await user.click(screen.getByTestId('clear-button'));

  expect(textField).toHaveDisplayValue('');
}, 15000); // Setting timeout for this test to be 15 seconds

test('Clicking the same field twice clears the selected field', async () => {
  let field: Field | undefined;
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();
  const setField = (value: Field) => {
    field = value;
  };

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('textbox');
  await user.click(textField);

  await user.click(screen.getByTestId(`menu-item-${fields[0].uuid}`));

  expect(textField).toHaveDisplayValue(fields[0]?.name ?? '');

  await user.click(screen.getByTestId(`menu-item-${fields[0].uuid}`));

  expect(textField).toHaveDisplayValue('');
}, 15000); // Setting timeout for this test to be 15 seconds

test('Clicking missing access calls window.open with accessit link', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();
  window.open = vi.fn();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  const { rerender } = render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
      showAccessITLink
    />
  );

  rerender(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
      showAccessITLink
    />
  );

  const textField = screen.getByRole('textbox');
  await user.click(textField);

  expect(screen.queryAllByRole('busy')).toEqual([]);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  await user.click(screen.getByTestId('missing-access'));

  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
}, 15000); // Setting timeout for this test to be 15 seconds
