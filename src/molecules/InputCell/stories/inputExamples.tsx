import { useState } from 'react';

import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { TextField } from 'src/molecules/TextField/TextField';

const items = [
  { value: '1', label: 'Item 1' },
  { value: '2', label: 'Item 2' },
  { value: '3', label: 'Item 3' },
];

function SelectInputExample({ multiple = false }: { multiple?: boolean }) {
  const [value, setValue] = useState<SelectOptionRequired | undefined>(
    items[0]
  );
  const [values, setValues] = useState([items[0]]);

  return multiple ? (
    <ComboBox
      id="example-combobox"
      aria-label="Combobox"
      items={items}
      values={values}
      onSelect={setValues}
    />
  ) : (
    <SingleSelect
      id="example-single-select"
      aria-label="Single select"
      items={items}
      value={value}
      onSelect={setValue}
    />
  );
}

export const inputExamples = {
  'Text field': <TextField aria-label="Text" defaultValue="Editable text" />,
  'Single select': <SelectInputExample />,
  'Date picker': (
    <DatePicker label="Date" defaultValue={new Date(2026, 8, 3)} />
  ),
  Combobox: <SelectInputExample multiple />,
};
