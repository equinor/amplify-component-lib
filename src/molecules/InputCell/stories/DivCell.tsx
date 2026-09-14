import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell, InputCellProps } from 'src/molecules/InputCell/InputCell';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { TextField } from 'src/molecules/TextField/TextField';

type DivCellProps = Pick<
  InputCellProps,
  'active' | 'variant' | 'noBottomBorder'
>;

export function DivCell(props: DivCellProps) {
  return (
    <ExampleTable aria-label="Div-based input cells">
      <ExampleTableHeader />
      <tbody>
        <tr>
          <EmptyCell>1</EmptyCell>
          <EmptyCell>Name</EmptyCell>
          <td style={{ padding: 0 }}>
            <InputCell {...props} as="div">
              <TextField aria-label="Name" defaultValue="Editable text" />
            </InputCell>
          </td>
        </tr>
      </tbody>
    </ExampleTable>
  );
}
