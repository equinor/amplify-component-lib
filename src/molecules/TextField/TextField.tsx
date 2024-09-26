import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import {
  TextField as Base,
  TextFieldProps as BaseProps,
} from '@equinor/eds-core-react';

import { colors, VARIANT_COLORS } from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';

import styled, { css } from 'styled-components';

type TextFieldProps = Omit<BaseProps, 'variant'> & {
  variant?: Variants;
} & (
    | TextareaHTMLAttributes<HTMLTextAreaElement>
    | InputHTMLAttributes<HTMLInputElement>
  );

interface WrapperProps {
  $variant: TextFieldProps['variant'];
  $disabled?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  input,
  textarea {
    color: ${colors.text.static_icons__default.rgba};
    &::placeholder {
      opacity: 1;
    }
  }
  div:focus-within {
    outline: none !important;
  }

  ${({ $variant, $disabled }) => {
    if ($disabled) {
      return css`
        div {
          outline: none !important;
        }
        p {
          color: ${colors.interactive.disabled__text.rgba} !important;
        }
      `;
    }

    if ($variant === undefined) {
      return css`
        input:hover,
        textarea:hover {
          box-shadow: inset 0 -2px 0 0 ${colors.text.static_icons__tertiary.rgba};
        }

        div:focus-within {
          input,
          textarea {
            box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
          }
        }
      `;
    }

    return css`
      ${$variant === 'dirty' &&
      css`
        input,
        textarea {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      `}

      input:hover,
      textarea:hover {
        box-shadow: inset 0 -${$variant === 'dirty' ? 2 : 1}px 0 0 ${VARIANT_COLORS[$variant]};
      }

      div:focus-within {
        outline: none !important;

        input,
        textarea {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      }
    `;
  }}
`;

export const TextField: FC<TextFieldProps> = (props) => {
  const baseProps: BaseProps = {
    ...props,
    variant: props.variant !== 'dirty' ? props.variant : undefined,
  };

  return (
    <Wrapper $variant={props.variant} $disabled={props.disabled}>
      <Base {...baseProps} />
    </Wrapper>
  );
};
