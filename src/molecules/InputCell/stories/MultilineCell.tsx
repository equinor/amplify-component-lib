import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell, InputCellProps } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { TextField } from 'src/molecules/TextField/TextField';

export function MultilineCell(props: InputCellProps) {
  return (
    <ExampleTable aria-label="Multiline cell">
      <ExampleTableHeader />
      <tbody>
        <tr>
          <EmptyCell>1</EmptyCell>
          <EmptyCell>Notes</EmptyCell>
          <InputCell {...props}>
            <TextField
              aria-label="Notes"
              multiline
              rows={3}
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            />
          </InputCell>
        </tr>
      </tbody>
    </ExampleTable>
  );
}
