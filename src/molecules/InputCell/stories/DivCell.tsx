import { colors, spacings } from 'src/atoms/style';
import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell, InputCellProps } from 'src/molecules/InputCell/InputCell';
import { TextField } from 'src/molecules/TextField/TextField';

import styled from 'styled-components';

const GridTable = styled.div`
  width: 560px;
  max-width: 100%;
  border: 1px solid ${colors.ui.background__medium.rgba};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 64px 144px minmax(0, 1fr);

  > :not(:last-child) {
    border-right: 1px solid ${colors.ui.background__medium.rgba};
  }

  > [role='columnheader'] {
    padding: ${spacings.small} ${spacings.medium};
    font-weight: 500;
    border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  }
`;

type DivCellProps = Pick<
  InputCellProps,
  'active' | 'variant' | 'noBottomBorder'
>;

export function DivCell({ active, variant, noBottomBorder }: DivCellProps) {
  return (
    <GridTable role="table" aria-label="Div-based input cells">
      <Row role="row">
        <div role="columnheader">Row</div>
        <div role="columnheader">Field</div>
        <div role="columnheader">Value</div>
      </Row>
      <Row role="row">
        <EmptyCell as="div" role="cell">
          1
        </EmptyCell>
        <EmptyCell as="div" role="cell">
          Name
        </EmptyCell>
        <InputCell
          as="div"
          role="cell"
          active={active}
          variant={variant}
          noBottomBorder={noBottomBorder}
        >
          <TextField aria-label="Name" defaultValue="Editable text" />
        </InputCell>
      </Row>
    </GridTable>
  );
}
