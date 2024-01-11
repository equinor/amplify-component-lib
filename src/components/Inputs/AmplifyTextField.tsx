import { TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

const AmplifyTextField = styled(TextField)`
  ${(props) => {
    if (!props.variant) {
      return `
      input {
      color: ${colors.text.static_icons__default.rgba}
      }
        div:focus-within {
          outline: none !important;
          input {
              box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
          }
        }
        `;
    } else {
      return `
    input {
      color: ${colors.text.static_icons__default.rgba}
      }
    `;
    }
  }}
`;

export default AmplifyTextField;
