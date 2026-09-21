import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const ExampleTable = styled.table`
  border-spacing: 0;
  border: 1px solid ${colors.ui.background__medium.rgba};
  table-layout: fixed;
  width: 560px;
  max-width: 100%;

  th {
    text-align: left;
    padding: ${spacings.small} ${spacings.medium};
    font-weight: 500;
    border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  }

  th:not(:last-child),
  td:not(:last-child) {
    border-right: 1px solid ${colors.ui.background__medium.rgba};
  }

  tbody > tr:nth-child(even) {
    background: ${colors.ui.background__light.rgba};
  }
`;

export function ExampleTableHeader() {
  return (
    <>
      <colgroup>
        <col style={{ width: 64 }} />
        <col style={{ width: 144 }} />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">Row</th>
          <th scope="col">Field</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
    </>
  );
}
