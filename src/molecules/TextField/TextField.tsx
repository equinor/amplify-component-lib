import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import {
  TextField as Base,
  TextFieldProps as BaseProps,
} from '@equinor/eds-core-react';

import { shape, spacings } from 'src/atoms/style';
import { animation } from 'src/atoms/style/animation';
import { colors, VARIANT_COLORS } from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';
import { SkeletonBase } from 'src/molecules';

import styled, { css } from 'styled-components';

type TextFieldProps = Omit<BaseProps, 'variant'> & {
  variant?: Variants;
  loading?: boolean;
} & (
    | TextareaHTMLAttributes<HTMLTextAreaElement>
    | InputHTMLAttributes<HTMLInputElement>
  );

interface WrapperProps {
  $variant: TextFieldProps['variant'];
  $disabled?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  input,
  textarea {
    color: ${colors.text.static_icons__default.rgba};
    transition:
      background ${animation.transitionMS},
      box-shadow ${animation.transitionMS};
    &::placeholder {
      opacity: 1;
    }
    &:hover {
      background: ${colors.ui.background__light_medium.rgba};
    }
    &:disabled {
      &::placeholder {
        color: ${colors.interactive.disabled__text.rgba};
      }
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
          box-shadow: inset 0 -2px 0 0
            ${colors.text.static_icons__tertiary.rgba};
        }

        div:focus-within {
          input,
          textarea {
            box-shadow: inset 0 -2px 0 0
              ${colors.interactive.primary__resting.rgba};
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
        box-shadow: inset 0 -${$variant === 'dirty' ? 2 : 1}px 0 0
          ${VARIANT_COLORS[$variant]};
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

const Loader = styled(SkeletonBase)`
  position: absolute;
  left: ${spacings.small};
  width: 70%;
  height: calc(36px - ${spacings.small});
  border-radius: ${shape.corners.borderRadius};
  transform: translateY(${spacings.x_small});
`;

export const TextField: FC<TextFieldProps> = (props) => {
  const baseProps: BaseProps = {
    ...props,
    variant: props.variant !== 'dirty' ? props.variant : undefined,
  };

  const usingVariant = props.loading ? undefined : props.variant;
  const skeletonTop = props.label || props.meta ? '1rem' : '0';

  return (
    <Wrapper
      $variant={usingVariant}
      $disabled={props.loading ? false : props.disabled}
    >
      <Base {...baseProps} disabled={props.loading || props.disabled} />
      {props.loading && (
        <Loader
          className="skeleton"
          role="progressbar"
          style={{ top: skeletonTop }}
        />
      )}
    </Wrapper>
  );
};
