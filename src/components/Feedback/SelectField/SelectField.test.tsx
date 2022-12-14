import { faker } from '@faker-js/faker';

import { render, screen, userEvent, waitFor } from '../../../test-utils';
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

jest.setTimeout(10000);

test('selecting field works as expected', async () => {
  let field: Field | undefined = undefined;
  const fields = fakeFields();
  const finishedText = faker.lorem.sentence();

  const setField = (value: Field) => {
    field = value;
  };

  const onChangedField = jest.fn();

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
});
