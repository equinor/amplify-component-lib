import { ChangeEvent, useState } from 'react';

import { colors } from 'src/atoms/style';
import { Variants } from 'src/atoms/types/variants';
import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import { ExampleTable } from 'src/molecules/InputCell/stories/ExampleTable';
import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { TextField } from 'src/molecules/TextField/TextField';

const items = [
  { value: '1', label: 'Item 1' },
  { value: '2', label: 'Item 2' },
  { value: '3', label: 'Item 3' },
];

interface RowProps {
  name: string;
  variant?: Variants;
  disabled?: boolean;
  loading?: boolean;
  empty?: boolean;
  selected?: boolean;
}

function ExampleRow({
  name,
  variant,
  disabled,
  loading,
  empty,
  selected,
}: RowProps) {
  const [text, setText] = useState(
    empty ? '' : disabled ? 'Disabled' : 'Editable text'
  );
  const [single, setSingle] = useState<SelectOptionRequired | undefined>(
    empty ? undefined : items[0]
  );
  const [multiple, setMultiple] = useState(empty ? [] : items);
  const [date, setDate] = useState<Date | undefined>(
    empty ? undefined : new Date(2026, 8, 3)
  );
  const inputProps = { variant, disabled, loading };

  return (
    <tr
      style={
        selected
          ? { background: colors.interactive.primary__selected_highlight.rgba }
          : undefined
      }
    >
      <EmptyCell>{name}</EmptyCell>
      <InputCell>
        <TextField
          {...inputProps}
          aria-label={`${name} text`}
          placeholder="Edit text…"
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
        />
      </InputCell>
      <InputCell>
        <SingleSelect
          {...inputProps}
          id={`${name}-single`}
          aria-label={`${name} single select`}
          items={items}
          value={single}
          onSelect={setSingle}
          clearable={false}
        />
      </InputCell>
      <InputCell>
        <DatePicker
          {...inputProps}
          aria-label={`${name} date`}
          value={date}
          onChange={(value) => setDate(value ?? undefined)}
        />
      </InputCell>
      <InputCell>
        <ComboBox
          {...inputProps}
          id={`${name}-multiple`}
          aria-label={`${name} combobox`}
          items={items}
          values={multiple}
          onSelect={setMultiple}
        />
      </InputCell>
    </tr>
  );
}

export function InputCellExamples() {
  return (
    <ExampleTable aria-label="Editable cells" style={{ width: 890 }}>
      <colgroup>
        <col style={{ width: 128 }} />
        <col style={{ width: 116 }} />
        <col style={{ width: 164 }} />
        <col style={{ width: 180 }} />
        <col style={{ width: 302 }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">State</th>
          <th scope="col">Text</th>
          <th scope="col">Single select</th>
          <th scope="col">Date</th>
          <th scope="col">Combobox</th>
        </tr>
      </thead>
      <tbody>
        <ExampleRow name="Default" />
        <ExampleRow name="Empty" empty />
        <ExampleRow name="Danger" variant="error" />
        <ExampleRow name="Selected row" selected />
        <ExampleRow name="Disabled" disabled />
        <ExampleRow name="Loading" loading />
      </tbody>
    </ExampleTable>
  );
}
