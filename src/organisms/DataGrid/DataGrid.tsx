import { EdsDataGrid, EdsDataGridProps } from '@equinor/eds-data-grid-react';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

interface WrapperProps {
  $enableSorting: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  table,
  thead,
  th {
    background: transparent;
  }
  tr:has(th):hover {
    background: unset;
  }
  thead,
  th {
    border: none;
  }
  th {
    color: ${colors.text.static_icons__default.rgba};
    > div {
      justify-content: space-between;
      > svg {
        height: 18px;
        width: 18px;
        fill: ${colors.interactive.primary__resting.rgba};
      }
    }
  }
  th,
  td {
    padding: ${spacings.medium_small} ${spacings.small};
  }
  tr:hover,
  th:hover,
  th:has(svg) {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  ${({ $enableSorting }) =>
    !$enableSorting &&
    `
    cursor: default;
    tr:hover, th:hover {
      background: unset;
      cursor: default;
    }
    `}
`;

export const DataGrid = <T,>(props: EdsDataGridProps<T>) => {
  return (
    <Wrapper
      $enableSorting={props.enableSorting ?? false}
      data-testid="table-wrapper"
    >
      <EdsDataGrid {...props} />
    </Wrapper>
  );
};
