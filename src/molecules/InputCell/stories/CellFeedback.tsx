import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { TextField } from 'src/molecules/TextField/TextField';

export function CellFeedback() {
  return (
    <ExampleTable aria-label="Cell feedback">
      <ExampleTableHeader />
      <tbody>
        <tr>
          <EmptyCell>1</EmptyCell>
          <EmptyCell>Active</EmptyCell>
          <InputCell active>
            <TextField
              aria-label="Active editor"
              defaultValue="Editable text"
            />
          </InputCell>
        </tr>
        <tr>
          <EmptyCell>2</EmptyCell>
          <EmptyCell>Warning</EmptyCell>
          <InputCell variant="warning">
            <TextField
              aria-label="Warning editor"
              defaultValue="Check this value"
            />
          </InputCell>
        </tr>
      </tbody>
    </ExampleTable>
  );
}
