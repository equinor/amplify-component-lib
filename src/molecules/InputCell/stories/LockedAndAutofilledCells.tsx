import { ChangeEvent, useState } from 'react';

import { Button } from 'src/molecules/Button/Button';
import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import { TextField } from 'src/molecules/TextField/TextField';

const statuses = [
  { value: 'planned', label: 'Planned' },
  { value: 'drilling', label: 'Drilling' },
  { value: 'completed', label: 'Completed' },
];

export function LockedAndAutofilledCells() {
  const [name, setName] = useState('');
  const [nameAutofilled, setNameAutofilled] = useState(false);
  const [spudDate, setSpudDate] = useState<Date | null>(null);
  const [spudDateAutofilled, setSpudDateAutofilled] = useState(false);
  const [status, setStatus] = useState<SelectOptionRequired | undefined>(
    statuses[2]
  );

  const handleOnAutofill = () => {
    setName('NO 15/9-F-12');
    setNameAutofilled(true);
    setSpudDate(new Date(2026, 8, 3));
    setSpudDateAutofilled(true);
  };

  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      <Button variant="outlined" onClick={handleOnAutofill}>
        Autofill
      </Button>
      <ExampleTable aria-label="Well">
        <ExampleTableHeader />
        <tbody>
          <tr>
            <EmptyCell>1</EmptyCell>
            <EmptyCell>Well name</EmptyCell>
            <InputCell>
              <TextField
                aria-label="Well name"
                placeholder="Enter well name…"
                value={name}
                autofilled={nameAutofilled}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                  setNameAutofilled(false);
                }}
              />
            </InputCell>
          </tr>
          <tr>
            <EmptyCell>2</EmptyCell>
            <EmptyCell>Spud date</EmptyCell>
            <InputCell>
              <DatePicker
                aria-label="Spud date"
                value={spudDate}
                autofilled={spudDateAutofilled}
                onChange={(date) => {
                  setSpudDate(date);
                  setSpudDateAutofilled(false);
                }}
              />
            </InputCell>
          </tr>
          <tr>
            <EmptyCell>3</EmptyCell>
            <EmptyCell>Status</EmptyCell>
            <InputCell>
              <SingleSelect
                id="well-status"
                aria-label="Status"
                items={statuses}
                value={status}
                onSelect={setStatus}
                locked
              />
            </InputCell>
          </tr>
          <tr>
            <EmptyCell>4</EmptyCell>
            <EmptyCell>Field</EmptyCell>
            <InputCell>
              <TextField
                aria-label="Field"
                defaultValue="Volve"
                locked
                autofilled
              />
            </InputCell>
          </tr>
        </tbody>
      </ExampleTable>
    </div>
  );
}
