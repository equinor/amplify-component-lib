import { ComponentType } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { colors, shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: ${spacings.medium};
`;

export const VariantColumnShape = styled.span`
  position: relative;
  height: 10px;
  width: 100%;
  border-top-left-radius: ${shape.button.borderRadius};
  border-top-right-radius: ${shape.button.borderRadius};
  border-left: 2px solid ${colors.text.static_icons__default.rgba};
  border-top: 2px solid ${colors.text.static_icons__default.rgba};
  border-right: 2px solid ${colors.text.static_icons__default.rgba};
  &::after {
    content: '';
    background: ${colors.text.static_icons__default.rgba};
    height: 6px;
    width: 2px;
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%);
  }
`;

export const VariantRowShape = styled.span`
  position: relative;
  width: 10px;
  height: 100%;
  border-top-left-radius: ${shape.button.borderRadius};
  border-bottom-left-radius: ${shape.button.borderRadius};
  border-left: 2px solid ${colors.text.static_icons__default.rgba};
  border-top: 2px solid ${colors.text.static_icons__default.rgba};
  border-bottom: 2px solid ${colors.text.static_icons__default.rgba};
  &::after {
    content: '';
    background: ${colors.text.static_icons__default.rgba};
    width: 6px;
    height: 2px;
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

interface VariantShowcaseProps<T> {
  GenericComponent: ComponentType<T>;
  otherProps: T;
  columns?: Array<{ label: string; value: Partial<T> }>;
  rows: Array<{ label: string; value: Partial<T> }>;
}

export function VariantShowcase<T>({
  columns,
  rows,
  GenericComponent,
  otherProps,
}: VariantShowcaseProps<T>) {
  if (!columns || columns.length === 0) {
    return (
      <Container
        style={{
          gridTemplateColumns: `auto auto auto`,
        }}
      >
        {rows.flatMap((row, rowIndex) => [
          <Typography
            key={`row-label-${rowIndex}`}
            style={{
              alignSelf: 'center',
            }}
          >
            {row.label}
          </Typography>,
          <VariantRowShape key={`row-shape-${rowIndex}`} />,
          <GenericComponent
            key={`row-${rowIndex}-col-0`}
            {...otherProps}
            {...row.value}
          />,
        ])}
      </Container>
    );
  }

  return (
    <Container
      style={{
        gridTemplateColumns: `auto auto repeat(${columns.length}, auto)`,
      }}
    >
      {columns.map((column, index) => (
        <Typography
          key={index}
          style={{
            gridColumn: index === 0 ? 3 : undefined,
            justifySelf: 'center',
          }}
        >
          {column.label}
        </Typography>
      ))}
      {columns.map((_, index) => (
        <VariantColumnShape
          key={index}
          style={{ gridColumn: index === 0 ? 3 : undefined }}
        />
      ))}
      {rows.flatMap((row, rowIndex) => [
        <Typography
          key={`row-label-${rowIndex}`}
          style={{
            alignSelf: 'center',
            justifySelf: 'flex-end',
          }}
        >
          {row.label}
        </Typography>,
        <VariantRowShape key={`row-shape-${rowIndex}`} />,
        ...columns.map((column, columnIndex) => (
          <GenericComponent
            key={`row-${rowIndex}-col-${columnIndex}`}
            {...otherProps}
            {...row.value}
            {...column.value}
          />
        )),
      ])}
    </Container>
  );
}
