import { colors } from 'src/atoms/style/colors';

import styled from 'styled-components';

export const DatePickerWrapper = styled.div`
  position: relative;
  > p {
    color: ${colors.text.static_icons__tertiary.rgba};
    position: absolute;
    top: 0;
    right: 8px;
  }
  /* If the DatePicker doesn't have a label there won't be space for the meta text*/
  &:not(:has(> div > label)):has(> p) {
    padding-top: 1rem;
  }

  div:has(> button) {
    outline-width: 1px;
    > button:focus-visible {
      outline: none;
    }
  }
`;
