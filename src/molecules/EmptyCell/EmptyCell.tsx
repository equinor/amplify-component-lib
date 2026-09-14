import { ComponentPropsWithRef } from 'react';

import { Container } from 'src/molecules/EmptyCell/EmptyCell.styles';

export type EmptyCellProps = {
  noBottomBorder?: boolean;
} & (
  | ({ as?: 'td' } & ComponentPropsWithRef<'td'>)
  | ({ as: 'div' } & ComponentPropsWithRef<'div'>)
);

/** A table cell with optional, consumer-owned content. Use as="div" inside a grid cell. */
export function EmptyCell(props: EmptyCellProps) {
  if (props.as === 'div') {
    const { as, noBottomBorder, ...rest } = props;
    return <Container as={as} $noBottomBorder={noBottomBorder} {...rest} />;
  }

  const { as, noBottomBorder, ...rest } = props;
  return <Container as={as} $noBottomBorder={noBottomBorder} {...rest} />;
}
