import { faker } from '@faker-js/faker';

import { render, screen, userEvent, waitFor } from '../../../tests/test-utils';
import SelectField from './SelectField';
import { Field } from 'src/types/Field';

function fakeFields(): Field[] {
  const fields: Field[] = [];
  const amount = faker.number.int({ min: 2, max: 15 });
  for (let i = 0; i < amount; i++) {
    fields.push({
      uuid: faker.string.uuid(),
      name: faker.string.uuid(),
      country: faker.location.country(),
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

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('combobox');
  await user.click(textField);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  const selectField = screen.getByText(fields[0].name ?? '');
  await user.click(selectField);

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

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('combobox');
  await user.click(textField);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  const selectItem = screen.getByText(fields[0].name ?? '');
  await user.click(selectItem);

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

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('combobox');
  await user.click(textField);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }

  await user.type(textField, fields[0]?.name ?? '');

  expect(screen.queryByText(fields[1]?.name ?? '')).not.toBeInTheDocument();

  await user.click(screen.getByText(fields[0].name ?? ''));

  await user.click(textField);

  for (const field of fields) {
    expect(screen.getByText(field.name ?? '')).toBeInTheDocument();
  }
}, 15000); // Setting timeout for this test to be 15 seconds

test('Clearing field works as expected', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
    />
  );

  const textField = screen.getByRole('combobox');
  await user.click(textField);

  await user.click(screen.getByText(fields[0].name ?? ''));

  await user.click(textField);

  expect(textField).toHaveDisplayValue(fields[0].name ?? '');

  await user.click(
    screen.getByRole('button', {
      name: /clear options/i,
    })
  );

  expect(textField).toHaveDisplayValue('');
}, 15000); // Setting timeout for this test to be 15 seconds

test('Clicking missing access calls window.open with accessit link', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();
  window.open = vi.fn();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  const user = userEvent.setup();

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
      showAccessITLink
    />
  );

  await user.click(screen.getByTestId('missing-access'));

  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
}, 15000); // Setting timeout for this test to be 15 seconds

test('Shows skeleton as expected', async () => {
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading
      onChangedField={onChangedField}
      finishedText={finishedText}
      showAccessITLink
    />
  );

  expect(screen.getAllByRole('busy')).not.toBe([]);
});

test('Logs error and doesnt include fields which have no name', async () => {
  const noNameField = { name: null, country: 'NORWAY', uuid: 'nearsnto' };
  const fields = [...fakeFields(), noNameField];
  const finishedText = faker.lorem.sentence();

  const setField = vi.fn();

  const onChangedField = vi.fn();

  console.error = vi.fn();

  render(
    <SelectField
      setField={setField}
      fields={fields}
      isLoading={false}
      onChangedField={onChangedField}
      finishedText={finishedText}
      showAccessITLink
    />
  );

  expect(console.error).toHaveBeenCalledWith(
    'Field with no name found!:',
    noNameField
  );
});
