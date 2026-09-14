import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell, InputCellProps } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { TextField } from 'src/molecules/TextField/TextField';

export function ReadOnlyCell(props: InputCellProps) {
  return (
    <ExampleTable aria-label="Read-only cell">
      <ExampleTableHeader />
      <tbody>
        <tr>
          <EmptyCell>1</EmptyCell>
          <EmptyCell>Name</EmptyCell>
          <InputCell {...props}>
            <TextField
              aria-label="Read-only text"
              value="Read-only value"
              readOnly
            />
          </InputCell>
        </tr>
      </tbody>
    </ExampleTable>
  );
}
