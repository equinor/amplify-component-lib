import { Variants } from 'src/atoms/types/variants';
import { EmptyCellProps } from 'src/molecules/EmptyCell/EmptyCell';
import { Container } from 'src/molecules/InputCell/InputCell.styles';

export type InputCellProps = EmptyCellProps & {
  /** Visual feedback only; validation and accessible error messages belong to the input. */
  variant?: Variants;
  /** Keeps the focus border visible for custom portaled editors. */
  active?: boolean;
};

/** Composes an input without intercepting its props, events, value, or ref. */
export function InputCell(props: InputCellProps) {
  const { as = 'td', noBottomBorder, active, variant, ...rest } = props;
  return (
    <Container
      as={as}
      $noBottomBorder={noBottomBorder}
      $active={active}
      $variant={variant}
      {...rest}
      data-input-cell
    />
  );
}
