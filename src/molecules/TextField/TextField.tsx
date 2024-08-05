import { FC } from 'react';

import { TextField as Base, TextFieldProps } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';

import styled from 'styled-components';

const StyledBase = styled(Base)`
  ${(props) => {
    if (!props.variant) {
      return `
      input, textarea {
      color: ${colors.text.static_icons__default.rgba}
      }
        div:focus-within {
          outline: none !important;
          input, textarea{
              box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
          }
        }
        `;
    } else {
      return `
    input, textarea {
      color: ${colors.text.static_icons__default.rgba}
      }
    `;
    }
  }}
`;

export const TextField: FC<TextFieldProps> = (props) => (
  <StyledBase {...props} />
);
