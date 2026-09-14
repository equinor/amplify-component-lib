import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell, InputCellProps } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';

export function CustomInputCell(props: InputCellProps) {
  return (
    <ExampleTable aria-label="Custom input cell">
      <ExampleTableHeader />
      <tbody>
        <tr>
          <EmptyCell>1</EmptyCell>
          <EmptyCell>Count</EmptyCell>
          <InputCell {...props}>
            <input
              aria-label="Custom number"
              type="number"
              defaultValue={42}
              min={0}
              step={2}
            />
          </InputCell>
        </tr>
      </tbody>
    </ExampleTable>
  );
}
