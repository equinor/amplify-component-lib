import { ChangeEvent, useState } from 'react';

import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { TextField } from 'src/molecules/TextField/TextField';

export function ValidatedCell() {
  const [value, setValue] = useState('42');
  const invalid = value !== '' && !/^-?\d+$/.test(value);

  return (
    <ExampleTable aria-label="Validated cell">
      <ExampleTableHeader />
      <tbody>
        <tr>
          <EmptyCell>1</EmptyCell>
          <EmptyCell>Quantity</EmptyCell>
          <InputCell>
            <TextField
              aria-label="Integer"
              value={value}
              inputMode="numeric"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              variant={invalid ? 'error' : undefined}
              aria-invalid={invalid}
              helperText={invalid ? 'Enter a whole number.' : undefined}
            />
          </InputCell>
        </tr>
      </tbody>
    </ExampleTable>
  );
}
