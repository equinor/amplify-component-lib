import { useState } from 'react';

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
  active?: boolean;
}

function ExampleRow({
  name,
  variant,
  disabled,
  loading,
  empty,
  selected,
  active,
}: RowProps) {
  const [single, setSingle] = useState<SelectOptionRequired | undefined>(
    empty ? undefined : items[0]
  );
  const [multiple, setMultiple] = useState(empty ? [] : items);
  const inputProps = { variant, disabled, loading };
  const cellProps = { active, variant };

  return (
    <tr
      style={
        selected
          ? { background: colors.interactive.primary__selected_highlight.rgba }
          : undefined
      }
    >
      <EmptyCell>{name}</EmptyCell>
      <InputCell {...cellProps}>
        <TextField
          {...inputProps}
          aria-label={`${name} text`}
          placeholder="Edit text…"
          defaultValue={empty ? '' : disabled ? 'Disabled' : 'Editable text'}
        />
      </InputCell>
      <InputCell {...cellProps}>
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
      <InputCell {...cellProps}>
        <DatePicker
          {...inputProps}
          aria-label={`${name} date`}
          defaultValue={empty ? undefined : new Date(2026, 8, 3)}
        />
      </InputCell>
      <InputCell {...cellProps}>
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
        <ExampleRow name="Active" active />
        <ExampleRow name="Danger" variant="error" />
        <ExampleRow name="Selected row" selected />
        <ExampleRow name="Disabled" disabled />
        <ExampleRow name="Loading" loading />
      </tbody>
    </ExampleTable>
  );
}
